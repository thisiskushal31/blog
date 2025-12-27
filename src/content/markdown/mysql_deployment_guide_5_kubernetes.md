# Kubernetes MySQL - StatefulSet vs Operator Deep Dive

*Master Kubernetes-native MySQL with advanced orchestration patterns*

---

## Introduction

Kubernetes has become the de facto standard for container orchestration, and running stateful databases like MySQL in Kubernetes requires understanding StatefulSets, persistent volumes, and MySQL operators. This guide covers everything from basic StatefulSet deployments to advanced operator-based configurations.

## TL;DR

- **What:** Complete guide to MySQL on Kubernetes using StatefulSets and operators
- **When to use:** When you're already using Kubernetes and need cloud-native MySQL
- **Reading time:** 12-15 minutes
- **Implementation time:** 4-8 hours for production setup
- **Key takeaway:** StatefulSets provide basic functionality, operators add advanced features like automatic failover and backup
- **Skip if:** You're not using Kubernetes or prefer managed services

**What You'll Master:**
- StatefulSet patterns with persistent storage
- MySQL Operator (Vitess, Percona) configurations
- Helm chart customization
- Pod disruption budgets and rolling updates
- High availability with MySQL Group Replication

---

## StatefulSet Basics

> 💡 **Need MySQL architecture details?** Explore our [MySQL Architecture Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md#overview--architecture) for component explanations and configuration options.

### Why StatefulSets?

According to the [Kubernetes StatefulSet documentation](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), "StatefulSets are the workload API object used to manage stateful applications. They manage the deployment and scaling of a set of Pods, and provide guarantees about the ordering and uniqueness of these Pods."

**Key Features:**
- Stable network identities
- Ordered deployment and scaling
- Stable persistent storage
- Ordered, graceful deployment and scaling

### Basic StatefulSet Configuration

**mysql-statefulset.yaml:**
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: root-password
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-data
          mountPath: /var/lib/mysql
        - name: mysql-config
          mountPath: /etc/mysql/conf.d
  volumeClaimTemplates:
  - metadata:
      name: mysql-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 100Gi
```

---

## Persistent Volumes

### Storage Classes

According to the [Kubernetes Storage Classes documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/), "A StorageClass provides a way for administrators to describe the 'classes' of storage they offer."

**StorageClass Configuration:**
```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  fsType: ext4
  encrypted: "true"
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
```

### Volume Claim Template

**In StatefulSet:**
```yaml
volumeClaimTemplates:
- metadata:
    name: mysql-data
  spec:
    accessModes: [ "ReadWriteOnce" ]
    storageClassName: fast-ssd
    resources:
      requests:
        storage: 100Gi
```

---

## MySQL Operator (Percona)

### Percona MySQL Operator

According to the [Percona MySQL Operator documentation](https://www.percona.com/doc/kubernetes-operator-for-mysql/kubernetes.html), "The Percona Operator for MySQL automates the creation, alteration, or deletion of members in your MySQL cluster."

**Install Operator:**
```bash
kubectl apply -f https://raw.githubusercontent.com/percona/percona-server-mysql-operator/main/deploy/bundle.yaml
```

**MySQL Cluster Configuration:**
```yaml
apiVersion: psmysql.percona.com/v1
kind: PerconaServerMySQL
metadata:
  name: mysql-cluster
spec:
  secretsName: mysql-secrets
  crVersion: 1.14.0
  updateStrategy: SmartUpdate
  allowUnsafeConfigurations: false
  pxc:
    size: 3
    image: percona/percona-server-mysql:8.0.35-29
    resources:
      requests:
        memory: 2G
        cpu: 1000m
      limits:
        memory: 4G
        cpu: 2000m
    volumeSpec:
      persistentVolumeClaim:
        resources:
          requests:
            storage: 100Gi
        storageClassName: fast-ssd
    podDisruptionBudget:
      maxUnavailable: 1
```

---

## MySQL Operator (Vitess)

### Vitess Operator

According to the [Vitess documentation](https://vitess.io/docs/), "Vitess is a database clustering system for horizontal scaling of MySQL."

**VitessCluster Configuration:**
```yaml
apiVersion: planetscale.com/v2
kind: VitessCluster
metadata:
  name: example
spec:
  images:
    vtgate: vitess/lite:latest
    vttablet: vitess/lite:latest
    vtctld: vitess/lite:latest
    mysqld:
      mysql80Compatible: vitess/lite:latest
  cells:
  - name: zone1
    gateway:
      replicas: 2
    vtctld:
      replicas: 1
  keyspaces:
  - name: commerce
    partitionings:
    - equal:
        parts: 1
        shards: 1
      serveAs: primary
    databaseName: vt_commerce
```

---

## High Availability with Group Replication

### MySQL Group Replication in Kubernetes

**StatefulSet with Group Replication:**
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql-gr
spec:
  serviceName: mysql-gr
  replicas: 3
  selector:
    matchLabels:
      app: mysql-gr
  template:
    metadata:
      labels:
        app: mysql-gr
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: root-password
        - name: MYSQL_GROUP_REPLICATION_GROUP_SEEDS
          value: "mysql-gr-0.mysql-gr:33061,mysql-gr-1.mysql-gr:33061,mysql-gr-2.mysql-gr:33061"
        - name: MYSQL_GROUP_REPLICATION_LOCAL_ADDRESS
          value: "$(POD_NAME).mysql-gr:33061"
        command:
        - bash
        - -c
        - |
          if [[ "$(hostname)" == "mysql-gr-0" ]]; then
            # Bootstrap first node
            mysqld --server-id=1 --gtid-mode=ON --enforce-gtid-consistency=ON \
              --log-bin=binlog --log-slave-updates=ON --binlog-format=ROW \
              --master-info-repository=TABLE --relay-log-info-repository=TABLE \
              --plugin-load=group_replication.so --group-replication-start-on-boot=ON \
              --group-replication-group-name=aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa \
              --group-replication-local-address=$(hostname).mysql-gr:33061 \
              --group-replication-group-seeds=mysql-gr-0.mysql-gr:33061,mysql-gr-1.mysql-gr:33061,mysql-gr-2.mysql-gr:33061 \
              --group-replication-bootstrap-group=ON
          else
            # Join other nodes
            mysqld --server-id=$((RANDOM % 1000 + 2)) --gtid-mode=ON --enforce-gtid-consistency=ON \
              --log-bin=binlog --log-slave-updates=ON --binlog-format=ROW \
              --master-info-repository=TABLE --relay-log-info-repository=TABLE \
              --plugin-load=group_replication.so --group-replication-start-on-boot=ON \
              --group-replication-group-name=aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa \
              --group-replication-local-address=$(hostname).mysql-gr:33061 \
              --group-replication-group-seeds=mysql-gr-0.mysql-gr:33061,mysql-gr-1.mysql-gr:33061,mysql-gr-2.mysql-gr:33061
          fi
        volumeMounts:
        - name: mysql-data
          mountPath: /var/lib/mysql
  volumeClaimTemplates:
  - metadata:
      name: mysql-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 100Gi
```

---

## Helm Charts

### Official MySQL Helm Chart

According to the [Bitnami MySQL Helm Chart documentation](https://github.com/bitnami/charts/tree/main/bitnami/mysql), "This Helm chart installs a MySQL database on a Kubernetes cluster."

**Install Chart:**
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mysql bitnami/mysql \
    --set auth.rootPassword=securepassword \
    --set auth.database=myapp \
    --set primary.persistence.size=100Gi \
    --set architecture=replication \
    --set secondary.replicaCount=2
```

**Custom Values:**
```yaml
# values.yaml
auth:
  rootPassword: "securepassword"
  database: "myapp"
  username: "appuser"
  password: "apppassword"

primary:
  persistence:
    enabled: true
    size: 100Gi
    storageClass: fast-ssd
  resources:
    requests:
      memory: "2Gi"
      cpu: "1000m"
    limits:
      memory: "4Gi"
      cpu: "2000m"

architecture: replication
secondary:
  replicaCount: 2
  persistence:
    enabled: true
    size: 100Gi
```

---

## Pod Disruption Budgets

According to the [Kubernetes Pod Disruption Budget documentation](https://kubernetes.io/docs/tasks/run-application/configure-pdb/), "A PodDisruptionBudget allows an application owner to create an object that specifies the minimum number or percentage of replicas that must be available at any time."

**PDB Configuration:**
```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: mysql-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: mysql
```

---

## Service Configuration

### Headless Service

**For StatefulSet:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  clusterIP: None
  selector:
    app: mysql
  ports:
  - port: 3306
    name: mysql
```

### LoadBalancer Service

**For External Access:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql-external
spec:
  type: LoadBalancer
  selector:
    app: mysql
  ports:
  - port: 3306
    targetPort: 3306
    protocol: TCP
```

---

## Monitoring and Observability

### Prometheus Monitoring

**ServiceMonitor:**
```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: mysql-monitor
spec:
  selector:
    matchLabels:
      app: mysql
  endpoints:
  - port: mysql
    interval: 30s
    path: /metrics
```

---

## Best Practices

1. **Use StatefulSets:** For stateful applications like MySQL
2. **Persistent Storage:** Always use PersistentVolumeClaims
3. **Resource Limits:** Set appropriate CPU and memory limits
4. **Health Checks:** Implement liveness and readiness probes
5. **Pod Disruption Budgets:** Protect against voluntary disruptions
6. **Operators:** Use operators for advanced features
7. **Backup Strategy:** Implement automated backups
8. **Monitoring:** Set up comprehensive monitoring

---

## Conclusion

Kubernetes provides powerful orchestration for MySQL, but requires understanding StatefulSets, persistent storage, and operators. Following these patterns ensures production-ready MySQL deployments in Kubernetes.

**Key Takeaways:**
- StatefulSets provide stable identities and storage
- Operators add advanced features like automatic failover
- Persistent volumes are essential for data persistence
- Pod disruption budgets protect availability
- Monitoring is critical for production deployments

## Next Steps

- **Want Performance Tips?** → Read [Blog 7: MySQL Performance Optimization](https://thisiskushal31.github.io/blog/#/blog/mysql-performance-optimization-query-tuning-indexing)
- **Planning Migration?** → Read [Blog 8: MySQL Deployment Decision Matrix](https://thisiskushal31.github.io/blog/#/blog/mysql-deployment-decision-matrix-complete-comparison-guide)

## Deep Dive Resources

For comprehensive technical details, explore our [MySQL Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/relational/mysql/README.md).

**Official Documentation:**
- [Kubernetes StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [Percona MySQL Operator](https://www.percona.com/doc/kubernetes-operator-for-mysql/kubernetes.html)
- [Vitess Documentation](https://vitess.io/docs/)

---

**Fact-Checking & Verification:** This blog post contains Kubernetes configurations, operator information, and best practices based on publicly available documentation and industry research. Kubernetes manifests and operator capabilities may vary by version and provider. For the most current and accurate information, please consult:
- [MySQL Official Documentation](https://dev.mysql.com/doc/)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [MySQL Operator Documentation](https://github.com/mysql/mysql-operator)

---

*This post is part of the MySQL Deployment Guide Series. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/mysql-deployment-guide) to explore all posts.*

