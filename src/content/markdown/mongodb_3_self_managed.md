# Blog 3: Self-Managed MongoDB - VM and Bare Metal Production Guide

*Build production-grade self-managed MongoDB deployments with focus on cost efficiency and performance*

---

## Introduction

Self-managed MongoDB provides maximum control, customization, and cost optimization at scale. While it requires more operational expertise, the benefits of full control over configuration, performance tuning, and infrastructure can be significant for organizations with dedicated database teams.

This comprehensive guide covers everything from initial setup to advanced optimization, with a focus on helping technical managers understand the requirements, costs, and benefits of self-managed deployments. You'll learn how to evaluate whether self-managed MongoDB is right for your organization and what it takes to succeed.

## TL;DR

- **What:** Complete guide to self-managed MongoDB on VMs and bare metal with production optimizations
- **When to use:** When you need maximum control, cost optimization at scale, or specific performance requirements
- **Reading time:** 12-15 minutes
- **Implementation time:** 1-2 days for basic setup, 1-2 weeks for production optimization
- **Key takeaway:** Self-managed requires expertise but provides full control and significant cost savings (40-60%) at scale
- **Skip if:** You prefer managed services or lack database administration expertise

**What You'll Master:**
- Production-ready replica set and sharded cluster architecture
- Hardware sizing and capacity planning for different workloads
- High availability setup with replica sets
- Backup and disaster recovery strategies
- Performance tuning for VMs and bare metal
- Operational procedures and monitoring requirements
- Cost optimization techniques (40-60% savings vs Atlas)

---

## Architecture Overview

> 💡 **Understanding MongoDB architecture?** Check out our [MongoDB Overview & Architecture Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md#overview--architecture) for detailed component explanations and configuration options.

### Production Cluster Design Principles

**Recommended Architecture:**
- Minimum 3 nodes for replica set (1 primary + 2 secondaries)
- Optimal 6-12 nodes for large-scale deployments
- Separate nodes for different roles (primary, secondary, arbiter)
- Geographic distribution for disaster recovery

**Node Roles:**
- **Primary**: Handles all writes and critical reads
- **Secondary**: Read scaling and failover capability
- **Arbiter**: Vote-only member for replica set elections

### High Availability Options

**1. Replica Sets:**
- Built-in MongoDB feature
- Automatic failover
- Data redundancy
- Best for: Most production deployments

**2. Sharded Clusters:**
- Horizontal scaling
- Data distribution across shards
- More complex setup
- Best for: Very large datasets (>1TB)

---

## Installation and Initial Setup

> 💡 **Want detailed installation guidance?** See our [MongoDB Installation & Configuration Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md#overview--architecture) for comprehensive setup instructions and configuration tuning.

### System Requirements

**Minimum Requirements (Small Production):**
- CPU: 4 cores
- Memory: 16GB RAM
- Storage: 200GB SSD
- Network: 1Gbps

**Recommended Requirements (Medium Production):**
- CPU: 8-16 cores
- Memory: 32-64GB RAM
- Storage: 500GB-2TB NVMe SSD
- Network: 10Gbps

**Large Production Requirements:**
- CPU: 16-32 cores
- Memory: 64-128GB RAM
- Storage: 2-8TB NVMe SSD
- Network: 10Gbps+

### Installation Methods

**Package Manager (Recommended):**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y mongodb-org

# CentOS/RHEL
sudo yum install -y mongodb-org
```

**Official MongoDB Repository:**
- Ensures latest version and security updates
- Better package management
- Recommended for production deployments

---

## High Availability Setup

> 💡 **Need comprehensive HA strategies?** Explore our [MongoDB Advanced Features Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md#advanced-features) for detailed replication, sharding, and failover strategies.

### Replica Set Setup

**Architecture Components:**
- Primary node: Handles all writes
- Secondary nodes: Replicate data, handle reads
- Arbiter (optional): Vote-only member

**Key Benefits:**
- Automatic failover (30-60 seconds)
- Data redundancy
- Read scaling
- Zero-downtime maintenance

**Operational Requirements:**
- Minimum 3 nodes (or 2 nodes + 1 arbiter)
- Network connectivity between nodes
- Monitoring and alerting
- Regular failover testing

---

## Performance Tuning

### Hardware Optimization

**CPU Optimization:**
- Use high-frequency CPUs for OLTP workloads
- More cores for parallel operations
- NUMA awareness for multi-socket systems

**Memory Optimization:**
- `wiredTigerCacheSizeGB`: 50-60% of total RAM
- Monitor cache hit ratio
- Adjust based on working set size

**Storage Optimization:**
- Use NVMe SSD for best performance
- Separate WAL and data directories
- Appropriate I/O scheduler
- File system: XFS or ext4

---

## Backup and Disaster Recovery

### Backup Strategies

**1. mongodump (Logical Backups):**
- Database-level backups
- Portable across MongoDB versions
- Slower for large databases
- Good for: Schema changes, selective restore

**2. Filesystem Snapshots:**
- File-level backups
- Faster for large databases
- Requires same MongoDB version
- Good for: Full database restore

**3. Ops Manager / Cloud Manager:**
- Enterprise backup solution
- Automated backups
- Point-in-time recovery
- Best for: Production systems

---

## Cost Optimization

### Infrastructure Cost Savings

**Self-Managed vs MongoDB Atlas (3-Year TCO):**
- Infrastructure: 40-60% savings
- Operational overhead: Higher (requires DBA team)
- Total cost: Lower at scale (>5TB) with existing DBA team

**Optimization Strategies:**
- Right-size hardware based on actual usage
- Use commodity hardware for non-critical workloads
- Optimize storage (separate hot/cold data)
- Implement connection pooling to reduce resource needs

---

## Next Steps

- **Need HA Setup?** → Focus on replica set configuration
- **Want Performance Optimization?** → Read [Blog 7: Performance Optimization](https://thisiskushal31.github.io/blog/#/blog/mongodb-performance-optimization-query-tuning-indexing)
- **Considering Kubernetes?** → Read [Blog 5: Kubernetes Deep Dive](https://thisiskushal31.github.io/blog/#/blog/mongodb-kubernetes-statefulset-operator-deep-dive)

## Deep Dive Resources

For comprehensive technical details, explore our [MongoDB Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md).

---

*This is Blog 3 of the MongoDB Mastery Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/mongodb-mastery-series) to explore all posts.*

