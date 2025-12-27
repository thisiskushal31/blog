# Blog 3: Self-Managed MySQL - VM and Bare Metal Production Guide

*Build production-grade self-managed MySQL clusters with advanced optimization techniques*

---

## Introduction

Self-managed MySQL provides maximum control, customization, and cost optimization at scale. While it requires more operational expertise, the benefits of full control over configuration, performance tuning, and infrastructure can be significant for organizations with dedicated database teams.

This comprehensive guide covers everything from initial setup to advanced optimization, based on production deployments and official MySQL documentation. You'll learn how to build, configure, and operate self-managed MySQL clusters that rival or exceed managed service performance.

## TL;DR

- **What:** Complete guide to self-managed MySQL on VMs and bare metal
- **When to use:** When you need maximum control, cost optimization at scale, or specific performance requirements
- **Reading time:** 12-15 minutes
- **Implementation time:** 1-2 days for initial setup, ongoing optimization
- **Key takeaway:** Self-managed requires expertise but provides full control and significant cost savings at scale
- **Skip if:** You prefer managed services or lack database administration expertise

**What You'll Master:**
- Multi-node MySQL cluster setup and replication
- Bare metal performance tuning: CPU, memory, storage
- Hardware sizing calculations and capacity planning
- Monitoring, alerting, and operational procedures
- Backup and disaster recovery strategies

---

## Architecture Overview

### Replication Topology

According to the [MySQL Replication documentation](https://dev.mysql.com/doc/refman/8.0/en/replication.html), "MySQL replication enables data from one MySQL database server (the source) to be copied to one or more MySQL database servers (the replicas)."

**Common Topologies:**

1. **Master-Slave (Source-Replica):**
   - One master handles all writes
   - Multiple replicas for read scaling
   - Simple to set up and maintain

2. **Master-Master (Primary-Primary):**
   - Both servers accept writes
   - Requires conflict resolution
   - More complex but provides redundancy

3. **Chain Replication:**
   - Master → Replica 1 → Replica 2
   - Reduces load on master
   - Higher latency for downstream replicas

4. **MySQL Group Replication:**
   - Multi-master with automatic failover
   - Built-in conflict detection
   - Recommended for high availability

### MySQL Group Replication

The [MySQL Group Replication documentation](https://dev.mysql.com/doc/refman/8.0/en/group-replication.html) states: "MySQL Group Replication provides distributed state machine replication with strong consistency. It enables you to create highly available, fault-tolerant replication topologies."

**Key Features:**
- Automatic member management
- Built-in conflict detection
- Multi-master replication
- Automatic failover

---

## Installation and Initial Setup

> 💡 **Want detailed installation guidance?** See our [MySQL Installation & Configuration Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md#overview--architecture) for comprehensive setup instructions and configuration tuning.

### Installation Methods

**Package Manager (Recommended):**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# CentOS/RHEL
sudo yum install mysql-server

# Verify installation
mysql --version
```

**Official MySQL Repository:**
According to the [MySQL Installation Guide](https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html), using the official repository ensures you get the latest version:

```bash
# Download MySQL APT repository
wget https://dev.mysql.com/get/mysql-apt-config_0.8.24-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.24-1_all.deb

# Update and install
sudo apt update
sudo apt install mysql-server
```

### Initial Configuration

**Secure Installation:**
```bash
# Run security script
sudo mysql_secure_installation

# This will:
# - Set root password
# - Remove anonymous users
# - Disable root remote login
# - Remove test database
# - Reload privilege tables
```

**Start and Enable Service:**
```bash
sudo systemctl start mysql
sudo systemctl enable mysql
sudo systemctl status mysql
```

---

## Configuration Optimization

### my.cnf Configuration

The [MySQL Server System Variables documentation](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html) provides comprehensive guidance on configuration parameters.

**Basic Configuration:**
```ini
[mysqld]
# Basic settings
datadir=/var/lib/mysql
socket=/var/run/mysqld/mysqld.sock
port=3306
bind-address=0.0.0.0

# Character set
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
```

**InnoDB Configuration:**

According to the [InnoDB Configuration documentation](https://dev.mysql.com/doc/refman/8.0/en/innodb-configuration.html), proper InnoDB configuration is critical for performance:

```ini
# InnoDB settings
innodb_buffer_pool_size=16G  # 70-80% of RAM
innodb_buffer_pool_instances=8  # For large buffer pools
innodb_log_file_size=512M
innodb_log_buffer_size=64M
innodb_flush_log_at_trx_commit=2  # Balance durability and performance
innodb_flush_method=O_DIRECT
innodb_file_per_table=1
innodb_read_io_threads=4
innodb_write_io_threads=4
```

**Key InnoDB Parameters:**

The [InnoDB Startup Options documentation](https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html) explains:

- **innodb_buffer_pool_size**: "The size in bytes of the memory buffer InnoDB uses to cache data and indexes of its tables."
- **innodb_log_file_size**: "The size in bytes of each log file in a log group."
- **innodb_flush_log_at_trx_commit**: Controls durability vs performance trade-off

**Connection Settings:**
```ini
# Connection management
max_connections=500
thread_cache_size=50
table_open_cache=4000
table_definition_cache=2000
```

**Query Cache (Removed in MySQL 8.0):**

Note: The query cache was removed in MySQL 8.0. As stated in the [MySQL 8.0 Release Notes](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-3.html), "The query cache has been deprecated since MySQL 5.7.20, and is removed in MySQL 8.0."

**Logging Configuration:**
```ini
# Error log
log_error=/var/log/mysql/error.log
log_error_verbosity=2

# Slow query log
slow_query_log=1
slow_query_log_file=/var/log/mysql/slow.log
long_query_time=2
log_queries_not_using_indexes=1

# Binary log (for replication)
log_bin=/var/log/mysql/mysql-bin.log
binlog_format=ROW
binlog_expire_logs_seconds=604800  # 7 days
max_binlog_size=100M
```

---

## Replication Setup

### Master-Slave (Source-Replica) Configuration

**Master Configuration:**

According to the [MySQL Replication Setup documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-howto.html):

```ini
[mysqld]
# Enable binary logging
log_bin=mysql-bin
server_id=1
binlog_format=ROW

# Replication settings
expire_logs_days=7
max_binlog_size=100M
```

**Create Replication User:**
```sql
-- On master
CREATE USER 'replicator'@'%' IDENTIFIED BY 'secure_password';
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'%';
FLUSH PRIVILEGES;

-- Verify
SHOW MASTER STATUS;
```

**Slave Configuration:**
```ini
[mysqld]
server_id=2
relay_log=mysql-relay-bin
read_only=1
```

**Setup Replication:**
```sql
-- On slave
CHANGE MASTER TO
    MASTER_HOST='master_ip',
    MASTER_USER='replicator',
    MASTER_PASSWORD='secure_password',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=154;

START SLAVE;
SHOW SLAVE STATUS\G
```

### MySQL Group Replication

**Initialize Group Replication:**

As documented in the [MySQL Group Replication Guide](https://dev.mysql.com/doc/refman/8.0/en/group-replication-deploying.html):

```sql
-- On first node
SET GLOBAL group_replication_group_name="aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
SET GLOBAL group_replication_start_on_boot=off;
SET GLOBAL group_replication_local_address="192.168.1.10:33061";
SET GLOBAL group_replication_group_seeds="192.168.1.10:33061,192.168.1.11:33061,192.168.1.12:33061";
SET GLOBAL group_replication_bootstrap_group=on;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group=off;

-- On other nodes
START GROUP_REPLICATION;
```

---

## Performance Tuning

### Hardware Optimization

**CPU:**
- Use CPUs with high single-thread performance for OLTP
- Multiple cores for parallel operations
- NUMA awareness for multi-socket systems

**Memory:**
- Allocate 70-80% of RAM to InnoDB buffer pool
- Reserve memory for OS and other processes
- Use ECC memory for production

**Storage:**
- Use NVMe SSDs for best performance
- Separate data and log files on different devices
- Configure appropriate I/O scheduler (deadline or noop)

**Network:**
- Use 10GbE or faster for replication
- Minimize network latency between nodes
- Configure appropriate TCP settings

### Query Optimization

**Enable Performance Schema:**

The [Performance Schema documentation](https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html) explains: "The MySQL Performance Schema is a feature for monitoring MySQL server execution at a low level."

```sql
-- Check enabled instruments
SELECT * FROM performance_schema.setup_instruments 
WHERE name LIKE 'statement%';

-- Top queries by execution time
SELECT 
    digest_text,
    count_star,
    sum_timer_wait/1000000000000 as total_time_sec,
    avg_timer_wait/1000000000000 as avg_time_sec
FROM performance_schema.events_statements_summary_by_digest
ORDER BY sum_timer_wait DESC
LIMIT 10;
```

**Index Optimization:**
```sql
-- Analyze table statistics
ANALYZE TABLE users;

-- Check index usage
SHOW INDEX FROM users;

-- Optimize table
OPTIMIZE TABLE users;
```

---

## High Availability

> 💡 **Need comprehensive HA strategies?** Explore our [MySQL Performance & Operations Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md#performance--operations) for detailed replication, failover, and backup strategies.

### Automatic Failover with MySQL Router

MySQL Router provides automatic failover. According to the [MySQL Router documentation](https://dev.mysql.com/doc/mysql-router/8.0/en/), "MySQL Router is a lightweight middleware that provides transparent routing between your application and back-end MySQL servers."

**Configuration:**
```ini
[DEFAULT]
logging_folder=/var/log/mysqlrouter
runtime_folder=/var/run/mysqlrouter
config_folder=/etc/mysqlrouter

[routing:primary]
bind_address=0.0.0.0
bind_port=6446
destinations=192.168.1.10:3306,192.168.1.11:3306
routing_strategy=round-robin
mode=read-write

[routing:replicas]
bind_address=0.0.0.0
bind_port=6447
destinations=192.168.1.12:3306,192.168.1.13:3306
routing_strategy=round-robin
mode=read-only
```

---

## Backup and Recovery

### mysqldump

According to the [mysqldump documentation](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html), "The mysqldump client utility performs logical backups, producing a set of SQL statements that can be executed to reproduce the original database object definitions and table data."

**Full Backup:**
```bash
mysqldump -u root -p \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    --all-databases > backup_$(date +%Y%m%d).sql
```

**Single Database:**
```bash
mysqldump -u root -p \
    --single-transaction \
    --routines \
    --triggers \
    mydb > mydb_backup.sql
```

### Point-in-Time Recovery

**Requirements:**
- Full backup
- Binary logs from backup time to target time

**Process:**
```bash
# 1. Restore full backup
mysql -u root -p < full_backup.sql

# 2. Apply binary logs
mysqlbinlog --start-datetime="2024-01-01 00:00:00" \
    --stop-datetime="2024-01-01 12:00:00" \
    mysql-bin.000001 | mysql -u root -p
```

---

## Monitoring and Alerting

### Key Metrics to Monitor

**Performance Metrics:**
- Query performance (slow queries)
- Connection usage
- Buffer pool hit ratio
- Replication lag
- Disk I/O

**System Metrics:**
- CPU usage
- Memory usage
- Disk space
- Network I/O

**Health Checks:**
```sql
-- Check replication status
SHOW SLAVE STATUS\G

-- Check process list
SHOW PROCESSLIST;

-- Check table status
SHOW TABLE STATUS LIKE 'users';

-- Check InnoDB status
SHOW ENGINE INNODB STATUS\G
```

---

## Security Best Practices

### User Management

According to the [MySQL User Account Management documentation](https://dev.mysql.com/doc/refman/8.0/en/user-account-management.html):

```sql
-- Create application user
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant minimal privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON mydb.* TO 'app_user'@'localhost';

-- Revoke unnecessary privileges
REVOKE ALL PRIVILEGES ON *.* FROM 'app_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON mydb.* TO 'app_user'@'localhost';

-- Show grants
SHOW GRANTS FOR 'app_user'@'localhost';
```

### Encryption

**Encryption at Rest (MySQL 8.0):**

The [MySQL Encryption at Rest documentation](https://dev.mysql.com/doc/refman/8.0/en/innodb-tablespace-encryption.html) explains how to enable encryption:

```sql
-- Create encryption key
ALTER INSTANCE ROTATE INNODB MASTER KEY;

-- Enable encryption for tablespace
ALTER TABLE users ENCRYPTION='Y';
```

**Encryption in Transit:**
- Use SSL/TLS for all connections
- Configure SSL certificates
- Require SSL for remote connections

---

## Conclusion

Self-managed MySQL provides maximum control and flexibility, but requires significant operational expertise. Proper configuration, monitoring, and maintenance are essential for production deployments.

**Key Takeaways:**
- Invest in proper hardware and configuration
- Set up replication for high availability
- Implement comprehensive monitoring and alerting
- Regular backups and disaster recovery testing
- Security hardening from day one

## Next Steps

- **Need High Availability?** → Implement MySQL Group Replication
- **Want to Optimize?** → Tune InnoDB and query performance
- **Planning Migration?** → Read [Blog 8: MySQL Deployment Decision Matrix](https://thisiskushal31.github.io/blog/#/blog/mysql-deployment-decision-matrix-complete-comparison-guide)

## Deep Dive Resources

For comprehensive technical details, explore our [MySQL Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md) and [Relational Databases Overview](https://thisiskushal31.github.io/dochub/#/databases/relational/README.md).

**Official Documentation:**
- [MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/)
- [MySQL Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)
- [MySQL Group Replication](https://dev.mysql.com/doc/refman/8.0/en/group-replication.html)
- [InnoDB Configuration](https://dev.mysql.com/doc/refman/8.0/en/innodb-configuration.html)

---

*This is Blog 3 of the MySQL Mastery Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/mysql-mastery-series) to explore all posts.*

