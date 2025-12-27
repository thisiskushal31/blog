# Blog 6: Local Development - Docker vs Native Installation

*Optimize your development environment for maximum productivity*

---

## Introduction

Setting up MySQL for local development shouldn't be complicated, but choosing between Docker and native installation can impact your productivity. This guide covers both approaches, helping you choose the right method for your workflow and optimize your development environment.

## TL;DR

- **What:** Complete guide to MySQL local development setup
- **When to use:** When setting up MySQL for development or testing
- **Reading time:** 8-10 minutes
- **Implementation time:** 15-30 minutes for setup
- **Key takeaway:** Docker provides consistency, native installation offers better performance—choose based on your needs
- **Skip if:** You're only deploying to production and don't need local development

**What You'll Master:**
- Docker development setup with hot-reloading
- Native installation performance comparison
- IDE integration and debugging configurations
- Local replication setup for multi-node testing
- Development-to-production parity strategies

---

## Docker Development Setup

> 💡 **Learning MySQL basics?** Check out our [MySQL SQL Fundamentals Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md#sql-fundamentals) for comprehensive SQL commands, queries, and data manipulation techniques.

### Quick Start with Docker

According to the [MySQL Docker Hub documentation](https://hub.docker.com/_/mysql), the official MySQL image is the easiest way to get started:

**Basic Setup:**
```bash
docker run --name mysql-dev \
    -e MYSQL_ROOT_PASSWORD=devpassword \
    -e MYSQL_DATABASE=myapp_dev \
    -p 3306:3306 \
    -d mysql:8.0
```

**Connect:**
```bash
mysql -h 127.0.0.1 -P 3306 -u root -pdevpassword
```

### Docker Compose for Development

**docker-compose.dev.yml:**
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql-dev
    environment:
      MYSQL_ROOT_PASSWORD: devpassword
      MYSQL_DATABASE: myapp_dev
      MYSQL_USER: devuser
      MYSQL_PASSWORD: devpassword
    ports:
      - "3306:3306"
    volumes:
      - mysql_dev_data:/var/lib/mysql
      - ./init:/docker-entrypoint-initdb.d
      - ./my.cnf:/etc/mysql/conf.d/custom.cnf:ro
    command: >
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_unicode_ci
      --max-connections=200
      --slow-query-log=1
      --long-query-time=1
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  mysql_dev_data:
```

**Start Development Environment:**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Development-Specific Configuration

**my.cnf for Development:**
```ini
[mysqld]
# Development-friendly settings
max_connections=200
innodb_buffer_pool_size=1G
innodb_log_file_size=128M
slow_query_log=1
long_query_time=1
log_queries_not_using_indexes=1

# Relaxed settings for development
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
```

---

## Native Installation

### Installation Methods

**Ubuntu/Debian:**
```bash
# Using apt
sudo apt update
sudo apt install mysql-server

# Using official repository
wget https://dev.mysql.com/get/mysql-apt-config_0.8.24-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.24-1_all.deb
sudo apt update
sudo apt install mysql-server
```

**macOS:**
```bash
# Using Homebrew
brew install mysql
brew services start mysql

# Or using official installer
# Download from https://dev.mysql.com/downloads/mysql/
```

**Windows:**
- Download MySQL Installer from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
- Run installer and follow setup wizard
- Configure as Windows service

### Post-Installation Setup

**Secure Installation:**
```bash
sudo mysql_secure_installation
```

**Create Development User:**
```sql
CREATE USER 'devuser'@'localhost' IDENTIFIED BY 'devpassword';
GRANT ALL PRIVILEGES ON *.* TO 'devuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

---

## Performance Comparison

### Docker vs Native

**Docker Advantages:**
- Consistent across environments
- Easy cleanup (just remove container)
- Isolated from system
- Quick setup

**Docker Disadvantages:**
- Slight performance overhead
- Network latency (minimal)
- Resource overhead

**Native Advantages:**
- Best performance
- Direct system integration
- No container overhead
- Better for intensive testing

**Native Disadvantages:**
- Platform-specific setup
- Harder to clean up
- Can affect system
- More setup steps

### Benchmark Results

**Simple Query Performance:**
- Docker: ~0.5ms overhead per query
- Native: Baseline performance

**For Development:** The performance difference is negligible for most development workloads.

---

## IDE Integration

### VS Code

**MySQL Extension:**
```json
{
  "recommendations": [
    "cweijan.vscode-mysql-client2"
  ]
}
```

**Connection Configuration:**
```json
{
  "mysql.host": "localhost",
  "mysql.port": 3306,
  "mysql.user": "devuser",
  "mysql.password": "devpassword",
  "mysql.database": "myapp_dev"
}
```

### IntelliJ IDEA / DataGrip

**Database Connection:**
1. Open Database tool window
2. Click + → Data Source → MySQL
3. Configure:
   - Host: localhost
   - Port: 3306
   - User: devuser
   - Password: devpassword
   - Database: myapp_dev

### MySQL Workbench

According to the [MySQL Workbench documentation](https://dev.mysql.com/doc/workbench/en/), "MySQL Workbench is a unified visual tool for database architects, developers, and DBAs."

**Connection Setup:**
1. Open MySQL Workbench
2. Click + to add connection
3. Configure connection parameters
4. Test connection

---

## Local Replication Setup

### Docker Compose with Replication

**docker-compose.replication.yml:**
```yaml
version: '3.8'

services:
  mysql-master:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: devpassword
      MYSQL_REPLICATION_MODE: master
      MYSQL_REPLICATION_USER: replicator
      MYSQL_REPLICATION_PASSWORD: replicatorpass
    ports:
      - "3306:3306"
    volumes:
      - master_data:/var/lib/mysql

  mysql-slave:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: devpassword
      MYSQL_REPLICATION_MODE: slave
      MYSQL_REPLICATION_USER: replicator
      MYSQL_REPLICATION_PASSWORD: replicatorpass
      MYSQL_MASTER_HOST: mysql-master
    ports:
      - "3307:3306"
    volumes:
      - slave_data:/var/lib/mysql
    depends_on:
      - mysql-master

volumes:
  master_data:
  slave_data:
```

### Native Replication Setup

**Master Configuration (my.cnf):**
```ini
[mysqld]
server-id=1
log-bin=mysql-bin
binlog-format=ROW
```

**Slave Configuration (my.cnf):**
```ini
[mysqld]
server-id=2
relay-log=mysql-relay-bin
read-only=1
```

**Setup Replication:**
```sql
-- On master
CREATE USER 'replicator'@'%' IDENTIFIED BY 'replicatorpass';
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'%';
FLUSH PRIVILEGES;
SHOW MASTER STATUS;

-- On slave
CHANGE MASTER TO
    MASTER_HOST='localhost',
    MASTER_USER='replicator',
    MASTER_PASSWORD='replicatorpass',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=154;
START SLAVE;
SHOW SLAVE STATUS\G
```

---

## Development-to-Production Parity

### Configuration Parity

**Use Same MySQL Version:**
```yaml
# Development
image: mysql:8.0.35

# Production (should match)
image: mysql:8.0.35
```

**Environment Variables:**
```bash
# .env.dev
MYSQL_VERSION=8.0.35
MYSQL_CHARACTER_SET=utf8mb4
MYSQL_COLLATION=utf8mb4_unicode_ci

# .env.prod (use same values where applicable)
```

### Data Seeding

**Initialization Scripts:**
```sql
-- init/01-schema.sql
CREATE DATABASE IF NOT EXISTS myapp_dev;
USE myapp_dev;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- init/02-seed.sql
INSERT INTO users (username, email) VALUES
('admin', 'admin@example.com'),
('user1', 'user1@example.com');
```

**Docker Entrypoint:**
```yaml
volumes:
  - ./init:/docker-entrypoint-initdb.d
```

According to the [MySQL Docker documentation](https://hub.docker.com/_/mysql), "Files in /docker-entrypoint-initdb.d/ are executed in alphabetical order when the container is first started."

---

## Debugging and Troubleshooting

### Enable General Query Log

**For Development:**
```sql
SET GLOBAL general_log = 'ON';
SET GLOBAL log_output = 'TABLE';
SELECT * FROM mysql.general_log ORDER BY event_time DESC LIMIT 10;
```

### Slow Query Analysis

**Enable Slow Query Log:**
```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 0.1;  -- Log queries > 100ms
```

**Analyze Slow Queries:**
```bash
mysqldumpslow /var/log/mysql/slow.log
```

### Connection Debugging

**Check Connections:**
```sql
SHOW PROCESSLIST;
SHOW STATUS LIKE 'Threads_connected';
SHOW VARIABLES LIKE 'max_connections';
```

---

## Best Practices

1. **Use Docker for Consistency:** Ensures same environment across team
2. **Version Pinning:** Pin MySQL version in development
3. **Data Seeding:** Automate test data creation
4. **Configuration Management:** Use version-controlled config files
5. **Cleanup Scripts:** Easy reset of development database
6. **Documentation:** Document setup process for team

---

## Conclusion

Both Docker and native installation have their place in development. Docker provides consistency and easy cleanup, while native installation offers better performance for intensive testing.

**Key Takeaways:**
- Docker is better for team consistency
- Native is better for performance testing
- Use same MySQL version in dev and prod
- Automate data seeding
- Document your setup

## Next Steps

- **Need Performance Tips?** → Read [Blog 7: MySQL Performance Optimization](https://thisiskushal31.github.io/blog/#/blog/mysql-performance-optimization-query-tuning-indexing)
- **Planning Production?** → Return to [Blog 1: Strategic Decision Framework](https://thisiskushal31.github.io/blog/#/blog/mysql-cloud-vs-self-managed-strategic-decision-framework)

## Deep Dive Resources

For comprehensive technical details, explore our [MySQL Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md).

**Official Documentation:**
- [MySQL Docker Hub](https://hub.docker.com/_/mysql)
- [MySQL Installation Guide](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
- [MySQL Workbench](https://dev.mysql.com/doc/workbench/en/)

---

*This is Blog 6 of the MySQL Mastery Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/mysql-mastery-series) to explore all posts.*

