# MySQL Performance Optimization - Query Tuning and Indexing

*Master MySQL performance optimization with advanced tuning techniques*

---

## Introduction

MySQL performance optimization is both an art and a science. Understanding query execution, indexing strategies, and configuration tuning can transform a slow database into a high-performance system. This guide covers everything from basic query optimization to advanced indexing techniques.

## TL;DR

- **What:** Complete guide to MySQL performance optimization
- **When to use:** When you need to improve database performance
- **Reading time:** 12-15 minutes
- **Implementation time:** Ongoing optimization process
- **Key takeaway:** Proper indexing and query optimization can improve performance by 10-100x
- **Skip if:** Your database performance is already optimal

**What You'll Master:**
- Query optimization and execution plan analysis
- Indexing strategies and best practices
- Configuration tuning for different workloads
- Connection pooling and resource management
- Monitoring and profiling tools

---

## Query Optimization

> 💡 **Want comprehensive query optimization techniques?** Explore my [MySQL SQL Fundamentals Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md#sql-fundamentals) for advanced query patterns, subqueries, and window functions.

### EXPLAIN Statement

According to the [MySQL EXPLAIN documentation](https://dev.mysql.com/doc/refman/8.0/en/explain.html), "The EXPLAIN statement provides information about how MySQL executes statements."

**Basic Usage:**
```sql
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';
```

**EXPLAIN Output Columns:**
- `id`: Select identifier
- `select_type`: Type of SELECT
- `table`: Table name
- `type`: Join type (important for performance)
- `possible_keys`: Possible indexes
- `key`: Index actually used
- `rows`: Estimated rows examined
- `Extra`: Additional information

**EXPLAIN ANALYZE (MySQL 8.0.18+):**
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```

According to the [MySQL 8.0 Release Notes](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-18.html), "EXPLAIN ANALYZE runs a statement and produces EXPLAIN output along with timing and additional, iterator-based, information about how the optimizer's expectations matched the actual execution."

### Query Execution Plans

**Good Execution Plan:**
```
type: ref
key: idx_email
rows: 1
Extra: Using index
```

**Bad Execution Plan:**
```
type: ALL
key: NULL
rows: 1000000
Extra: Using where
```

### Common Query Issues

**1. Full Table Scans:**
```sql
-- Bad: Full table scan
SELECT * FROM users WHERE name LIKE '%john%';

-- Better: Use full-text index
ALTER TABLE users ADD FULLTEXT INDEX idx_name (name);
SELECT * FROM users WHERE MATCH(name) AGAINST('john' IN NATURAL LANGUAGE MODE);
```

**2. Functions on Indexed Columns:**
```sql
-- Bad: Can't use index
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- Better: Range query
SELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';
```

**3. OR Conditions:**
```sql
-- Bad: May not use indexes efficiently
SELECT * FROM users WHERE email = 'user@example.com' OR username = 'user';

-- Better: Use UNION
SELECT * FROM users WHERE email = 'user@example.com'
UNION
SELECT * FROM users WHERE username = 'user';
```

---

## Indexing Strategies

> 💡 **Need detailed indexing guidance?** See my [MySQL Data Management Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md#data-management) for comprehensive indexing strategies, composite indexes, and index optimization techniques.

### Index Types

According to the [MySQL Index documentation](https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html), MySQL supports several index types:

**1. Primary Index:**
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Primary index
    email VARCHAR(100) NOT NULL
);
```

**2. Secondary Index:**
```sql
CREATE INDEX idx_email ON users(email);
```

**3. Composite Index:**
```sql
CREATE INDEX idx_user_status ON users(user_id, status);
```

**4. Covering Index:**
```sql
-- Index contains all columns needed for query
CREATE INDEX idx_covering ON users(user_id, status, created_at);
SELECT user_id, status, created_at FROM users WHERE user_id = 1;
```

**5. Partial Index:**
```sql
-- Index only active users
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';
```

### Index Best Practices

**1. Index Frequently Queried Columns:**
```sql
-- Index columns in WHERE, JOIN, ORDER BY
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_created_at ON orders(created_at);
```

**2. Composite Index Order Matters:**
```sql
-- Good: Most selective first
CREATE INDEX idx_user_status_date ON orders(user_id, status, created_at);

-- Query can use index for:
-- - user_id
-- - user_id, status
-- - user_id, status, created_at
```

**3. Avoid Over-Indexing:**
- Each index slows down writes
- Monitor index usage
- Remove unused indexes

**4. Index Cardinality:**
```sql
-- Check index cardinality
SHOW INDEX FROM users;

-- High cardinality = more selective = better index
```

### Index Maintenance

**Analyze Tables:**
```sql
ANALYZE TABLE users;
```

According to the [MySQL ANALYZE TABLE documentation](https://dev.mysql.com/doc/refman/8.0/en/analyze-table.html), "ANALYZE TABLE analyzes and stores the key distribution for a table."

**Optimize Tables:**
```sql
OPTIMIZE TABLE users;
```

**Rebuild Indexes:**
```sql
ALTER TABLE users ENGINE=InnoDB;
```

---

## Configuration Tuning

### InnoDB Buffer Pool

According to the [InnoDB Buffer Pool documentation](https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool.html), "The buffer pool is an area in main memory where InnoDB caches table and index data as it is accessed."

**Configuration:**
```ini
[mysqld]
# Set to 70-80% of available RAM
innodb_buffer_pool_size=16G

# For large buffer pools, use multiple instances
innodb_buffer_pool_instances=8
```

**Monitor Buffer Pool:**
```sql
SHOW STATUS LIKE 'Innodb_buffer_pool%';

-- Hit ratio should be > 99%
SELECT 
    (1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests)) * 100 
    AS buffer_pool_hit_ratio;
```

### Connection Management

**Max Connections:**
```ini
[mysqld]
max_connections=500
thread_cache_size=50
```

**Connection Pooling:**
```python
# Python example
import mysql.connector
from mysql.connector import pooling

config = {
    'pool_name': 'mypool',
    'pool_size': 10,
    'pool_reset_session': True,
    'user': 'user',
    'password': 'password',
    'host': 'localhost',
    'database': 'mydb'
}

pool = mysql.connector.pooling.MySQLConnectionPool(**config)
```

### Query Cache (Removed in MySQL 8.0)

Note: Query cache was removed in MySQL 8.0. As stated in the [MySQL 8.0 Release Notes](https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-3.html), "The query cache has been deprecated since MySQL 5.7.20, and is removed in MySQL 8.0."

---

## Performance Schema

### Enabling Performance Schema

According to the [Performance Schema documentation](https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html), "The MySQL Performance Schema is a feature for monitoring MySQL server execution at a low level."

**Check Enabled Instruments:**
```sql
SELECT * FROM performance_schema.setup_instruments 
WHERE name LIKE 'statement%';
```

### Top Queries by Execution Time

```sql
SELECT 
    digest_text,
    count_star AS exec_count,
    sum_timer_wait/1000000000000 AS total_time_sec,
    avg_timer_wait/1000000000000 AS avg_time_sec,
    max_timer_wait/1000000000000 AS max_time_sec
FROM performance_schema.events_statements_summary_by_digest
ORDER BY sum_timer_wait DESC
LIMIT 10;
```

### Top Queries by Execution Count

```sql
SELECT 
    digest_text,
    count_star AS exec_count,
    sum_timer_wait/1000000000000 AS total_time_sec
FROM performance_schema.events_statements_summary_by_digest
ORDER BY count_star DESC
LIMIT 10;
```

---

## Slow Query Log

### Configuration

```ini
[mysqld]
slow_query_log=1
slow_query_log_file=/var/log/mysql/slow.log
long_query_time=2
log_queries_not_using_indexes=1
log_slow_admin_statements=1
```

### Analysis

**Using mysqldumpslow:**
```bash
# Top 10 slow queries
mysqldumpslow -s t -t 10 /var/log/mysql/slow.log

# Queries by execution count
mysqldumpslow -s c -t 10 /var/log/mysql/slow.log
```

**Using pt-query-digest:**
```bash
pt-query-digest /var/log/mysql/slow.log
```

---

## Monitoring Tools

### MySQL Workbench Performance Dashboard

MySQL Workbench provides visual performance monitoring according to the [MySQL Workbench documentation](https://dev.mysql.com/doc/workbench/en/).

### Prometheus + mysqld_exporter

**Configuration:**
```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'mysql'
    static_configs:
      - targets: ['localhost:9104']
```

**Key Metrics:**
- `mysql_global_status_queries`: Total queries
- `mysql_global_status_slow_queries`: Slow queries
- `mysql_global_status_threads_connected`: Active connections
- `mysql_global_status_innodb_buffer_pool_read_requests`: Buffer pool reads

---

## Best Practices

1. **Always Use EXPLAIN:** Analyze query execution plans
2. **Index Strategically:** Don't over-index, monitor usage
3. **Monitor Performance:** Use Performance Schema and slow query log
4. **Tune Configuration:** Adjust based on workload
5. **Connection Pooling:** Use connection pooling in applications
6. **Regular Maintenance:** ANALYZE and OPTIMIZE tables regularly

---

## Conclusion

MySQL performance optimization requires understanding query execution, indexing, and configuration. Proper optimization can dramatically improve database performance.

**Key Takeaways:**
- Use EXPLAIN to analyze queries
- Create appropriate indexes
- Monitor performance continuously
- Tune configuration for workload
- Use connection pooling

## Next Steps

- **Need Decision Help?** → Read [Blog 8: MySQL Deployment Decision Matrix](https://thisiskushal31.github.io/blog/#/blog/mysql-deployment-decision-matrix-complete-comparison-guide)
- **Want More Details?** → Explore [MySQL Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md)

## Deep Dive Resources

For comprehensive technical details, explore my [MySQL Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md) and [Relational Databases Overview](https://thisiskushal31.github.io/dochub/#/databases/relational/README.md).

**Official Documentation:**
- [MySQL EXPLAIN](https://dev.mysql.com/doc/refman/8.0/en/explain.html)
- [MySQL Indexes](https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html)
- [Performance Schema](https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html)
- [InnoDB Buffer Pool](https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool.html)

---

**Fact-Checking & Verification:** This blog post contains performance tuning recommendations, configuration parameters, and optimization strategies based on publicly available documentation and industry research. Performance characteristics and optimal settings may vary significantly by workload, hardware, and MySQL version. For the most current and accurate information, please consult:
- [MySQL Official Documentation](https://dev.mysql.com/doc/)
- [MySQL Performance Tuning Guide](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MySQL Performance Schema](https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html)

---

*This post is part of the MySQL Deployment Guide Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/mysql-deployment-guide) to explore all posts.*

