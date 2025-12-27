# MongoDB Performance Optimization - Query Tuning & Indexing

*Master MongoDB performance optimization to reduce costs and improve application responsiveness*

---

## Introduction

MongoDB performance optimization is both an art and a science. Understanding query execution, indexing strategies, and configuration tuning can transform a slow database into a high-performance system, reducing infrastructure costs and improving user experience.

This guide covers everything from basic query optimization to advanced indexing techniques, with a focus on helping technical managers understand the business impact of performance optimization and how to prioritize optimization efforts.

## TL;DR

- **What:** Complete guide to MongoDB performance optimization
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

> 💡 **Want comprehensive query optimization techniques?** Explore our [MongoDB Operations Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md#operations) for advanced query patterns, aggregation pipelines, and data manipulation techniques.

### explain() and explain("executionStats")

**explain() Statement:**
```javascript
db.users.find({ email: "user@example.com" }).explain()
```

**explain("executionStats") (Actual Execution):**
```javascript
db.users.find({ email: "user@example.com" }).explain("executionStats")
```

**Key Output Fields:**
- `executionStats.executionTimeMillis`: Actual execution time
- `executionStats.totalDocsExamined`: Documents examined
- `executionStats.executionStages.stage`: Query stage (IXSCAN = good, COLLSCAN = bad)
- `winningPlan.stage`: Query planner's chosen plan

### Understanding Query Plans

**Good Execution Plan:**
```
executionStages:
  stage: "IXSCAN"
  indexName: "email_1"
  executionTimeMillis: 1
  docsExamined: 1
```

**Bad Execution Plan:**
```
executionStages:
  stage: "COLLSCAN"
  executionTimeMillis: 500
  docsExamined: 1000000
```

### Common Query Issues

**1. Missing Indexes:**
```javascript
// Slow: Collection scan
db.orders.find({ customerId: 123 })

// Fast: With index
db.orders.createIndex({ customerId: 1 })
db.orders.find({ customerId: 123 })
```

**2. Inefficient Queries:**
```javascript
// Slow: Multiple queries
for (let user of users) {
  let orders = db.orders.find({ userId: user._id })
}

// Fast: Single aggregation
db.orders.aggregate([
  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } }
])
```

---

## Indexing Strategies

> 💡 **Need detailed indexing guidance?** See our [MongoDB Data Management Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md#data-management) for comprehensive indexing strategies, compound indexes, and index optimization techniques.

### Index Types

**1. Single Field Index:**
```javascript
db.users.createIndex({ email: 1 })
```

**2. Compound Index:**
```javascript
db.orders.createIndex({ userId: 1, createdAt: -1 })
```

**3. Text Index:**
```javascript
db.products.createIndex({ name: "text", description: "text" })
```

**4. Geospatial Index:**
```javascript
db.locations.createIndex({ location: "2dsphere" })
```

### Index Best Practices

**1. Index Frequently Queried Fields:**
- Index fields in query filters, sorts, and joins
- Monitor index usage with `db.collection.getIndexes()`

**2. Compound Index Order Matters:**
```javascript
// Good: Most selective first
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 })
```

**3. Partial Indexes:**
```javascript
// Index only active users
db.users.createIndex({ email: 1 }, { partialFilterExpression: { status: "active" } })
```

---

## Configuration Tuning

### Memory Settings

**wiredTigerCacheSizeGB:**
- 50-60% of total RAM
- Too high can cause OS cache issues
- Too low reduces cache hit ratio

**Example Configuration:**
```yaml
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 8  # For 16GB RAM system
```

---

## Monitoring and Profiling

### Database Profiler

**Enable Profiling:**
```javascript
db.setProfilingLevel(1, { slowms: 100 })
```

**View Slow Queries:**
```javascript
db.system.profile.find().sort({ ts: -1 }).limit(10)
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
- Collection size
- Disk space
- Memory usage

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

## Next Steps

- **Want More Details?** → Explore [MongoDB Performance & Security Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md#performance--security)
- **Need Deployment Help?** → Read [Blog 8: Decision Matrix](https://thisiskushal31.github.io/blog/#/blog/mongodb-deployment-decision-matrix-complete-comparison-guide)
- **Considering Optimization?** → Review your query patterns and indexing strategy

## Deep Dive Resources

For comprehensive technical details, explore our [MongoDB Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md).

---

**Fact-Checking & Verification:** This blog post contains performance tuning recommendations, configuration parameters, and optimization strategies based on publicly available documentation and industry research. Performance characteristics and optimal settings may vary significantly by workload, hardware, and MongoDB version. For the most current and accurate information, please consult:
- [MongoDB Official Documentation](https://www.mongodb.com/docs/manual/)
- [MongoDB Performance Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/)
- [MongoDB Indexing Strategies](https://www.mongodb.com/docs/manual/applications/indexes/)

---

*This post is part of the MongoDB Deployment Guide Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/mongodb-deployment-guide) to explore all posts.*

