# Blog 4: Containerized MySQL - Docker Production Strategies

*Deploy production-ready MySQL using Docker with advanced patterns*

---

## Introduction

Docker has revolutionized database deployment, providing consistency across environments and simplifying operations. However, running MySQL in containers for production requires careful consideration of data persistence, networking, security, and resource management.

This comprehensive guide covers production-ready MySQL containerization strategies, from basic Docker Compose setups to advanced multi-node configurations. You'll learn how to deploy, secure, and operate MySQL containers that meet production requirements.

## TL;DR

- **What:** Complete guide to MySQL containerization with Docker
- **When to use:** When you want consistent deployments across environments or container-first infrastructure
- **Reading time:** 10-12 minutes
- **Implementation time:** 2-4 hours for production setup
- **Key takeaway:** Docker simplifies deployment but requires careful attention to data persistence, networking, and security
- **Skip if:** You prefer native installations or managed services

**What You'll Master:**
- Docker Compose production configurations with security
- Container resource management and performance optimization
- Persistent volume strategies and backup automation
- Docker Swarm orchestration for multi-node clusters
- Data persistence and volume management

---

## Docker Basics for MySQL

> 💡 **Understanding MySQL architecture?** Check out our [MySQL Architecture Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md#overview--architecture) for detailed component explanations and configuration options.

### Official MySQL Docker Image

According to the [MySQL Docker Hub documentation](https://hub.docker.com/_/mysql), "The MySQL Docker image is maintained by the MySQL team and provides official MySQL server images."

**Pull Official Image:**
```bash
# Pull latest MySQL 8.0
docker pull mysql:8.0

# Pull specific version
docker pull mysql:8.0.35

# List available tags
docker search mysql
```

### Basic Container Run

**Simple Container:**
```bash
docker run --name mysql-container \
    -e MYSQL_ROOT_PASSWORD=securepassword \
    -e MYSQL_DATABASE=myapp \
    -e MYSQL_USER=appuser \
    -e MYSQL_PASSWORD=apppassword \
    -p 3306:3306 \
    -d mysql:8.0
```

**Environment Variables:**

The [MySQL Docker documentation](https://hub.docker.com/_/mysql) lists available environment variables:

- `MYSQL_ROOT_PASSWORD`: Root password (required for non-initialized containers)
- `MYSQL_DATABASE`: Database to create on startup
- `MYSQL_USER`: User to create
- `MYSQL_PASSWORD`: User password
- `MYSQL_ALLOW_EMPTY_PASSWORD`: Allow empty root password (not recommended)

---

## Docker Compose Production Setup

### Basic Production Configuration

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-production
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - mysql_config:/etc/mysql/conf.d
      - ./init:/docker-entrypoint-initdb.d
    networks:
      - mysql_network
    command: --default-authentication-plugin=mysql_native_password
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mysql_data:
    driver: local
  mysql_config:
    driver: local

networks:
  mysql_network:
    driver: bridge
```

### Advanced Production Configuration

**With Custom Configuration:**
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-production
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./my.cnf:/etc/mysql/conf.d/custom.cnf:ro
      - ./logs:/var/log/mysql
      - ./backups:/backups
    networks:
      - mysql_network
    command: >
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_unicode_ci
      --innodb-buffer-pool-size=2G
      --max-connections=500
      --slow-query-log=1
      --slow-query-log-file=/var/log/mysql/slow.log
      --long-query-time=2
    ulimits:
      nofile:
        soft: 65536
        hard: 65536
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 4G
        reservations:
          cpus: '2'
          memory: 2G

volumes:
  mysql_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/mysql/data

networks:
  mysql_network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

---

## Data Persistence Strategies

> 💡 **Need backup and recovery strategies?** Explore our [MySQL Performance & Operations Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md#performance--operations) for comprehensive backup, recovery, and replication guidance.

### Named Volumes

**Advantages:**
- Managed by Docker
- Easy backup and restore
- Portable across hosts

**Configuration:**
```yaml
volumes:
  mysql_data:
    driver: local
```

### Bind Mounts

**Advantages:**
- Direct host filesystem access
- Easy backup with standard tools
- Better performance in some cases

**Configuration:**
```yaml
volumes:
  - /opt/mysql/data:/var/lib/mysql
```

### Volume Drivers

According to the [Docker Volume documentation](https://docs.docker.com/storage/volumes/), you can use volume drivers for advanced storage:

```yaml
volumes:
  mysql_data:
    driver: local
    driver_opts:
      type: nfs
      o: addr=192.168.1.100,nolock,soft,rw
      device: ":/path/to/nfs/share"
```

---

## Security Best Practices

### Network Isolation

**Internal Network Only:**
```yaml
services:
  mysql:
    # Remove ports mapping for internal only
    # ports:
    #   - "3306:3306"
    networks:
      - internal_network

  app:
    depends_on:
      - mysql
    networks:
      - internal_network

networks:
  internal_network:
    internal: true
```

### Secrets Management

**Using Docker Secrets:**
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    secrets:
      - mysql_root_password
      - mysql_user_password
    environment:
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/mysql_root_password
      MYSQL_PASSWORD_FILE: /run/secrets/mysql_user_password

secrets:
  mysql_root_password:
    external: true
  mysql_user_password:
    external: true
```

**Create Secrets:**
```bash
echo "securepassword" | docker secret create mysql_root_password -
echo "userpassword" | docker secret create mysql_user_password -
```

### Read-Only Root Filesystem

**Enhanced Security:**
```yaml
services:
  mysql:
    read_only: true
    tmpfs:
      - /tmp
      - /var/run/mysqld
    volumes:
      - mysql_data:/var/lib/mysql:rw
```

---

## Multi-Node Setup with Docker Compose

### Master-Slave Replication

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  mysql-master:
    image: mysql:8.0
    container_name: mysql-master
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_REPLICATION_MODE: master
      MYSQL_REPLICATION_USER: replicator
      MYSQL_REPLICATION_PASSWORD: ${REPLICATION_PASSWORD}
    volumes:
      - master_data:/var/lib/mysql
      - ./master.cnf:/etc/mysql/conf.d/replication.cnf
    networks:
      - mysql_network
    command: >
      --server-id=1
      --log-bin=mysql-bin
      --binlog-format=ROW

  mysql-slave:
    image: mysql:8.0
    container_name: mysql-slave
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_REPLICATION_MODE: slave
      MYSQL_REPLICATION_USER: replicator
      MYSQL_REPLICATION_PASSWORD: ${REPLICATION_PASSWORD}
      MYSQL_MASTER_HOST: mysql-master
    volumes:
      - slave_data:/var/lib/mysql
      - ./slave.cnf:/etc/mysql/conf.d/replication.cnf
    networks:
      - mysql_network
    depends_on:
      - mysql-master
    command: >
      --server-id=2
      --relay-log=mysql-relay-bin
      --read-only=1

volumes:
  master_data:
  slave_data:

networks:
  mysql_network:
    driver: bridge
```

---

## Docker Swarm Orchestration

### Swarm Stack Configuration

**docker-stack.yml:**
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - mysql_network
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager
      resources:
        limits:
          cpus: '4'
          memory: 4G
        reservations:
          cpus: '2'
          memory: 2G
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s

volumes:
  mysql_data:
    driver: local

networks:
  mysql_network:
    driver: overlay
```

**Deploy Stack:**
```bash
docker stack deploy -c docker-stack.yml mysql
```

---

## Performance Optimization

### Resource Limits

**CPU and Memory:**
```yaml
services:
  mysql:
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 4G
        reservations:
          cpus: '2'
          memory: 2G
```

### I/O Optimization

**Storage Driver Options:**
```yaml
volumes:
  mysql_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /opt/mysql/data
      # Use direct I/O for better performance
      mount: "bind,noatime,nodiratime"
```

### Network Optimization

**Custom Network Configuration:**
```yaml
networks:
  mysql_network:
    driver: bridge
    driver_opts:
      com.docker.network.bridge.enable_icc: "true"
      com.docker.network.bridge.enable_ip_masquerade: "true"
      com.docker.network.driver.mtu: "1500"
```

---

## Backup and Recovery

### Automated Backups

**Backup Container:**
```yaml
services:
  mysql-backup:
    image: mysql:8.0
    volumes:
      - mysql_data:/var/lib/mysql:ro
      - ./backups:/backups
    command: >
      sh -c "
        while true; do
          mysqldump -h mysql -u root -p$${MYSQL_ROOT_PASSWORD} --all-databases > /backups/backup-$$(date +%Y%m%d-%H%M%S).sql
          sleep 86400
        done
      "
    depends_on:
      - mysql
    networks:
      - mysql_network
```

### Volume Backup

**Backup Volume:**
```bash
# Backup volume
docker run --rm \
    -v mysql_data:/data \
    -v $(pwd)/backups:/backup \
    alpine tar czf /backup/mysql-data-$(date +%Y%m%d).tar.gz /data

# Restore volume
docker run --rm \
    -v mysql_data:/data \
    -v $(pwd)/backups:/backup \
    alpine sh -c "cd /data && tar xzf /backup/mysql-data-20240101.tar.gz"
```

---

## Monitoring and Health Checks

### Health Check Configuration

According to the [Docker Healthcheck documentation](https://docs.docker.com/engine/reference/builder/#healthcheck), health checks ensure container availability:

```yaml
services:
  mysql:
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p${MYSQL_ROOT_PASSWORD}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
```

### Monitoring with Prometheus

**MySQL Exporter:**
```yaml
services:
  mysql-exporter:
    image: prom/mysqld-exporter
    environment:
      DATA_SOURCE_NAME: "root:${MYSQL_ROOT_PASSWORD}@(mysql:3306)/"
    ports:
      - "9104:9104"
    depends_on:
      - mysql
    networks:
      - mysql_network
```

---

## Troubleshooting

### Common Issues

**Container Won't Start:**
```bash
# Check logs
docker logs mysql-container

# Check container status
docker ps -a

# Inspect container
docker inspect mysql-container
```

**Data Persistence Issues:**
```bash
# Check volume
docker volume inspect mysql_data

# List volumes
docker volume ls

# Remove unused volumes
docker volume prune
```

**Network Connectivity:**
```bash
# Test connection
docker exec -it mysql-container mysql -u root -p

# Check network
docker network inspect mysql_network

# Test from another container
docker run --rm --network mysql_network mysql:8.0 mysql -h mysql -u root -p
```

---

## Best Practices

1. **Use Official Images:** Always use official MySQL images from Docker Hub
2. **Persist Data:** Use named volumes or bind mounts for data persistence
3. **Network Security:** Use internal networks and remove unnecessary port mappings
4. **Resource Limits:** Set appropriate CPU and memory limits
5. **Health Checks:** Implement health checks for container monitoring
6. **Backup Strategy:** Automate backups of both data and volumes
7. **Secrets Management:** Use Docker secrets for sensitive data
8. **Version Pinning:** Pin specific MySQL versions in production

---

## Conclusion

Docker provides excellent consistency and portability for MySQL deployments, but requires careful attention to data persistence, networking, and security. Following these patterns ensures production-ready containerized MySQL deployments.

**Key Takeaways:**
- Use official MySQL images
- Implement proper data persistence
- Secure network configuration
- Set resource limits
- Automate backups
- Monitor container health

## Next Steps

- **Need Orchestration?** → Read [Blog 5: Kubernetes MySQL](https://thisiskushal31.github.io/blog/#/blog/mysql-kubernetes-statefulset-operator-deep-dive)
- **Want Local Development?** → Read [Blog 6: Local Development Setup](https://thisiskushal31.github.io/blog/#/blog/mysql-local-development-docker-native-quick-start)
- **Planning Migration?** → Read [Blog 8: MySQL Deployment Decision Matrix](https://thisiskushal31.github.io/blog/#/blog/mysql-deployment-decision-matrix-complete-comparison-guide)

## Deep Dive Resources

For comprehensive technical details, explore our [MySQL Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md).

**Official Documentation:**
- [MySQL Docker Hub](https://hub.docker.com/_/mysql)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Swarm Documentation](https://docs.docker.com/engine/swarm/)

---

**Fact-Checking & Verification:** This blog post contains technical specifications, Docker configurations, and best practices based on publicly available documentation and industry research. Docker commands and configurations may vary by version and environment. For the most current and accurate information, please consult:
- [MySQL Official Documentation](https://dev.mysql.com/doc/)
- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Hub MySQL Images](https://hub.docker.com/_/mysql)

---

*This is Blog 4 of the MySQL Mastery Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/mysql-mastery-series) to explore all posts.*

