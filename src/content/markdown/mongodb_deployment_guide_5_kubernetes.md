# Kubernetes MongoDB - StatefulSet vs Operator Deep Dive

*Master Kubernetes-native MongoDB with advanced orchestration patterns for modern infrastructure*

---

## Introduction

Kubernetes has become the de facto standard for container orchestration, and running stateful databases like MongoDB in Kubernetes requires understanding StatefulSets, persistent volumes, and MongoDB operators. This guide covers everything from basic StatefulSet deployments to advanced operator-based configurations.

For technical managers, this guide helps you understand when Kubernetes makes sense for MongoDB, what operational overhead to expect, and how to evaluate different operator options.

## TL;DR

- **What:** Complete guide to MongoDB on Kubernetes using StatefulSets and operators
- **When to use:** When you're already using Kubernetes and need cloud-native MongoDB
- **Reading time:** 12-15 minutes
- **Implementation time:** 4-8 hours for production setup
- **Key takeaway:** StatefulSets provide basic functionality, operators add advanced features like automatic failover and backup—choose based on your team's Kubernetes expertise and requirements
- **Skip if:** You're not using Kubernetes or prefer managed services for simplicity

**What You'll Master:**
- StatefulSet patterns with persistent storage
- MongoDB Operators (MongoDB Enterprise Kubernetes Operator, Percona)
- Helm chart customization
- Pod disruption budgets and rolling updates
- High availability with replica sets
- Backup and restore automation

---

## Kubernetes Deployment Strategy Overview

> 💡 **Need MongoDB architecture details?** Explore my [MongoDB Overview & Architecture Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md#overview--architecture) for component explanations and configuration options.

### The Three Paths to Kubernetes MongoDB

| Strategy | Complexity | Control | Maintenance | Best For |
|----------|------------|---------|-------------|----------|
| **StatefulSets** | Low-Medium | High | Medium | Teams wanting full control |
| **MongoDB Enterprise Operator** | Medium | Medium | Low | Production deployments needing HA |
| **Percona MongoDB Operator** | Medium | Medium | Low | Open-source MongoDB management |

**Decision Framework:**
- **StatefulSets:** Maximum control, manual HA setup
- **Operators:** Automated HA, backup, and management
- **Choose based on:** Team expertise, HA requirements, operational preferences

---

## Strategy 1: Kubernetes StatefulSets

### Why StatefulSets?

StatefulSets are the Kubernetes workload API object used to manage stateful applications. They provide:
- Stable network identities
- Ordered deployment and scaling
- Stable persistent storage
- Ordered, graceful deployment and scaling

### Basic StatefulSet Configuration

**mongodb-statefulset.yaml:**
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
spec:
  serviceName: mongodb
  replicas: 3
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:7.0
        env:
        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: username
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: password
        ports:
        - containerPort: 27017
          name: mongodb
        volumeMounts:
        - name: mongodb-data
          mountPath: /data/db
  volumeClaimTemplates:
  - metadata:
      name: mongodb-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 100Gi
```

---

## Strategy 2: MongoDB Enterprise Kubernetes Operator

### Why MongoDB Enterprise Operator?

The MongoDB Enterprise Kubernetes Operator provides enterprise-grade MongoDB on Kubernetes with:
- Automatic replica set management
- Backup and restore automation
- Monitoring and metrics
- Security and compliance features

### Installation

```bash
# Install operator
kubectl apply -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes-operator/master/config/crd/bases/mongodbcommunity.mongodb.com_mongodbcommunity.yaml

# Verify installation
kubectl get pods -n mongodb-operator
```

### Production Cluster Configuration

**mongodb-cluster.yaml:**
```yaml
apiVersion: mongodbcommunity.mongodb.com/v1
kind: MongoDBCommunity
metadata:
  name: mongodb-cluster
spec:
  members: 3
  type: ReplicaSet
  version: "7.0.5"
  security:
    authentication:
      modes: ["SCRAM"]
  users:
  - name: admin
    db: admin
    passwordSecretRef:
      name: mongodb-admin-password
    roles:
    - name: clusterAdmin
      db: admin
  additionalMongodConfig:
    storage.wiredTiger.engineConfig.cacheSizeGB: 2
```

---

## High Availability with Replica Sets

### Operator-Based HA

**MongoDB Enterprise Operator:**
- Uses replica sets for HA
- Automatic failover in 30-60 seconds
- Supports sharding for horizontal scaling

### StatefulSet HA

**Manual Setup Required:**
- Configure replica set
- Set up automatic failover
- Configure load balancer
- Manual failover process

---

## When to Choose Kubernetes for MongoDB

**Best For:**
- Already using Kubernetes for other services
- Need cloud-native deployment patterns
- Want infrastructure as code
- Have Kubernetes expertise

**Considerations:**
- Medium-High operational overhead
- Requires Kubernetes and MongoDB expertise
- Operators reduce some operational burden

---

## Next Steps

- **Need Performance Tuning?** → Read [Blog 7: Performance Optimization](https://thisiskushal31.github.io/blog/#/blog/mongodb-performance-optimization-query-tuning-indexing)
- **Want Local Development?** → Read [Blog 6: Local Development](https://thisiskushal31.github.io/blog/#/blog/mongodb-local-development-docker-native-quick-start)
- **Still Deciding?** → Read [Blog 8: Decision Matrix](https://thisiskushal31.github.io/blog/#/blog/mongodb-deployment-decision-matrix-complete-comparison-guide)

## Deep Dive Resources

For comprehensive technical details, explore my [MongoDB Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/mongodb/README.md).

---

**Fact-Checking & Verification:** This blog post contains Kubernetes configurations, operator information, and best practices based on publicly available documentation and industry research. Kubernetes manifests and operator capabilities may vary by version and provider. For the most current and accurate information, please consult:
- [MongoDB Official Documentation](https://www.mongodb.com/docs/manual/)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [MongoDB Kubernetes Operator](https://www.mongodb.com/docs/kubernetes-operator/)

---

*This post is part of the MongoDB Deployment Guide Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/mongodb-deployment-guide) to explore all posts.*

