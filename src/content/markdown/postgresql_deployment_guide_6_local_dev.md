# PostgreSQL Local Development - Docker vs Native Quick Start

*Optimize your development environment for maximum productivity and seamless production parity*

---

## Introduction

Setting up PostgreSQL for local development shouldn't be complicated, but choosing between Docker and native installation can impact your productivity. This guide covers both approaches, helping you choose the right method for your workflow and optimize your development environment.

For technical managers, this guide helps you understand the trade-offs between Docker and native installations, and how to ensure development environments match production for better quality and faster delivery.

## TL;DR

- **What:** Complete guide to PostgreSQL local development setup
- **When to use:** When setting up PostgreSQL for development or testing
- **Reading time:** 8-10 minutes
- **Implementation time:** 15-30 minutes for setup
- **Key takeaway:** Docker provides consistency, native installation offers better performance—choose based on your team's workflow and needs
- **Skip if:** You're only deploying to production and don't need local development

**What You'll Master:**
- Docker development setup with hot-reloading
- Native installation performance comparison
- IDE integration and debugging configurations
- Local replication setup for multi-node testing
- Development-to-production parity strategies

---

## Docker Development Setup

> 💡 **Learning PostgreSQL basics?** Check out my [PostgreSQL SQL Fundamentals Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/postgresql/README.md#sql-fundamentals) for comprehensive SQL commands, queries, and data manipulation techniques.

### Quick Start with Docker

The official PostgreSQL Docker image is the easiest way to get started:

**Basic Setup:**
```bash
docker run --name postgres-dev \
    -e POSTGRES_PASSWORD=devpassword \
    -e POSTGRES_DB=myapp_dev \
    -p 5432:5432 \
    -d postgres:15
```

**Connect:**
```bash
psql -h localhost -p 5432 -U postgres -d myapp_dev
```

### Docker Compose for Development

**docker-compose.dev.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: postgres-dev
    environment:
      POSTGRES_PASSWORD: devpassword
      POSTGRES_DB: myapp_dev
      POSTGRES_USER: devuser
    ports:
      - "5432:5432"
    volumes:
      - postgres_dev_data:/var/lib/postgresql/data
      - ./init:/docker-entrypoint-initdb.d
      - ./postgresql.conf:/etc/postgresql/postgresql.conf:ro
    command: >
      postgres
      -c shared_buffers=512MB
      -c effective_cache_size=2GB
      -c max_connections=200
      -c log_statement=all
      -c log_duration=on
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devuser"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  postgres_dev_data:
```

**Start Development Environment:**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Development-Specific Configuration

**postgresql.conf for Development:**
```ini
# Development-friendly settings
max_connections=200
shared_buffers=512MB
effective_cache_size=2GB
log_statement=all
log_duration=on
log_line_prefix='%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
```

---

## Native Installation

### Installation Methods

**macOS (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
- Download installer from postgresql.org
- Run installer with default options
- PostgreSQL service starts automatically

### Post-Installation Setup

**Create Development Database:**
```bash
createdb myapp_dev
psql myapp_dev
```

**Development User:**
```sql
CREATE USER devuser WITH PASSWORD 'devpassword';
GRANT ALL PRIVILEGES ON DATABASE myapp_dev TO devuser;
```

---

## Performance Comparison: Docker vs Native

### Docker Performance

**Advantages:**
- Consistent across team members
- Easy to reset and recreate
- Matches production container environment
- Isolated from system

**Disadvantages:**
- Slight performance overhead (5-10%)
- Network overhead for local connections
- Resource limits may apply

### Native Performance

**Advantages:**
- Best performance (no container overhead)
- Direct filesystem access
- No network overhead
- Full system resources

**Disadvantages:**
- Platform-specific setup
- Harder to match production exactly
- System-level configuration required

**Real-World Impact:**
- For most development: Performance difference is negligible
- For performance testing: Native may be better
- For team consistency: Docker is better

---

## IDE Integration

### VS Code

**Extensions:**
- PostgreSQL (by Chris Kolkman)
- SQLTools + SQLTools PostgreSQL Driver

**Configuration:**
```json
{
  "sqltools.connections": [
    {
      "name": "PostgreSQL Dev",
      "driver": "PostgreSQL",
      "server": "localhost",
      "port": 5432,
      "database": "myapp_dev",
      "username": "devuser",
      "password": "devpassword"
    }
  ]
}
```

### IntelliJ IDEA / DataGrip

**Connection Setup:**
- Database: PostgreSQL
- Host: localhost
- Port: 5432
- Database: myapp_dev
- User: devuser
- Password: devpassword

---

## Development-to-Production Parity

### Configuration Matching

**Strategy:**
- Use same PostgreSQL version in dev and prod
- Match key configuration parameters
- Use similar data volumes for testing
- Test with production-like data

**Benefits:**
- Catch issues early
- Reduce deployment surprises
- Better performance testing
- Improved confidence in changes

---

## Local Replication Setup

### Docker Compose with Replication

**Multi-Node Development:**
```yaml
version: '3.8'

services:
  postgres-primary:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: devpassword
      POSTGRES_REPLICATION_USER: replicator
      POSTGRES_REPLICATION_PASSWORD: replicatorpass
    command: >
      postgres
      -c wal_level=replica
      -c max_wal_senders=3
    networks:
      - postgres_network

  postgres-replica:
    image: postgres:15
    environment:
      PGUSER: replicator
      POSTGRES_MASTER_SERVICE: postgres-primary
    depends_on:
      - postgres-primary
    networks:
      - postgres_network
```

---

## When to Choose Each Approach

### Choose Docker When:

1. **Team Consistency:** Need identical environments across team
2. **CI/CD Integration:** Automated testing in containers
3. **Multi-Service Development:** Running multiple services together
4. **Platform Independence:** Windows, macOS, Linux compatibility
5. **Production Parity:** Production uses containers

### Choose Native When:

1. **Performance Testing:** Need maximum performance
2. **Deep Debugging:** Require direct filesystem access
3. **Custom Configuration:** Need system-level tuning
4. **Resource Constraints:** Limited Docker resources
5. **Production Uses Native:** Production is native installation

---

## Cost Considerations

### Development Environment Costs

**Docker:**
- Infrastructure: $0 (local machine)
- Setup time: 15 minutes
- Maintenance: Low (container management)

**Native:**
- Infrastructure: $0 (local machine)
- Setup time: 30 minutes
- Maintenance: Low (package updates)

**Key Insight:** Both approaches have minimal cost for development. Choose based on workflow and team preferences.

---

## Next Steps

- **Need Production Setup?** → Read [Blog 3: Self-Managed](https://thisiskushal31.github.io/blog/#/blog/postgresql-self-managed-vm-bare-metal-production-guide) or [Blog 2: Cloud-Managed](https://thisiskushal31.github.io/blog/#/blog/postgresql-cloud-managed-rds-cloud-sql-azure-deep-dive)
- **Want Performance Optimization?** → Read [Blog 7: Performance Optimization](https://thisiskushal31.github.io/blog/#/blog/postgresql-performance-optimization-query-tuning-indexing)
- **Considering Kubernetes?** → Read [Blog 5: Kubernetes Deep Dive](https://thisiskushal31.github.io/blog/#/blog/postgresql-kubernetes-statefulset-operator-deep-dive)

## Deep Dive Resources

For comprehensive technical details, explore my [PostgreSQL Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/postgresql/README.md).

---

**Fact-Checking & Verification:** This blog post contains setup instructions, configuration examples, and best practices based on publicly available documentation and industry research. Installation steps and commands may vary by operating system and PostgreSQL version. For the most current and accurate information, please consult:
- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Download Page](https://www.postgresql.org/download/)
- [Docker Official Documentation](https://docs.docker.com/)

---

*This post is part of the PostgreSQL Deployment Guide Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/postgresql-deployment-guide) to explore all posts.*

