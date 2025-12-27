# Blog 7: PostgreSQL Performance Optimization - Query Tuning & Indexing

*Master PostgreSQL performance optimization to reduce costs and improve application responsiveness*

---

## Introduction

PostgreSQL performance optimization is both an art and a science. Understanding query execution, indexing strategies, and configuration tuning can transform a slow database into a high-performance system, reducing infrastructure costs and improving user experience.

This guide covers everything from basic query optimization to advanced indexing techniques, with a focus on helping technical managers understand the business impact of performance optimization and how to prioritize optimization efforts.

## TL;DR

- **What:** Complete guide to PostgreSQL performance optimization
- **When to use:** When you need to improve database performance or reduce infrastructure costs
- **Reading time:** 12-15 minutes
- **Implementation time:** Ongoing optimization process
- **Key takeaway:** Proper indexing and query optimization can improve performance by 10-100x and reduce infrastructure costs by 30-50%
- **Skip if:** Your database performance is already optimal

**What You'll Master:**
- Query optimization and execution plan analysis
- Indexing strategies and best practices
- Configuration tuning for different workloads
- Connection pooling and resource management
- Monitoring and profiling tools
- Cost optimization through performance improvements

---

## Query Optimization

> 💡 **Want comprehensive query optimization techniques?** Explore our [PostgreSQL SQL Fundamentals Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/postgresql/README.md#sql-fundamentals) for advanced query patterns, subqueries, and window functions.

### EXPLAIN and EXPLAIN ANALYZE

**EXPLAIN Statement:**
```sql
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';
```

**EXPLAIN ANALYZE (Actual Execution):**
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```

**Key Output Columns:**
- `Seq Scan`: Full table scan (usually bad)
- `Index Scan`: Using index (usually good)
- `rows`: Estimated rows examined
- `actual time`: Actual execution time
- `cost`: Query planner cost estimate

### Understanding Query Plans

**Good Execution Plan:**
```
Index Scan using idx_email on users
  Index Cond: (email = 'user@example.com')
  Rows: 1
  Execution Time: 0.1 ms
```

**Bad Execution Plan:**
```
Seq Scan on users
  Filter: (email = 'user@example.com')
  Rows: 1000000
  Execution Time: 500.0 ms
```

### Common Query Issues

**1. Missing Indexes:**
```sql
-- Slow: Full table scan
SELECT * FROM orders WHERE customer_id = 123;

-- Fast: With index
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
SELECT * FROM orders WHERE customer_id = 123;
```

**2. Functions on Indexed Columns:**
```sql
-- Slow: Can't use index
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';

-- Fast: Index-friendly
SELECT * FROM users WHERE email = 'USER@EXAMPLE.COM';
-- Or create expression index
CREATE INDEX idx_users_email_lower ON users(LOWER(email));
```

**3. Unnecessary Data Retrieval:**
```sql
-- Slow: Retrieves all columns
SELECT * FROM users WHERE id = 123;

-- Fast: Only needed columns
SELECT id, name, email FROM users WHERE id = 123;
```

---

## Indexing Strategies

> 💡 **Need detailed indexing guidance?** See our [PostgreSQL Data Management Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/postgresql/README.md#data-management) for comprehensive indexing strategies, composite indexes, and index optimization techniques.

### Index Types

**1. B-tree Index (Default):**
- Most common index type
- Good for equality and range queries
- Automatically used for PRIMARY KEY and UNIQUE constraints

**2. Hash Index:**
- Only for equality comparisons
- Faster than B-tree for equality
- Not used for sorting or range queries

**3. GiST (Generalized Search Tree):**
- For geometric data, full-text search
- Extensible index type

**4. GIN (Generalized Inverted Index):**
- For arrays, full-text search, JSONB
- Efficient for containment queries

**5. BRIN (Block Range Index):**
- For very large tables
- Low maintenance overhead
- Good for naturally sorted data

### Index Best Practices

**1. Index Frequently Queried Columns:**
```sql
-- Index columns in WHERE, JOIN, ORDER BY
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

**2. Composite Index Order Matters:**
```sql
-- Good: Most selective first
CREATE INDEX idx_orders_user_status_date 
ON orders(user_id, status, created_at);

-- Query can use index for:
-- - user_id
-- - user_id, status
-- - user_id, status, created_at
```

**3. Partial Indexes:**
```sql
-- Index only active users
CREATE INDEX idx_users_active_email 
ON users(email) WHERE status = 'active';
```

**4. Expression Indexes:**
```sql
-- Index on expression
CREATE INDEX idx_users_email_lower 
ON users(LOWER(email));
```

### Index Maintenance

**Monitor Index Usage:**
```sql
-- Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan;
```

**Remove Unused Indexes:**
- Unused indexes slow down writes
- Monitor and remove indexes not being used
- Consider partial indexes for better selectivity

---

## Configuration Tuning

### Memory Settings

**shared_buffers:**
- 25% of total RAM (up to 8GB for most systems)
- Too high can cause OS cache issues
- Too low reduces cache hit ratio

**effective_cache_size:**
- 50-75% of total RAM
- Helps query planner make better decisions
- Doesn't actually allocate memory

**work_mem:**
- Based on `max_connections` and available RAM
- Formula: `(RAM - shared_buffers) / (max_connections * 2)`
- Too high can cause memory issues
- Too low causes disk sorts

### WAL Settings

**wal_level:**
- `replica`: For replication (default)
- `logical`: For logical replication
- Higher levels increase WAL size

**max_wal_size:**
- Maximum WAL size before checkpoint
- Larger values reduce checkpoint frequency
- Balance between recovery time and performance

---

## Connection Pooling

### Why Connection Pooling?

**Benefits:**
- Reduces connection overhead
- Better resource utilization
- Improves performance for high-concurrency applications
- Reduces memory usage

### PgBouncer

**Configuration:**
```ini
[databases]
mydb = host=postgres-server dbname=mydb

[pgbouncer]
listen_addr = *
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25
```

**Pool Modes:**
- `session`: One server connection per client
- `transaction`: One server connection per transaction
- `statement`: One server connection per statement (most aggressive)

---

## Monitoring and Profiling

### pg_stat_statements

**Enable Extension:**
```sql
CREATE EXTENSION pg_stat_statements;
```

**View Top Queries:**
```sql
SELECT 
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    (100 * total_exec_time / SUM(total_exec_time) OVER ()) AS percentage
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
```

### Key Metrics to Monitor

**Performance Metrics:**
- Query execution time
- Cache hit ratio
- Index usage
- Connection count
- Replication lag

**Capacity Metrics:**
- Database size
- Table bloat
- Disk space
- Connection pool utilization

---

## Cost Optimization Through Performance

### Performance Impact on Costs

**Example:**
- Slow queries require larger instances
- Optimization can reduce instance size by 30-50%
- Better indexing reduces I/O costs
- Connection pooling reduces memory needs

**ROI Calculation:**
- Optimization effort: 40 hours @ $150/hr = $6,000
- Infrastructure savings: $500/month = $6,000/year
- Payback period: 1 year
- 3-year savings: $12,000 (after payback)

---

## Common Performance Pitfalls

### 1. N+1 Query Problem

**Bad:**
```python
# Multiple queries
for user in users:
    orders = db.query("SELECT * FROM orders WHERE user_id = ?", user.id)
```

**Good:**
```python
# Single query with JOIN
db.query("""
    SELECT u.*, o.* 
    FROM users u 
    LEFT JOIN orders o ON u.id = o.user_id
""")
```

### 2. Missing Indexes

**Impact:**
- Full table scans
- Slow queries
- High I/O costs
- Poor user experience

**Solution:**
- Analyze query patterns
- Add indexes for frequently queried columns
- Monitor index usage

### 3. Over-Indexing

**Impact:**
- Slower writes
- Increased storage
- Maintenance overhead

**Solution:**
- Monitor index usage
- Remove unused indexes
- Use partial indexes

---

## Next Steps

- **Want More Details?** → Explore [PostgreSQL Performance & Operations Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/postgresql/README.md#performance--operations)
- **Need Deployment Help?** → Read [Blog 8: Decision Matrix](https://thisiskushal31.github.io/blog/#/blog/postgresql-deployment-decision-matrix-complete-comparison-guide)
- **Considering Optimization?** → Review your query patterns and indexing strategy

## Deep Dive Resources

For comprehensive technical details, explore our [PostgreSQL Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/postgresql/README.md) and [Relational Databases Overview](https://thisiskushal31.github.io/dochub/#/databases/relational/README.md).

---

*This is Blog 7 of the PostgreSQL Mastery Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/postgresql-mastery-series) to explore all posts.*

