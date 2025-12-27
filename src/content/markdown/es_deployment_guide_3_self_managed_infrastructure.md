# Self-Managed Elasticsearch: VM and Bare Metal Production Guide

*Building production-grade self-managed clusters with advanced optimization techniques*

---

## The Case for Maximum Control

Self-managed Elasticsearch deployments represent the pinnacle of infrastructure control, offering unmatched performance optimization, cost efficiency at scale, and complete customization freedom. This comprehensive guide takes you from basic cluster setup to advanced production optimization techniques that can deliver 40-60% cost savings and superior performance compared to managed solutions.

## TL;DR

- **What:** Complete guide to self-managed Elasticsearch on VMs and bare metal with production optimizations
- **When to use:** When you need maximum control, have dedicated ops team, or want to minimize costs at scale
- **Reading time:** 3 minutes
- **Implementation time:** 1-2 days for basic setup, 1-2 weeks for production optimization
- **Key takeaway:** 40-60% cost savings vs managed services, but requires significant operational expertise and 24/7 monitoring
- **Skip if:** You're a small team, need quick deployment, or prefer managed services for reliability

**Why Choose Self-Managed:**
- Complete hardware and software stack control
- Maximum performance through custom optimization
- Significant cost savings at scale (typically 40-60% vs managed)
- Full security and compliance customization
- No vendor lock-in or feature limitations

**What You'll Master:**
- Production-ready multi-node cluster architecture
- Advanced performance tuning for VMs and bare metal
- Automated deployment and configuration management
- Hardware sizing and capacity planning
- Operational procedures and monitoring

---

## Architecture Foundation

> 💡 **Understanding Elasticsearch architecture?** Check out our [Elasticsearch Overview & Getting Started Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/elasticsearch/README.md#overview--getting-started) for detailed component explanations and cluster setup.

### Production Cluster Design Principles

```yaml
# Recommended production architecture
production_architecture:
  cluster_size: "minimum 3 nodes, optimal 6-12 nodes"
  node_roles:
    master_eligible: 3  # Odd number for quorum
    data_hot: 3-6      # Based on ingestion volume
    data_warm: 2-4     # For older data
    data_cold: 1-2     # For archived data
    coordinating: 2    # For query distribution
    ingest: 2          # For data processing
  
  availability_zones: 3  # For fault tolerance
  network_tiers:
    - "Management network (SSH, monitoring)"
    - "Elasticsearch cluster communication" 
    - "Client access network"
```

### Hardware Specifications by Node Type

```yaml
# Optimized hardware specifications
hardware_specs:
  master_nodes:
    purpose: "Cluster coordination and metadata management"
    cpu: "4-8 cores, high frequency"
    memory: "8-16GB"
    storage: "100-200GB SSD (OS + logs)"
    network: "1Gbps minimum"
    
  data_hot_nodes:
    purpose: "Active indexing and recent data queries"
    cpu: "16-32 cores"
    memory: "64-128GB"
    storage: "2-8TB NVMe SSD"
    network: "10Gbps recommended"
    
  data_warm_nodes:
    purpose: "Older data with moderate query frequency"
    cpu: "8-16 cores"
    memory: "32-64GB"
    storage: "4-16TB SATA SSD"
    network: "1-10Gbps"
    
  data_cold_nodes:
    purpose: "Archived data with infrequent access"
    cpu: "4-8 cores"
    memory: "16-32GB"
    storage: "8-32TB HDD"
    network: "1Gbps"
    
  coordinating_nodes:
    purpose: "Query routing and result aggregation"
    cpu: "8-16 cores"
    memory: "16-32GB"
    storage: "100GB SSD"
    network: "10Gbps"
```

---

## Virtual Machine Deployment

> 💡 **Need detailed configuration guidance?** See our [Elasticsearch Overview & Getting Started Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/elasticsearch/README.md#overview--getting-started) for comprehensive setup instructions and cluster configuration.

### VM Infrastructure Setup

```bash
#!/bin/bash
# VM provisioning script for production Elasticsearch cluster

# Configuration variables
CLUSTER_NAME="production-es"
ES_VERSION="9.1.5"
NODES=("es-master-01" "es-master-02" "es-master-03" "es-data-01" "es-data-02" "es-data-03")
VM_SIZES=("Standard_D4s_v3" "Standard_D4s_v3" "Standard_D4s_v3" "Standard_D16s_v3" "Standard_D16s_v3" "Standard_D16s_v3")

# Create resource group and network
az group create --name ${CLUSTER_NAME}-rg --location eastus

az network vnet create \
  --resource-group ${CLUSTER_NAME}-rg \
  --name ${CLUSTER_NAME}-vnet \
  --address-prefix 10.0.0.0/16 \
  --subnet-name es-subnet \
  --subnet-prefix 10.0.1.0/24

# Create availability set
az vm availability-set create \
  --resource-group ${CLUSTER_NAME}-rg \
  --name ${CLUSTER_NAME}-avset \
  --platform-fault-domain-count 3 \
  --platform-update-domain-count 5

# Provision VMs
for i in "${!NODES[@]}"; do
  NODE_NAME=${NODES[$i]}
  VM_SIZE=${VM_SIZES[$i]}
  
  az vm create \
    --resource-group ${CLUSTER_NAME}-rg \
    --name $NODE_NAME \
    --availability-set ${CLUSTER_NAME}-avset \
    --image Ubuntu2204 \
    --size $VM_SIZE \
    --admin-username esadmin \
    --ssh-key-values ~/.ssh/id_rsa.pub \
    --vnet-name ${CLUSTER_NAME}-vnet \
    --subnet es-subnet \
    --private-ip-address 10.0.1.$((10 + $i)) \
    --storage-sku Premium_LRS \
    --os-disk-size-gb 100 \
    --data-disk-sizes-gb 1024
done

# Configure load balancer for client access
az network lb create \
  --resource-group ${CLUSTER_NAME}-rg \
  --name ${CLUSTER_NAME}-lb \
  --sku Standard \
  --vnet-name ${CLUSTER_NAME}-vnet \
  --subnet es-subnet \
  --backend-pool-name es-backend-pool \
  --frontend-ip-name es-frontend-ip
```

### VM Operating System Optimization

```bash
#!/bin/bash
# VM optimization script for Elasticsearch

# System limits configuration
cat >> /etc/security/limits.conf << EOF
elasticsearch soft memlock unlimited
elasticsearch hard memlock unlimited
elasticsearch soft nofile 65536
elasticsearch hard nofile 65536
elasticsearch soft nproc 4096
elasticsearch hard nproc 4096
EOF

# Kernel parameters for Elasticsearch
cat >> /etc/sysctl.conf << EOF
# Elasticsearch optimizations
vm.max_map_count=262144
vm.swappiness=1
fs.file-max=65536
net.core.somaxconn=1024
net.core.netdev_max_backlog=5000
net.core.rmem_default=262144
net.core.rmem_max=16777216
net.core.wmem_default=262144
net.core.wmem_max=16777216
net.ipv4.tcp_keepalive_time=120
net.ipv4.tcp_keepalive_intvl=30
net.ipv4.tcp_keepalive_probes=8
net.ipv4.tcp_rmem=4096 87380 16777216
net.ipv4.tcp_wmem=4096 65536 16777216
EOF

sysctl -p

# Disable swap
swapoff -a
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Configure disk scheduler for SSDs
echo 'ACTION=="add|change", KERNEL=="nvme[0-9]*", ATTR{queue/scheduler}="none"' > /etc/udev/rules.d/60-elasticsearch-ssd.rules
echo 'ACTION=="add|change", KERNEL=="sd[a-z]", ATTR{queue/rotational}=="0", ATTR{queue/scheduler}="none"' >> /etc/udev/rules.d/60-elasticsearch-ssd.rules

# Install required packages
apt-get update
apt-get install -y openjdk-17-jdk curl wget gnupg2

# Set JAVA_HOME
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> /etc/environment
source /etc/environment
```

### Elasticsearch Installation and Configuration

```bash
#!/bin/bash
# Elasticsearch installation script

# Add Elastic repository
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
echo "deb https://artifacts.elastic.co/packages/9.x/apt stable main" > /etc/apt/sources.list.d/elastic-9.x.list

# Install Elasticsearch
apt-get update
apt-get install -y elasticsearch=9.1.5

# Create data and logs directories
mkdir -p /var/lib/elasticsearch/data
mkdir -p /var/log/elasticsearch
chown -R elasticsearch:elasticsearch /var/lib/elasticsearch
chown -R elasticsearch:elasticsearch /var/log/elasticsearch

# Configure Elasticsearch
cat > /etc/elasticsearch/elasticsearch.yml << 'EOF'
# Cluster configuration
cluster.name: production-cluster
node.name: ${HOSTNAME}

# Network configuration
network.host: 0.0.0.0
http.port: 9200
transport.port: 9300

# Discovery settings
discovery.seed_hosts: 
  - "10.0.1.10:9300"
  - "10.0.1.11:9300"
  - "10.0.1.12:9300"
cluster.initial_cluster_manager_nodes:
  - "es-master-01"
  - "es-master-02"
  - "es-master-03"

# Path configuration
path.data: /var/lib/elasticsearch/data
path.logs: /var/log/elasticsearch

# Memory configuration
bootstrap.memory_lock: true

# Performance settings
indices.memory.index_buffer_size: 20%
indices.memory.min_index_buffer_size: 96mb
indices.queries.cache.size: 20%
indices.fielddata.cache.size: 30%

# Cluster settings
cluster.routing.allocation.disk.watermark.low: 85%
cluster.routing.allocation.disk.watermark.high: 90%
cluster.routing.allocation.disk.watermark.flood_stage: 95%
cluster.routing.allocation.awareness.attributes: rack_id
cluster.max_shards_per_node: 2000

# Thread pool configuration
thread_pool.write.queue_size: 1000
thread_pool.search.queue_size: 10000

# Security configuration
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.http.ssl.enabled: true

# Monitoring
xpack.monitoring.enabled: true
xpack.monitoring.collection.enabled: true
EOF

# Configure JVM options
cat > /etc/elasticsearch/jvm.options.d/heap.options << EOF
# Set heap size (50% of available RAM, max 32GB)
-Xms32g
-Xmx32g

# G1GC configuration for large heaps
-XX:+UseG1GC
-XX:G1HeapRegionSize=32m
-XX:+UnlockExperimentalVMOptions
-XX:+UseTransparentHugePages
-XX:+AlwaysPreTouch
-XX:+DisableExplicitGC

# GC logging
-Xlog:gc*,gc+age=trace,safepoint:gc.log:time,level,tags
-XX:+UseGCLogFileRotation
-XX:NumberOfGCLogFiles=32
-XX:GCLogFileSize=128m
EOF

# Set node-specific configuration based on hostname
case ${HOSTNAME} in
  es-master-*)
    echo "node.roles: [cluster_manager]" >> /etc/elasticsearch/elasticsearch.yml
    echo "node.attr.rack_id: master" >> /etc/elasticsearch/elasticsearch.yml
    ;;
  es-data-*)
    echo "node.roles: [data_hot, data_content, ingest]" >> /etc/elasticsearch/elasticsearch.yml
    echo "node.attr.rack_id: data_hot" >> /etc/elasticsearch/elasticsearch.yml
    ;;
  es-warm-*)
    echo "node.roles: [data_warm]" >> /etc/elasticsearch/elasticsearch.yml
    echo "node.attr.rack_id: data_warm" >> /etc/elasticsearch/elasticsearch.yml
    ;;
esac

# Enable and start Elasticsearch
systemctl daemon-reload
systemctl enable elasticsearch
systemctl start elasticsearch
```

---

## Bare Metal Deployment

### Hardware Procurement and Setup

```yaml
# Bare metal server specifications for high-performance deployment
bare_metal_specs:
  master_nodes:
    cpu: "Intel Xeon Gold 6248R (24 cores, 3.0GHz)"
    memory: "128GB DDR4-3200 ECC"
    storage: 
      os: "2x 480GB NVMe SSD (RAID 1)"
      data: "Not applicable for master-only nodes"
    network: "Dual 25GbE with bonding"
    
  data_hot_nodes:
    cpu: "AMD EPYC 7543 (32 cores, 2.8GHz)"
    memory: "256GB DDR4-3200 ECC"
    storage:
      os: "2x 960GB NVMe SSD (RAID 1)"
      data: "8x 3.84TB NVMe SSD (RAID 0 or JBOD)"
    network: "Dual 25GbE with bonding"
    
  data_warm_nodes:
    cpu: "Intel Xeon Silver 4316 (20 cores, 2.3GHz)"
    memory: "128GB DDR4-2933 ECC"
    storage:
      os: "2x 480GB SATA SSD (RAID 1)"
      data: "12x 7.68TB SATA SSD"
    network: "Dual 10GbE with bonding"
```

### NUMA Optimization for Bare Metal

```bash
#!/bin/bash
# NUMA optimization script for bare metal Elasticsearch

# Check NUMA topology
numactl --hardware
lscpu | grep NUMA

# Configure NUMA settings
cat > /etc/systemd/system/elasticsearch.service.d/numa.conf << EOF
[Service]
ExecStart=
ExecStart=/usr/share/elasticsearch/bin/systemd-entrypoint -p \${PID_DIR}/elasticsearch.pid --quiet
Environment=ES_JAVA_OPTS=-server
Environment=NUMA_POLICY=interleave
ExecStartPre=/bin/bash -c 'echo never > /sys/kernel/mm/transparent_hugepage/enabled'
ExecStartPre=/bin/bash -c 'echo never > /sys/kernel/mm/transparent_hugepage/defrag'
LimitMEMLOCK=infinity
EOF

# CPU affinity and NUMA binding
cat > /usr/local/bin/elasticsearch-numa-start.sh << 'EOF'
#!/bin/bash

# Get NUMA topology
NUMA_NODES=$(numactl --hardware | grep "available:" | awk '{print $2}')
CPU_CORES=$(nproc)
CORES_PER_NUMA=$((CPU_CORES / NUMA_NODES))

# Bind Elasticsearch to specific NUMA nodes for optimal performance
if [ "$NUMA_NODES" -gt 1 ]; then
    # Use first NUMA node for master nodes
    if [[ $(hostname) == *"master"* ]]; then
        NUMA_BIND="numactl --cpunodebind=0 --membind=0"
    # Distribute data nodes across NUMA nodes
    elif [[ $(hostname) == *"data-01"* ]] || [[ $(hostname) == *"data-02"* ]]; then
        NUMA_BIND="numactl --cpunodebind=0 --membind=0"
    else
        NUMA_BIND="numactl --cpunodebind=1 --membind=1"
    fi
else
    NUMA_BIND=""
fi

# Start Elasticsearch with NUMA optimization
$NUMA_BIND /usr/share/elasticsearch/bin/elasticsearch
EOF

chmod +x /usr/local/bin/elasticsearch-numa-start.sh

# Update systemd service to use NUMA script
sed -i 's|ExecStart=.*|ExecStart=/usr/local/bin/elasticsearch-numa-start.sh|' /etc/systemd/system/elasticsearch.service

systemctl daemon-reload
```

### Storage Optimization for Bare Metal

```bash
#!/bin/bash
# Advanced storage optimization for bare metal Elasticsearch

# NVMe optimization
for device in /dev/nvme*n1; do
    # Set optimal queue depth
    echo 32 > /sys/block/$(basename $device)/queue/nr_requests
    
    # Disable scheduler for NVMe (already optimal)
    echo none > /sys/block/$(basename $device)/queue/scheduler
    
    # Optimize read-ahead
    echo 256 > /sys/block/$(basename $device)/queue/read_ahead_kb
    
    # Enable NCQ
    echo 1 > /sys/block/$(basename $device)/queue/nomerges
done

# Create optimized filesystems
create_elasticsearch_filesystem() {
    local device=$1
    local mount_point=$2
    
    # Create XFS filesystem with optimizations for Elasticsearch
    mkfs.xfs -f -L elasticsearch-data \
        -d agcount=32,su=64k,sw=1 \
        -l version=2,su=64k \
        -n version=ci \
        $device
    
    # Create mount point
    mkdir -p $mount_point
    
    # Add to fstab with optimal mount options
    echo "$device $mount_point xfs defaults,noatime,nodiratime,nobarrier,logbufs=8,logbsize=256k,largeio,inode64,swalloc 0 2" >> /etc/fstab
    
    # Mount filesystem
    mount $mount_point
    
    # Set ownership
    chown elasticsearch:elasticsearch $mount_point
}

# Create data filesystems
for i in {1..8}; do
    create_elasticsearch_filesystem /dev/nvme${i}n1 /data/elasticsearch-${i}
done

# Configure Elasticsearch to use multiple data paths
cat >> /etc/elasticsearch/elasticsearch.yml << EOF
path.data:
  - /data/elasticsearch-1
  - /data/elasticsearch-2
  - /data/elasticsearch-3
  - /data/elasticsearch-4
  - /data/elasticsearch-5
  - /data/elasticsearch-6
  - /data/elasticsearch-7
  - /data/elasticsearch-8
EOF
```

---

## Advanced Performance Tuning

### JVM Optimization

```bash
# Advanced JVM tuning for high-performance deployments
cat > /etc/elasticsearch/jvm.options.d/production.options << EOF
# Heap sizing (machine has 256GB RAM, using 128GB for ES)
-Xms128g
-Xmx128g

# G1GC optimization for large heaps
-XX:+UseG1GC
-XX:G1HeapRegionSize=32m
-XX:MaxGCPauseMillis=50
-XX:G1NewSizePercent=20
-XX:G1MaxNewSizePercent=30
-XX:G1HeapWastePercent=5
-XX:G1MixedGCCountTarget=8
-XX:InitiatingHeapOccupancyPercent=25
-XX:G1MixedGCLiveThresholdPercent=85
-XX:G1OldCSetRegionThresholdPercent=10

# Memory optimization
-XX:+UnlockExperimentalVMOptions
-XX:+UseTransparentHugePages
-XX:+AlwaysPreTouch
-XX:+DisableExplicitGC
-XX:+OptimizeStringConcat

# Performance optimizations
-XX:+UseStringDeduplication
-XX:+UnlockDiagnosticVMOptions
-XX:+DebugNonSafepoints

# GC logging for monitoring
-Xlog:gc*,gc+age=trace,safepoint:gc.log:time,level,tags:filecount=32,filesize=128m

# JIT compilation optimization
-XX:+TieredCompilation
-XX:+UseCodeCacheFlushing
-XX:ReservedCodeCacheSize=512m
-XX:InitialCodeCacheSize=64m

# Networking optimization
-Djava.net.preferIPv4Stack=true
-Dfile.encoding=UTF-8
EOF
```

### Elasticsearch Cluster Optimization

```yaml
# Advanced cluster settings for high-performance deployments
PUT /_cluster/settings
{
  "persistent": {
    # Search performance
    "search.max_buckets": 100000,
    "indices.queries.cache.size": "25%",
    "indices.fielddata.cache.size": "40%",
    "indices.breaker.fielddata.limit": "60%",
    "indices.breaker.request.limit": "60%",
    "indices.breaker.total.limit": "95%",
    
    # Indexing performance
    "indices.memory.index_buffer_size": "25%",
    "indices.memory.min_index_buffer_size": "128mb",
    "indices.store.throttle.type": "none",
    
    # Cluster stability and performance
    "cluster.routing.allocation.cluster_concurrent_rebalance": 8,
    "cluster.routing.allocation.node_concurrent_recoveries": 8,
    "cluster.routing.allocation.node_initial_primaries_recoveries": 16,
    "cluster.routing.allocation.disk.include_relocations": false,
    "cluster.routing.rebalance.enable": "all",
    "cluster.routing.allocation.allow_rebalance": "indices_all_active",
    
    # Thread pool optimization
    "thread_pool.write.queue_size": 2000,
    "thread_pool.search.queue_size": 10000,
    "thread_pool.get.queue_size": 1000,
    "thread_pool.analyze.queue_size": 1000,
    
    # Network optimization
    "transport.tcp.compress": true,
    "http.compression": true,
    "http.compression_level": 6,
    
    # Monitoring and diagnostics
    "cluster.info.update.interval": "30s",
    "cluster.service.slow_task_logging_threshold": "10s"
  }
}
```

### Index Template Optimization

```bash
# High-performance index template for time-series data
PUT /_index_template/high_performance_logs
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "number_of_shards": 6,
      "number_of_replicas": 1,
      "refresh_interval": "10s",
      "index": {
        "codec": "best_compression",
        "mapping": {
          "total_fields": {
            "limit": "2000"
          },
          "depth": {
            "limit": "20"
          },
          "nested_fields": {
            "limit": "100"
          }
        },
        "max_result_window": 50000,
        "max_rescore_window": 10000,
        "blocks": {
          "read_only_allow_delete": false
        },
        "query": {
          "default_field": [
            "message",
            "error.message",
            "log.message"
          ]
        },
        "sort": {
          "field": ["@timestamp"],
          "order": ["desc"]
        },
        "lifecycle": {
          "name": "high_performance_policy",
          "rollover_alias": "logs"
        },
        "routing": {
          "allocation": {
            "require": {
              "box_type": "hot"
            }
          }
        },
        "merge": {
          "policy": {
            "max_merge_at_once": 10,
            "segments_per_tier": 10,
            "max_merged_segment": "5gb"
          }
        },
        "translog": {
          "durability": "async",
          "flush_threshold_size": "1gb",
          "sync_interval": "30s"
        }
      }
    },
    "mappings": {
      "dynamic_templates": [
        {
          "strings_as_keywords": {
            "match_mapping_type": "string",
            "match": "*_id",
            "mapping": {
              "type": "keyword",
              "ignore_above": 256,
              "doc_values": true
            }
          }
        },
        {
          "strings_as_text": {
            "match_mapping_type": "string",
            "mapping": {
              "type": "text",
              "analyzer": "standard",
              "fields": {
                "keyword": {
                  "type": "keyword",
                  "ignore_above": 256,
                  "doc_values": true
                }
              }
            }
          }
        },
        {
          "longs_as_integers": {
            "match_mapping_type": "long",
            "mapping": {
              "type": "integer"
            }
          }
        }
      ],
      "properties": {
        "@timestamp": {
          "type": "date",
          "format": "strict_date_optional_time||epoch_millis"
        },
        "level": {
          "type": "keyword"
        },
        "service": {
          "properties": {
            "name": {
              "type": "keyword"
            },
            "version": {
              "type": "keyword"
            },
            "environment": {
              "type": "keyword"
            }
          }
        },
        "host": {
          "properties": {
            "name": {
              "type": "keyword"
            },
            "ip": {
              "type": "ip"
            }
          }
        },
        "metrics": {
          "properties": {
            "cpu_usage": {
              "type": "scaled_float",
              "scaling_factor": 100
            },
            "memory_usage": {
              "type": "scaled_float", 
              "scaling_factor": 100
            },
            "response_time": {
              "type": "float"
            }
          }
        }
      }
    }
  },
  "priority": 100
}
```

---

## Automation and Configuration Management

### Ansible Playbook for Cluster Deployment

```yaml
# ansible/elasticsearch-cluster.yml
---
- name: Deploy Elasticsearch Cluster
  hosts: elasticsearch_nodes
  become: yes
  vars:
    elasticsearch_version: "9.1.5"
    cluster_name: "production-cluster"
    data_dir: "/var/lib/elasticsearch"
    log_dir: "/var/log/elasticsearch"
    
  tasks:
    - name: Install system prerequisites
      package:
        name:
          - openjdk-17-jdk
          - curl
          - wget
          - gnupg2
        state: present
        
    - name: Configure system limits
      blockinfile:
        path: /etc/security/limits.conf
        block: |
          elasticsearch soft memlock unlimited
          elasticsearch hard memlock unlimited
          elasticsearch soft nofile 65536
          elasticsearch hard nofile 65536
          elasticsearch soft nproc 4096
          elasticsearch hard nproc 4096
          
    - name: Configure kernel parameters
      sysctl:
        name: "{{ item.key }}"
        value: "{{ item.value }}"
        state: present
        reload: yes
      loop:
        - { key: 'vm.max_map_count', value: '262144' }
        - { key: 'vm.swappiness', value: '1' }
        - { key: 'fs.file-max', value: '65536' }
        - { key: 'net.core.somaxconn', value: '1024' }
        
    - name: Disable swap
      shell: |
        swapoff -a
        sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
        
    - name: Add Elasticsearch repository
      shell: |
        wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
        echo "deb https://artifacts.elastic.co/packages/9.x/apt stable main" > /etc/apt/sources.list.d/elastic-9.x.list
        
    - name: Install Elasticsearch
      package:
        name: "elasticsearch={{ elasticsearch_version }}"
        state: present
        update_cache: yes
        
    - name: Create data and log directories
      file:
        path: "{{ item }}"
        state: directory
        owner: elasticsearch
        group: elasticsearch
        mode: '0755'
      loop:
        - "{{ data_dir }}/data"
        - "{{ log_dir }}"
        
    - name: Generate Elasticsearch configuration
      template:
        src: elasticsearch.yml.j2
        dest: /etc/elasticsearch/elasticsearch.yml
        owner: root
        group: elasticsearch
        mode: '0660'
      notify: restart elasticsearch
      
    - name: Configure JVM options
      template:
        src: jvm.options.j2
        dest: /etc/elasticsearch/jvm.options.d/production.options
        owner: root
        group: elasticsearch
        mode: '0660'
      notify: restart elasticsearch
      
    - name: Start and enable Elasticsearch
      systemd:
        name: elasticsearch
        state: started
        enabled: yes
        daemon_reload: yes
        
  handlers:
    - name: restart elasticsearch
      systemd:
        name: elasticsearch
        state: restarted
```

### Terraform Infrastructure as Code

```hcl
# terraform/elasticsearch-cluster.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

variable "cluster_name" {
  description = "Elasticsearch cluster name"
  type        = string
  default     = "production-es"
}

variable "instance_types" {
  description = "Instance types for different node roles"
  type = object({
    master = string
    data   = string
    warm   = string
  })
  default = {
    master = "m6i.xlarge"
    data   = "r6i.4xlarge"
    warm   = "m6i.2xlarge"
  }
}

# VPC and networking
resource "aws_vpc" "elasticsearch_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "${var.cluster_name}-vpc"
  }
}

resource "aws_subnet" "elasticsearch_subnet" {
  count             = 3
  vpc_id            = aws_vpc.elasticsearch_vpc.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = {
    Name = "${var.cluster_name}-subnet-${count.index + 1}"
  }
}

# Security group
resource "aws_security_group" "elasticsearch_sg" {
  name_prefix = "${var.cluster_name}-sg"
  vpc_id      = aws_vpc.elasticsearch_vpc.id

  ingress {
    from_port   = 9200
    to_port     = 9200
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  ingress {
    from_port   = 9300
    to_port     = 9300
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.cluster_name}-sg"
  }
}

# Launch template for master nodes
resource "aws_launch_template" "elasticsearch_master" {
  name_prefix   = "${var.cluster_name}-master"
  image_id      = data.aws_ami.ubuntu.id
  instance_type = var.instance_types.master
  key_name      = aws_key_pair.elasticsearch_key.key_name

  vpc_security_group_ids = [aws_security_group.elasticsearch_sg.id]

  block_device_mappings {
    device_name = "/dev/sda1"
    ebs {
      volume_size = 100
      volume_type = "gp3"
      encrypted   = true
    }
  }

  user_data = base64encode(templatefile("${path.module}/user_data_master.sh", {
    cluster_name = var.cluster_name
  }))

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "${var.cluster_name}-master"
      Role = "master"
    }
  }
}

# Launch template for data nodes
resource "aws_launch_template" "elasticsearch_data" {
  name_prefix   = "${var.cluster_name}-data"
  image_id      = data.aws_ami.ubuntu.id
  instance_type = var.instance_types.data
  key_name      = aws_key_pair.elasticsearch_key.key_name

  vpc_security_group_ids = [aws_security_group.elasticsearch_sg.id]

  block_device_mappings {
    device_name = "/dev/sda1"
    ebs {
      volume_size = 100
      volume_type = "gp3"
      encrypted   = true
    }
  }

  block_device_mappings {
    device_name = "/dev/xvdf"
    ebs {
      volume_size = 1000
      volume_type = "gp3"
      iops        = 3000
      throughput  = 250
      encrypted   = true
    }
  }

  user_data = base64encode(templatefile("${path.module}/user_data_data.sh", {
    cluster_name = var.cluster_name
  }))

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "${var.cluster_name}-data"
      Role = "data"
    }
  }
}

# Auto Scaling Groups
resource "aws_autoscaling_group" "elasticsearch_master" {
  name                = "${var.cluster_name}-master-asg"
  vpc_zone_identifier = aws_subnet.elasticsearch_subnet[*].id
  target_group_arns   = []
  health_check_type   = "EC2"
  health_check_grace_period = 300

  min_size         = 3
  max_size         = 3
  desired_capacity = 3

  launch_template {
    id      = aws_launch_template.elasticsearch_master.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "${var.cluster_name}-master"
    propagate_at_launch = true
  }
}

resource "aws_autoscaling_group" "elasticsearch_data" {
  name                = "${var.cluster_name}-data-asg"
  vpc_zone_identifier = aws_subnet.elasticsearch_subnet[*].id
  target_group_arns   = []
  health_check_type   = "EC2"
  health_check_grace_period = 300

  min_size         = 3
  max_size         = 6
  desired_capacity = 3

  launch_template {
    id      = aws_launch_template.elasticsearch_data.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "${var.cluster_name}-data"
    propagate_at_launch = true
  }
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

# Output values
output "vpc_id" {
  value = aws_vpc.elasticsearch_vpc.id
}

output "subnet_ids" {
  value = aws_subnet.elasticsearch_subnet[*].id
}
```

---

## Capacity Planning and Sizing

### Resource Calculation Framework

```python
#!/usr/bin/env python3
# elasticsearch_sizing_calculator.py

import math
import json

class ElasticsearchSizingCalculator:
    def __init__(self):
        self.overhead_factors = {
            'indexing_overhead': 1.15,  # 15% overhead for indexing
            'replica_factor': 2.0,      # Primary + 1 replica
            'os_reserved': 0.85,        # Reserve 15% for OS
            'growth_buffer': 1.3        # 30% growth buffer
        }
    
    def calculate_storage_requirements(self, daily_data_gb, retention_days, 
                                     compression_ratio=0.3, shard_overhead=0.1):
        """Calculate storage requirements with all overhead factors"""
        
        # Base storage calculation
        raw_storage = daily_data_gb * retention_days
        
        # Apply compression
        compressed_storage = raw_storage * compression_ratio
        
        # Add shard overhead (segments, translog, etc.)
        storage_with_overhead = compressed_storage * (1 + shard_overhead)
        
        # Apply replica factor
        storage_with_replicas = storage_with_overhead * self.overhead_factors['replica_factor']
        
        # Add growth buffer
        total_storage = storage_with_replicas * self.overhead_factors['growth_buffer']
        
        return {
            'raw_storage_gb': raw_storage,
            'compressed_storage_gb': compressed_storage,
            'storage_with_overhead_gb': storage_with_overhead,
            'storage_with_replicas_gb': storage_with_replicas,
            'total_storage_required_gb': total_storage
        }
    
    def calculate_memory_requirements(self, total_storage_gb, heap_to_storage_ratio=0.02):
        """Calculate JVM heap and total memory requirements"""
        
        # JVM heap sizing (typically 2-5% of total data)
        heap_gb = total_storage_gb * heap_to_storage_ratio
        
        # Cap heap at 32GB for compressed OOPs
        if heap_gb > 32:
            heap_gb = 32
        
        # Total memory (heap + OS cache + overhead)
        total_memory_gb = heap_gb * 2.5  # Leave 60% for OS cache
        
        return {
            'heap_size_gb': heap_gb,
            'total_memory_gb': total_memory_gb,
            'os_cache_gb': total_memory_gb - heap_gb
        }
    
    def calculate_node_count(self, total_storage_gb, total_memory_gb, 
                           max_storage_per_node=6000, max_memory_per_node=256):
        """Calculate required number of nodes"""
        
        nodes_by_storage = math.ceil(total_storage_gb / max_storage_per_node)
        nodes_by_memory = math.ceil(total_memory_gb / max_memory_per_node)
        
        # Take the higher requirement
        required_nodes = max(nodes_by_storage, nodes_by_memory)
        
        # Ensure minimum 3 nodes for HA
        required_nodes = max(required_nodes, 3)
        
        return {
            'nodes_by_storage': nodes_by_storage,
            'nodes_by_memory': nodes_by_memory,
            'recommended_nodes': required_nodes,
            'storage_per_node_gb': total_storage_gb / required_nodes,
            'memory_per_node_gb': total_memory_gb / required_nodes
        }
    
    def calculate_shard_configuration(self, total_storage_gb, target_shard_size_gb=30):
        """Calculate optimal shard configuration"""
        
        primary_shards = math.ceil(total_storage_gb / target_shard_size_gb)
        
        # Ensure reasonable shard count (not too many small shards)
        if primary_shards > 100:
            primary_shards = 100
            actual_shard_size = total_storage_gb / primary_shards
        else:
            actual_shard_size = target_shard_size_gb
        
        return {
            'primary_shards': primary_shards,
            'actual_shard_size_gb': actual_shard_size,
            'total_shards_with_replicas': primary_shards * 2
        }
    
    def generate_sizing_report(self, daily_data_gb, retention_days, 
                             query_rate_per_second=100, indexing_rate_per_second=1000):
        """Generate comprehensive sizing report"""
        
        # Storage calculations
        storage = self.calculate_storage_requirements(daily_data_gb, retention_days)
        
        # Memory calculations
        memory = self.calculate_memory_requirements(storage['total_storage_required_gb'])
        
        # Node count calculations
        nodes = self.calculate_node_count(
            storage['total_storage_required_gb'], 
            memory['total_memory_gb']
        )
        
        # Shard configuration
        shards = self.calculate_shard_configuration(storage['total_storage_required_gb'])
        
        # Performance estimates
        performance = {
            'estimated_query_capacity_per_node': 50,  # queries/second
            'estimated_indexing_capacity_per_node': 5000,  # docs/second
            'total_query_capacity': nodes['recommended_nodes'] * 50,
            'total_indexing_capacity': nodes['recommended_nodes'] * 5000,
            'meets_query_requirements': nodes['recommended_nodes'] * 50 >= query_rate_per_second,
            'meets_indexing_requirements': nodes['recommended_nodes'] * 5000 >= indexing_rate_per_second
        }
        
        return {
            'input_parameters': {
                'daily_data_gb': daily_data_gb,
                'retention_days': retention_days,
                'query_rate_per_second': query_rate_per_second,
                'indexing_rate_per_second': indexing_rate_per_second
            },
            'storage_requirements': storage,
            'memory_requirements': memory,
            'node_requirements': nodes,
            'shard_configuration': shards,
            'performance_estimates': performance
        }

# Example usage
if __name__ == "__main__":
    calculator = ElasticsearchSizingCalculator()
    
    # Example: 100GB daily data, 30 days retention
    report = calculator.generate_sizing_report(
        daily_data_gb=100,
        retention_days=30,
        query_rate_per_second=500,
        indexing_rate_per_second=10000
    )
    
    print(json.dumps(report, indent=2))
```

### Hardware Sizing Matrix

```yaml
# Hardware sizing matrix for different workload patterns
sizing_matrix:
  small_deployment:
    data_volume: "< 1TB"
    daily_ingestion: "< 10GB"
    query_rate: "< 100 QPS"
    recommended_config:
      nodes: 3
      node_spec:
        cpu: "8 cores"
        memory: "32GB"
        storage: "500GB SSD"
      estimated_cost: "$2,400/month"
      
  medium_deployment:
    data_volume: "1-10TB"
    daily_ingestion: "10-100GB"
    query_rate: "100-1000 QPS"
    recommended_config:
      nodes: 6
      node_spec:
        cpu: "16 cores"
        memory: "64GB"
        storage: "2TB SSD"
      estimated_cost: "$8,000/month"
      
  large_deployment:
    data_volume: "10-100TB"
    daily_ingestion: "100GB-1TB"
    query_rate: "1000-10000 QPS"
    recommended_config:
      nodes: 12
      node_spec:
        cpu: "32 cores"
        memory: "128GB"
        storage: "8TB SSD"
      estimated_cost: "$25,000/month"
      
  enterprise_deployment:
    data_volume: "> 100TB"
    daily_ingestion: "> 1TB"
    query_rate: "> 10000 QPS"
    recommended_config:
      nodes: "20+"
      node_spec:
        cpu: "64 cores"
        memory: "256GB"
        storage: "16TB NVMe"
      estimated_cost: "$75,000+/month"
```

---

## Monitoring and Observability

### Comprehensive Monitoring Stack

```yaml
# docker-compose.yml for monitoring stack
version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus:/etc/prometheus
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=30d'
      - '--web.enable-lifecycle'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources
    networks:
      - monitoring

  elasticsearch_exporter:
    image: quay.io/prometheuscommunity/elasticsearch-exporter:latest
    container_name: elasticsearch_exporter
    ports:
      - "9114:9114"
    command:
      - '--es.uri=http://elasticsearch:9200'
      - '--es.all'
      - '--es.indices'
      - '--es.shards'
      - '--es.cluster_settings'
    networks:
      - monitoring

volumes:
  prometheus_data:
  grafana_data:

networks:
  monitoring:
    driver: bridge
```

### Prometheus Configuration

```yaml
# monitoring/prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "elasticsearch_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  # Elasticsearch cluster metrics
  - job_name: 'elasticsearch-cluster'
    static_configs:
      - targets:
        - 'es-master-01:9200'
        - 'es-master-02:9200'
        - 'es-master-03:9200'
        - 'es-data-01:9200'
        - 'es-data-02:9200'
        - 'es-data-03:9200'
    metrics_path: '/_prometheus/metrics'
    scrape_interval: 30s

  # Node exporter for system metrics
  - job_name: 'node-exporter'
    static_configs:
      - targets:
        - 'es-master-01:9100'
        - 'es-master-02:9100'
        - 'es-master-03:9100'
        - 'es-data-01:9100'
        - 'es-data-02:9100'
        - 'es-data-03:9100'
    scrape_interval: 15s

  # Elasticsearch exporter
  - job_name: 'elasticsearch-exporter'
    static_configs:
      - targets:
        - 'elasticsearch_exporter:9114'
    scrape_interval: 30s
```

### Elasticsearch Alerting Rules

```yaml
# monitoring/prometheus/elasticsearch_rules.yml
groups:
  - name: elasticsearch.rules
    rules:
      # Cluster health alerts
      - alert: ElasticsearchClusterRed
        expr: elasticsearch_cluster_health_status{color="red"} == 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: "Elasticsearch cluster status is RED"
          description: "Cluster {{ $labels.cluster }} health is RED. Some primary shards are unallocated."

      - alert: ElasticsearchClusterYellow
        expr: elasticsearch_cluster_health_status{color="yellow"} == 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Elasticsearch cluster status is YELLOW"
          description: "Cluster {{ $labels.cluster }} health is YELLOW. Some replica shards are unallocated."

      # Performance alerts
      - alert: ElasticsearchHighQueryLatency
        expr: elasticsearch_indices_search_query_time_seconds > 1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High Elasticsearch query latency"
          description: "Query latency is {{ $value }}s on {{ $labels.instance }}"

      - alert: ElasticsearchHighIndexingLatency
        expr: elasticsearch_indices_indexing_index_time_seconds > 0.5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High Elasticsearch indexing latency"
          description: "Indexing latency is {{ $value }}s on {{ $labels.instance }}"

      # Resource alerts
      - alert: ElasticsearchHighHeapUsage
        expr: elasticsearch_jvm_memory_used_bytes{area="heap"} / elasticsearch_jvm_memory_max_bytes{area="heap"} > 0.85
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High Elasticsearch heap usage"
          description: "Heap usage is {{ $value | humanizePercentage }} on {{ $labels.instance }}"

      - alert: ElasticsearchDiskSpaceLow
        expr: (elasticsearch_filesystem_data_size_bytes - elasticsearch_filesystem_data_free_bytes) / elasticsearch_filesystem_data_size_bytes > 0.85
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Elasticsearch disk space low"
          description: "Disk usage is {{ $value | humanizePercentage }} on {{ $labels.instance }}"

      # Node alerts
      - alert: ElasticsearchNodeDown
        expr: up{job="elasticsearch-cluster"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Elasticsearch node is down"
          description: "Elasticsearch node {{ $labels.instance }} is down"

      - alert: ElasticsearchTooManyUnassignedShards
        expr: elasticsearch_cluster_health_unassigned_shards > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Too many unassigned shards"
          description: "There are {{ $value }} unassigned shards in cluster {{ $labels.cluster }}"
```

### Custom Monitoring Script

```bash
#!/bin/bash
# elasticsearch_health_monitor.sh

CLUSTER_ENDPOINT="http://localhost:9200"
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
LOG_FILE="/var/log/elasticsearch_monitor.log"

# Function to send Slack notification
send_slack_notification() {
    local message=$1
    local color=$2
    
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"attachments\":[{\"color\":\"$color\",\"text\":\"$message\"}]}" \
        "$SLACK_WEBHOOK"
}

# Function to log with timestamp
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Check cluster health
check_cluster_health() {
    local health_response=$(curl -s "$CLUSTER_ENDPOINT/_cluster/health")
    local status=$(echo "$health_response" | jq -r '.status')
    local active_shards=$(echo "$health_response" | jq -r '.active_shards')
    local relocating_shards=$(echo "$health_response" | jq -r '.relocating_shards')
    local unassigned_shards=$(echo "$health_response" | jq -r '.unassigned_shards')
    
    case $status in
        "green")
            log_message "Cluster health: GREEN - $active_shards active shards"
            ;;
        "yellow")
            log_message "Cluster health: YELLOW - $unassigned_shards unassigned shards"
            send_slack_notification "⚠️ Elasticsearch cluster is YELLOW: $unassigned_shards unassigned shards" "warning"
            ;;
        "red")
            log_message "Cluster health: RED - Critical issue detected"
            send_slack_notification "🚨 Elasticsearch cluster is RED: Critical issue detected" "danger"
            ;;
    esac
}

# Check node performance
check_node_performance() {
    local nodes_stats=$(curl -s "$CLUSTER_ENDPOINT/_nodes/stats")
    
    # Check heap usage
    echo "$nodes_stats" | jq -r '.nodes | to_entries[] | 
        select(.value.jvm.mem.heap_used_percent > 85) | 
        "Node " + .value.name + " heap usage: " + (.value.jvm.mem.heap_used_percent | tostring) + "%"' | 
    while read -r line; do
        if [ -n "$line" ]; then
            log_message "High heap usage: $line"
            send_slack_notification "⚠️ $line" "warning"
        fi
    done
    
    # Check disk usage
    echo "$nodes_stats" | jq -r '.nodes | to_entries[] |
        .value.fs.total | 
        select(.available_in_bytes / .total_in_bytes < 0.15) |
        "Node " + .key + " disk usage critical: " + 
        (((.total_in_bytes - .available_in_bytes) / .total_in_bytes * 100) | floor | tostring) + "% used"' |
    while read -r line; do
        if [ -n "$line" ]; then
            log_message "Critical disk usage: $line"
            send_slack_notification "🚨 $line" "danger"
        fi
    done
}

# Check for failed queries
check_query_failures() {
    local indices_stats=$(curl -s "$CLUSTER_ENDPOINT/_stats")
    local query_failures=$(echo "$indices_stats" | jq -r '._all.total.search.query_failures')
    
    if [ "$query_failures" -gt 0 ]; then
        log_message "Query failures detected: $query_failures"
        send_slack_notification "⚠️ Elasticsearch query failures: $query_failures total failures" "warning"
    fi
}

# Main monitoring loop
main() {
    log_message "Starting Elasticsearch health check"
    
    check_cluster_health
    check_node_performance
    check_query_failures
    
    log_message "Health check completed"
}

# Run the monitoring
main
```

---

## Security Implementation

### Advanced Security Configuration

```bash
# Advanced security setup script
#!/bin/bash

# Generate certificates for TLS
./bin/elasticsearch-certutil ca --silent --pem
unzip elastic-stack-ca.zip
./bin/elasticsearch-certutil cert --silent --pem --ca-cert ca/ca.crt --ca-key ca/ca.key --dns localhost --dns es-master-01 --dns es-master-02 --dns es-master-03

# Configure TLS for HTTP and transport
cat >> /etc/elasticsearch/elasticsearch.yml << EOF
# TLS Configuration
xpack.security.enabled: true
xpack.security.enrollment.enabled: true

# Transport layer security
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.client_authentication: required
xpack.security.transport.ssl.keystore.path: certs/elastic-certificates.p12
xpack.security.transport.ssl.truststore.path: certs/elastic-certificates.p12

# HTTP layer security
xpack.security.http.ssl.enabled: true
xpack.security.http.ssl.keystore.path: certs/elastic-certificates.p12

# Audit logging
xpack.security.audit.enabled: true
xpack.security.audit.logfile.events.emit_request_body: true
xpack.security.audit.logfile.events.include:
  - access_denied
  - access_granted
  - anonymous_access_denied
  - authentication_failed
  - authentication_success
  - change_password
  - connection_denied
  - connection_granted
  - tampered_request
  - run_as_denied
  - run_as_granted

# IP filtering
xpack.security.http.filter.allow: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]
xpack.security.http.filter.deny: "_all"
EOF

# Set up role-based access control
cat > /tmp/setup_security.sh << 'EOF'
#!/bin/bash

# Wait for Elasticsearch to start
until curl -s http://localhost:9200 >/dev/null; do
    echo "Waiting for Elasticsearch..."
    sleep 5
done

# Set passwords for built-in users
/usr/share/elasticsearch/bin/elasticsearch-setup-passwords auto --batch

# Create custom roles
curl -X POST "localhost:9200/_security/role/logs_reader" \
     -H "Content-Type: application/json" \
     -u elastic:$ELASTIC_PASSWORD \
     -d '{
       "cluster": ["monitor"],
       "indices": [
         {
           "names": ["logs-*"],
           "privileges": ["read", "view_index_metadata"],
           "field_security": {
             "grant": ["*"],
             "except": ["sensitive_data"]
           },
           "query": {
             "term": {
               "department": "{{ctx.security.user.metadata.department}}"
             }
           }
         }
       ]
     }'

# Create custom role for application monitoring
curl -X POST "localhost:9200/_security/role/app_monitor" \
     -H "Content-Type: application/json" \
     -u elastic:$ELASTIC_PASSWORD \
     -d '{
       "cluster": ["monitor", "manage_ilm"],
       "indices": [
         {
           "names": ["app-*", "metrics-*"],
           "privileges": ["read", "write", "create_index", "manage"]
         }
       ]
     }'

# Create service accounts
curl -X POST "localhost:9200/_security/user/log_shipper" \
     -H "Content-Type: application/json" \
     -u elastic:$ELASTIC_PASSWORD \
     -d '{
       "password": "SecureLogShipperPassword123!",
       "roles": ["app_monitor"],
       "full_name": "Log Shipping Service",
       "metadata": {
         "department": "infrastructure"
       }
     }'

curl -X POST "localhost:9200/_security/user/readonly_analyst" \
     -H "Content-Type: application/json" \
     -u elastic:$ELASTIC_PASSWORD \
     -d '{
       "password": "AnalystReadOnlyPassword123!",
       "roles": ["logs_reader"],
       "full_name": "Data Analyst",
       "metadata": {
         "department": "analytics"
       }
     }'

echo "Security setup completed successfully"
EOF

chmod +x /tmp/setup_security.sh
/tmp/setup_security.sh
```

### Network Security Configuration

```bash
# iptables rules for Elasticsearch security
#!/bin/bash

# Flush existing rules
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X

# Set default policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback traffic
iptables -A INPUT -i lo -j ACCEPT

# Allow established connections
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT

# Allow SSH from management network
iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT

# Allow Elasticsearch HTTP from application servers
iptables -A INPUT -p tcp --dport 9200 -s 10.0.10.0/24 -j ACCEPT

# Allow Elasticsearch transport between cluster nodes
iptables -A INPUT -p tcp --dport 9300 -s 10.0.1.0/24 -j ACCEPT

# Allow monitoring from Prometheus
iptables -A INPUT -p tcp --dport 9114 -s 10.0.5.0/24 -j ACCEPT

# Allow node exporter from monitoring
iptables -A INPUT -p tcp --dport 9100 -s 10.0.5.0/24 -j ACCEPT

# Log dropped packets
iptables -A INPUT -j LOG --log-prefix "DROPPED: "

# Save rules
iptables-save > /etc/iptables/rules.v4

# Create systemd service for iptables persistence
cat > /etc/systemd/system/iptables-persistent.service << EOF
[Unit]
Description=Load iptables rules
After=network.target

[Service]
Type=oneshot
ExecStart=/sbin/iptables-restore /etc/iptables/rules.v4
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

systemctl enable iptables-persistent
```

---

## Backup and Disaster Recovery

### Automated Backup Strategy

```bash
#!/bin/bash
# elasticsearch_backup.sh

CLUSTER_ENDPOINT="http://localhost:9200"
BACKUP_REPOSITORY="production_backups"
S3_BUCKET="elasticsearch-backups-prod"
RETENTION_DAYS=30
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

# Function to send Slack notification
send_notification() {
    local message=$1
    local color=$2
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"attachments\":[{\"color\":\"$color\",\"text\":\"$message\"}]}" \
        "$SLACK_WEBHOOK"
}

# Function to check if repository exists
check_repository() {
    local repo_check=$(curl -s "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY")
    if [[ $repo_check == *"repository_missing_exception"* ]]; then
        echo "Repository does not exist, creating..."
        create_repository
    else
        echo "Repository exists, proceeding with backup"
    fi
}

# Function to create backup repository
create_repository() {
    curl -X PUT "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY" \
        -H "Content-Type: application/json" \
        -d '{
            "type": "s3",
            "settings": {
                "bucket": "'$S3_BUCKET'",
                "region": "us-west-2",
                "base_path": "elasticsearch",
                "compress": true,
                "server_side_encryption": true,
                "storage_class": "standard_ia"
            }
        }'
}

# Function to create snapshot
create_snapshot() {
    local snapshot_name="snapshot_$(date +%Y%m%d_%H%M%S)"
    local snapshot_result=$(curl -s -X PUT "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/$snapshot_name?wait_for_completion=false" \
        -H "Content-Type: application/json" \
        -d '{
            "indices": "*",
            "ignore_unavailable": true,
            "include_global_state": false,
            "metadata": {
                "taken_by": "automated_backup_script",
                "taken_because": "scheduled_backup"
            }
        }')
    
    echo "Started snapshot: $snapshot_name"
    echo "$snapshot_result"
    
    # Monitor snapshot progress
    monitor_snapshot "$snapshot_name"
}

# Function to monitor snapshot progress
monitor_snapshot() {
    local snapshot_name=$1
    echo "Monitoring snapshot progress for $snapshot_name"
    
    while true; do
        local status=$(curl -s "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/$snapshot_name" | jq -r '.snapshots[0].state')
        
        case $status in
            "SUCCESS")
                echo "Snapshot completed successfully"
                send_notification "✅ Elasticsearch backup completed: $snapshot_name" "good"
                break
                ;;
            "FAILED")
                echo "Snapshot failed"
                send_notification "❌ Elasticsearch backup failed: $snapshot_name" "danger"
                exit 1
                ;;
            "IN_PROGRESS")
                echo "Snapshot in progress..."
                sleep 30
                ;;
            *)
                echo "Unknown status: $status"
                sleep 30
                ;;
        esac
    done
}

# Function to cleanup old snapshots
cleanup_old_snapshots() {
    echo "Cleaning up snapshots older than $RETENTION_DAYS days"
    
    local snapshots=$(curl -s "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/_all" | \
        jq -r --arg retention_date "$(date -d "$RETENTION_DAYS days ago" +%s)" \
        '.snapshots[] | select(.start_time_in_millis/1000 < ($retention_date | tonumber)) | .snapshot')
    
    for snapshot in $snapshots; do
        echo "Deleting old snapshot: $snapshot"
        curl -X DELETE "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/$snapshot"
    done
}

# Function to verify backup integrity
verify_backup() {
    echo "Verifying latest backup integrity"
    
    local latest_snapshot=$(curl -s "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/_all" | \
        jq -r '.snapshots | sort_by(.start_time_in_millis) | .[-1] | .snapshot')
    
    local verification=$(curl -s "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/$latest_snapshot/_verify")
    local node_count=$(echo "$verification" | jq '.nodes | length')
    
    echo "Verification completed for $latest_snapshot on $node_count nodes"
}

# Main backup function
main() {
    echo "Starting Elasticsearch backup process at $(date)"
    
    # Check cluster health before backup
    local health=$(curl -s "$CLUSTER_ENDPOINT/_cluster/health" | jq -r '.status')
    if [[ "$health" == "red" ]]; then
        echo "Cluster is in RED state, aborting backup"
        send_notification "❌ Backup aborted: Cluster in RED state" "danger"
        exit 1
    fi
    
    check_repository
    create_snapshot
    cleanup_old_snapshots
    verify_backup
    
    echo "Backup process completed at $(date)"
}

# Execute main function
main
```

### Disaster Recovery Procedures

```bash
#!/bin/bash
# elasticsearch_disaster_recovery.sh

CLUSTER_ENDPOINT="http://localhost:9200"
BACKUP_REPOSITORY="production_backups"
RECOVERY_LOG="/var/log/elasticsearch_recovery.log"

# Function to log with timestamp
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$RECOVERY_LOG"
}

# Function to list available snapshots
list_snapshots() {
    log_message "Available snapshots:"
    curl -s "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/_all" | \
        jq -r '.snapshots[] | "\(.snapshot) - \(.start_time) - \(.state)"'
}

# Function to restore from snapshot
restore_snapshot() {
    local snapshot_name=$1
    local restore_indices=${2:-"*"}
    
    log_message "Starting restore from snapshot: $snapshot_name"
    
    # Close indices before restore if they exist
    if [[ "$restore_indices" != "*" ]]; then
        log_message "Closing indices: $restore_indices"
        curl -X POST "$CLUSTER_ENDPOINT/$restore_indices/_close"
    fi
    
    # Start restore operation
    local restore_result=$(curl -s -X POST "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/$snapshot_name/_restore" \
        -H "Content-Type: application/json" \
        -d '{
            "indices": "'$restore_indices'",
            "ignore_unavailable": true,
            "include_global_state": false,
            "rename_pattern": "(.+)",
            "rename_replacement": "restored_$1",
            "include_aliases": false
        }')
    
    log_message "Restore initiated: $restore_result"
    
    # Monitor restore progress
    monitor_restore "$snapshot_name"
}

# Function to monitor restore progress
monitor_restore() {
    local snapshot_name=$1
    
    while true; do
        local recovery_status=$(curl -s "$CLUSTER_ENDPOINT/_recovery" | \
            jq '.[] | select(.type == "SNAPSHOT") | .stage')
        
        if [[ -z "$recovery_status" ]]; then
            log_message "Restore completed"
            break
        fi
        
        log_message "Restore in progress - Stage: $recovery_status"
        sleep 30
    done
}

# Function for complete cluster recovery
full_cluster_recovery() {
    local snapshot_name=$1
    
    log_message "Starting full cluster recovery from snapshot: $snapshot_name"
    
    # Step 1: Stop all write operations
    log_message "Setting cluster to read-only mode"
    curl -X PUT "$CLUSTER_ENDPOINT/_cluster/settings" \
        -H "Content-Type: application/json" \
        -d '{
            "persistent": {
                "cluster.blocks.read_only": true
            }
        }'
    
    # Step 2: Close all indices
    log_message "Closing all indices"
    curl -X POST "$CLUSTER_ENDPOINT/_all/_close"
    
    # Step 3: Delete all indices (WARNING: DESTRUCTIVE)
    read -p "This will DELETE ALL INDICES. Type 'YES' to continue: " confirmation
    if [[ "$confirmation" == "YES" ]]; then
        log_message "Deleting all indices"
        curl -X DELETE "$CLUSTER_ENDPOINT/*"
    else
        log_message "Recovery aborted by user"
        return 1
    fi
    
    # Step 4: Restore from snapshot
    log_message "Restoring from snapshot"
    curl -X POST "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/$snapshot_name/_restore" \
        -H "Content-Type: application/json" \
        -d '{
            "indices": "*",
            "ignore_unavailable": true,
            "include_global_state": true
        }'
    
    # Step 5: Monitor recovery
    monitor_restore "$snapshot_name"
    
    # Step 6: Remove read-only block
    log_message "Removing read-only block"
    curl -X PUT "$CLUSTER_ENDPOINT/_cluster/settings" \
        -H "Content-Type: application/json" \
        -d '{
            "persistent": {
                "cluster.blocks.read_only": null
            }
        }'
    
    log_message "Full cluster recovery completed"
}

# Function to perform point-in-time recovery
point_in_time_recovery() {
    local target_timestamp=$1
    
    log_message "Finding snapshot closest to timestamp: $target_timestamp"
    
    local target_epoch=$(date -d "$target_timestamp" +%s)
    local closest_snapshot=$(curl -s "$CLUSTER_ENDPOINT/_snapshot/$BACKUP_REPOSITORY/_all" | \
        jq -r --arg target "$target_epoch" \
        '.snapshots | map(select(.start_time_in_millis/1000 <= ($target | tonumber))) | 
         sort_by(.start_time_in_millis) | .[-1] | .snapshot')
    
    if [[ "$closest_snapshot" == "null" || -z "$closest_snapshot" ]]; then
        log_message "No snapshot found before target timestamp"
        return 1
    fi
    
    log_message "Found closest snapshot: $closest_snapshot"
    restore_snapshot "$closest_snapshot"
}

# Function to validate cluster after recovery
validate_recovery() {
    log_message "Validating cluster health after recovery"
    
    # Check cluster health
    local health=$(curl -s "$CLUSTER_ENDPOINT/_cluster/health")
    local status=$(echo "$health" | jq -r '.status')
    local active_shards=$(echo "$health" | jq -r '.active_shards')
    local unassigned_shards=$(echo "$health" | jq -r '.unassigned_shards')
    
    log_message "Cluster status: $status"
    log_message "Active shards: $active_shards"
    log_message "Unassigned shards: $unassigned_shards"
    
    # Check index count
    local index_count=$(curl -s "$CLUSTER_ENDPOINT/_cat/indices?h=index" | wc -l)
    log_message "Total indices: $index_count"
    
    # Perform basic functionality test
    log_message "Performing basic functionality test"
    local test_result=$(curl -s "$CLUSTER_ENDPOINT/_search?size=1")
    local hit_count=$(echo "$test_result" | jq -r '.hits.total.value')
    log_message "Search test returned $hit_count documents"
    
    if [[ "$status" == "green" && "$unassigned_shards" == "0" ]]; then
        log_message "✅ Recovery validation PASSED"
        return 0
    else
        log_message "❌ Recovery validation FAILED"
        return 1
    fi
}

# Main menu function
show_menu() {
    echo "=== Elasticsearch Disaster Recovery Menu ==="
    echo "1. List available snapshots"
    echo "2. Restore specific indices from snapshot"
    echo "3. Full cluster recovery"
    echo "4. Point-in-time recovery"
    echo "5. Validate recovery"
    echo "6. Exit"
    echo "=========================================="
}

# Main execution
main() {
    if [[ $# -eq 0 ]]; then
        while true; do
            show_menu
            read -p "Select option (1-6): " choice
            
            case $choice in
                1)
                    list_snapshots
                    ;;
                2)
                    read -p "Enter snapshot name: " snapshot
                    read -p "Enter indices pattern (default: *): " indices
                    restore_snapshot "$snapshot" "${indices:-*}"
                    ;;
                3)
                    read -p "Enter snapshot name for full recovery: " snapshot
                    full_cluster_recovery "$snapshot"
                    ;;
                4)
                    read -p "Enter target timestamp (YYYY-MM-DD HH:MM:SS): " timestamp
                    point_in_time_recovery "$timestamp"
                    ;;
                5)
                    validate_recovery
                    ;;
                6)
                    echo "Exiting..."
                    break
                    ;;
                *)
                    echo "Invalid option"
                    ;;
            esac
            echo
        done
    else
        # Command line mode
        case $1 in
            "list")
                list_snapshots
                ;;
            "restore")
                restore_snapshot "$2" "$3"
                ;;
            "full-recovery")
                full_cluster_recovery "$2"
                ;;
            "pit-recovery")
                point_in_time_recovery "$2"
                ;;
            "validate")
                validate_recovery
                ;;
            *)
                echo "Usage: $0 [list|restore|full-recovery|pit-recovery|validate]"
                ;;
        esac
    fi
}

# Execute main function with all arguments
main "$@"
```

---

## Operational Procedures

### Rolling Update Procedure

```bash
#!/bin/bash
# elasticsearch_rolling_update.sh

CLUSTER_ENDPOINT="http://localhost:9200"
NEW_VERSION="9.1.5"
NODES=("es-master-01" "es-master-02" "es-master-03" "es-data-01" "es-data-02" "es-data-03")
UPDATE_LOG="/var/log/elasticsearch_update.log"

# Function to log with timestamp
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$UPDATE_LOG"
}

# Function to check cluster health
check_cluster_health() {
    local health=$(curl -s "$CLUSTER_ENDPOINT/_cluster/health" | jq -r '.status')
    echo "$health"
}

# Function to disable shard allocation
disable_shard_allocation() {
    log_message "Disabling shard allocation"
    curl -X PUT "$CLUSTER_ENDPOINT/_cluster/settings" \
        -H "Content-Type: application/json" \
        -d '{
            "persistent": {
                "cluster.routing.allocation.enable": "primaries"
            }
        }'
}

# Function to enable shard allocation
enable_shard_allocation() {
    log_message "Enabling shard allocation"
    curl -X PUT "$CLUSTER_ENDPOINT/_cluster/settings" \
        -H "Content-Type: application/json" \
        -d '{
            "persistent": {
                "cluster.routing.allocation.enable": null
            }
        }'
}

# Function to perform synced flush
perform_synced_flush() {
    log_message "Performing synced flush"
    curl -X POST "$CLUSTER_ENDPOINT/_flush/synced"
}

# Function to update single node
update_node() {
    local node_name=$1
    log_message "Starting update for node: $node_name"
    
    # Stop Elasticsearch service
    log_message "Stopping Elasticsearch on $node_name"
    ssh "$node_name" "sudo systemctl stop elasticsearch"
    
    # Backup current installation
    log_message "Backing up current installation on $node_name"
    ssh "$node_name" "sudo cp -r /etc/elasticsearch /etc/elasticsearch.backup.$(date +%Y%m%d)"
    
    # Update Elasticsearch
    log_message "Updating Elasticsearch to version $NEW_VERSION on $node_name"
    ssh "$node_name" "sudo apt-get update && sudo apt-get install -y elasticsearch=$NEW_VERSION"
    
    # Start Elasticsearch service
    log_message "Starting Elasticsearch on $node_name"
    ssh "$node_name" "sudo systemctl start elasticsearch"
    
    # Wait for node to join cluster
    log_message "Waiting for $node_name to join cluster"
    while true; do
        local node_count=$(curl -s "$CLUSTER_ENDPOINT/_cat/nodes" | wc -l)
        if [ "$node_count" -ge "${#NODES[@]}" ]; then
            break
        fi
        sleep 10
    done
    
    # Wait for cluster to stabilize
    log_message "Waiting for cluster to stabilize after $node_name update"
    while true; do
        local health=$(check_cluster_health)
        if [[ "$health" == "green" || "$health" == "yellow" ]]; then
            break
        fi
        sleep 15
    done
    
    log_message "Node $node_name updated successfully"
}

# Function to perform rolling update
perform_rolling_update() {
    log_message "Starting rolling update to Elasticsearch $NEW_VERSION"
    
    # Pre-update checks
    local initial_health=$(check_cluster_health)
    if [[ "$initial_health" == "red" ]]; then
        log_message "ERROR: Cluster is in RED state. Aborting update."
        exit 1
    fi
    
    log_message "Initial cluster health: $initial_health"
    
    # Disable shard allocation
    disable_shard_allocation
    
    # Perform synced flush
    perform_synced_flush
    
    # Update master nodes first (one by one)
    for node in "${NODES[@]}"; do
        if [[ "$node" == *"master"* ]]; then
            update_node "$node"
            
            # Wait longer after master node updates
            sleep 30
        fi
    done
    
    # Update data nodes
    for node in "${NODES[@]}"; do
        if [[ "$node" == *"data"* ]]; then
            update_node "$node"
        fi
    done
    
    # Re-enable shard allocation
    enable_shard_allocation
    
    # Wait for final cluster stabilization
    log_message "Waiting for final cluster stabilization"
    local max_wait=600  # 10 minutes
    local wait_time=0
    
    while [ $wait_time -lt $max_wait ]; do
        local health=$(check_cluster_health)
        local unassigned=$(curl -s "$CLUSTER_ENDPOINT/_cluster/health" | jq -r '.unassigned_shards')
        
        if [[ "$health" == "green" && "$unassigned" == "0" ]]; then
            log_message "✅ Rolling update completed successfully"
            break
        fi
        
        sleep 30
        wait_time=$((wait_time + 30))
    done
    
    if [ $wait_time -ge $max_wait ]; then
        log_message "⚠️ Rolling update completed but cluster not fully stabilized"
    fi
    
    # Final status report
    log_message "Final cluster status:"
    curl -s "$CLUSTER_ENDPOINT/_cluster/health" | jq '.'
    curl -s "$CLUSTER_ENDPOINT/_cat/nodes?v"
}

# Function to rollback update
rollback_update() {
    local node_name=$1
    log_message "Rolling back update for node: $node_name"
    
    # Stop Elasticsearch
    ssh "$node_name" "sudo systemctl stop elasticsearch"
    
    # Restore backup configuration
    ssh "$node_name" "sudo rm -rf /etc/elasticsearch && sudo mv /etc/elasticsearch.backup.* /etc/elasticsearch"
    
    # Downgrade package (if needed)
    # ssh "$node_name" "sudo apt-get install -y elasticsearch=$PREVIOUS_VERSION --allow-downgrades"
    
    # Start service
    ssh "$node_name" "sudo systemctl start elasticsearch"
    
    log_message "Rollback completed for $node_name"
}

# Main execution
case "${1:-update}" in
    "update")
        perform_rolling_update
        ;;
    "rollback")
        if [[ -n "$2" ]]; then
            rollback_update "$2"
        else
            echo "Usage: $0 rollback <node_name>"
        fi
        ;;
    "check")
        health=$(check_cluster_health)
        log_message "Current cluster health: $health"
        ;;
    *)
        echo "Usage: $0 [update|rollback|check]"
        ;;
esac
```

---

## Cost Analysis and ROI

### Total Cost of Ownership Calculator

```python
#!/usr/bin/env python3
# elasticsearch_tco_calculator.py

import json
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class CostBreakdown:
    """Cost breakdown structure for TCO analysis"""
    infrastructure: float
    software_licenses: float
    operational: float
    training: float
    support: float
    total: float

class ElasticsearchTCOCalculator:
    def __init__(self):
        # Cost assumptions (USD per month unless specified)
        self.vm_costs = {
            'master_node': 350,      # 8 CPU, 16GB RAM
            'data_node_small': 800,  # 16 CPU, 64GB RAM, 2TB SSD
            'data_node_large': 1600, # 32 CPU, 128GB RAM, 4TB SSD
            'coordinator_node': 400  # 8 CPU, 32GB RAM
        }
        
        self.bare_metal_costs = {
            'master_node': 600,      # Include depreciation
            'data_node_small': 1200,
            'data_node_large': 2400,
            'coordinator_node': 700
        }
        
        self.operational_costs = {
            'devops_engineer_monthly': 12000,  # Fully loaded cost
            'sre_engineer_monthly': 15000,
            'training_per_engineer': 3000,
            'monitoring_tools': 500,
            'backup_storage_per_gb': 0.023,
            'network_costs': 1000
        }
    
    def calculate_infrastructure_costs(self, deployment_type: str, 
                                     cluster_config: Dict) -> float:
        """Calculate monthly infrastructure costs"""
        
        if deployment_type == 'vm':
            cost_table = self.vm_costs
        elif deployment_type == 'bare_metal':
            cost_table = self.bare_metal_costs
        else:
            raise ValueError("Invalid deployment type")
        
        total_cost = 0
        
        for node_type, count in cluster_config.items():
            if node_type in cost_table:
                total_cost += cost_table[node_type] * count
        
        return total_cost
    
    def calculate_operational_costs(self, team_size: int, 
                                  data_volume_gb: int) -> Dict[str, float]:
        """Calculate monthly operational costs"""
        
        # Assume 40% of team time dedicated to Elasticsearch ops
        ops_percentage = 0.4
        ops_cost = (team_size * self.operational_costs['devops_engineer_monthly'] * 
                   ops_percentage)
        
        # Backup storage costs
        backup_cost = (data_volume_gb * 2 *  # 2x for retention
                      self.operational_costs['backup_storage_per_gb'])
        
        # Monitoring and tooling
        monitoring_cost = self.operational_costs['monitoring_tools']
        
        # Network costs
        network_cost = self.operational_costs['network_costs']
        
        return {
            'operations': ops_cost,
            'backup_storage': backup_cost,
            'monitoring': monitoring_cost,
            'networking': network_cost,
            'total': ops_cost + backup_cost + monitoring_cost + network_cost
        }
    
    def calculate_3_year_tco(self, deployment_type: str, 
                           cluster_config: Dict, team_size: int, 
                           data_volume_gb: int) -> Dict:
        """Calculate 3-year Total Cost of Ownership"""
        
        # Monthly costs
        infrastructure_monthly = self.calculate_infrastructure_costs(
            deployment_type, cluster_config)
        
        operational_breakdown = self.calculate_operational_costs(
            team_size, data_volume_gb)
        operational_monthly = operational_breakdown['total']
        
        # One-time costs
        training_cost = team_size * self.operational_costs['training_per_engineer']
        setup_cost = infrastructure_monthly * 0.5  # Setup effort
        
        # 3-year calculations
        monthly_total = infrastructure_monthly + operational_monthly
        three_year_recurring = monthly_total * 36
        three_year_total = three_year_recurring + training_cost + setup_cost
        
        # Cost per GB analysis
        cost_per_gb_monthly = monthly_total / data_volume_gb
        cost_per_gb_3year = three_year_total / (data_volume_gb * 36)
        
        return {
            'monthly_breakdown': {
                'infrastructure': infrastructure_monthly,
                'operations': operational_monthly,
                'total': monthly_total
            },
            'one_time_costs': {
                'training': training_cost,
                'setup': setup_cost,
                'total': training_cost + setup_cost
            },
            'three_year_total': three_year_total,
            'cost_efficiency': {
                'cost_per_gb_monthly': cost_per_gb_monthly,
                'cost_per_gb_3year': cost_per_gb_3year
            },
            'operational_breakdown': operational_breakdown
        }
    
    def compare_deployment_types(self, cluster_configs: Dict, 
                               team_size: int, data_volume_gb: int) -> Dict:
        """Compare TCO across different deployment types"""
        
        comparison = {}
        
        for deployment_type, config in cluster_configs.items():
            tco = self.calculate_3_year_tco(
                deployment_type, config, team_size, data_volume_gb)
            comparison[deployment_type] = tco
        
        # Calculate savings
        if 'vm' in comparison and 'bare_metal' in comparison:
            vm_cost = comparison['vm']['three_year_total']
            bare_metal_cost = comparison['bare_metal']['three_year_total']
            
            if vm_cost > bare_metal_cost:
                savings = vm_cost - bare_metal_cost
                savings_percentage = (savings / vm_cost) * 100
                comparison['savings_analysis'] = {
                    'bare_metal_saves': savings,
                    'savings_percentage': savings_percentage,
                    'break_even_months': 0  # Calculate break-even point
                }
        
        return comparison

# Example usage and reporting
def generate_tco_report():
    calculator = ElasticsearchTCOCalculator()
    
    # Example cluster configurations
    cluster_configs = {
        'vm': {
            'master_node': 3,
            'data_node_large': 6,
            'coordinator_node': 2
        },
        'bare_metal': {
            'master_node': 3,
            'data_node_large': 6,
            'coordinator_node': 2
        }
    }
    
    # Analysis parameters
    team_size = 8
    data_volume_gb = 50000  # 50TB
    
    # Generate comparison
    comparison = calculator.compare_deployment_types(
        cluster_configs, team_size, data_volume_gb)
    
    # Print formatted report
    print("=" * 60)
    print("ELASTICSEARCH DEPLOYMENT TCO ANALYSIS")
    print("=" * 60)
    print(f"Cluster Size: {data_volume_gb/1000:.1f}TB")
    print(f"Team Size: {team_size} engineers")
    print(f"Analysis Period: 3 years")
    print()
    
    for deployment_type, tco in comparison.items():
        if deployment_type == 'savings_analysis':
            continue
            
        print(f"{deployment_type.upper()} DEPLOYMENT:")
        print(f"  Monthly Infrastructure: ${tco['monthly_breakdown']['infrastructure']:,.0f}")
        print(f"  Monthly Operations: ${tco['monthly_breakdown']['operations']:,.0f}")
        print(f"  Monthly Total: ${tco['monthly_breakdown']['total']:,.0f}")
        print(f"  3-Year Total: ${tco['three_year_total']:,.0f}")
        print(f"  Cost per GB/month: ${tco['cost_efficiency']['cost_per_gb_monthly']:.2f}")
        print()
    
    if 'savings_analysis' in comparison:
        savings = comparison['savings_analysis']
        print("SAVINGS ANALYSIS:")
        print(f"  Bare Metal Saves: ${savings['bare_metal_saves']:,.0f}")
        print(f"  Savings Percentage: {savings['savings_percentage']:.1f}%")
        print()
    
    return comparison

if __name__ == "__main__":
    report = generate_tco_report()
    
    # Save detailed report to JSON
    with open('elasticsearch_tco_analysis.json', 'w') as f:
        json.dump(report, f, indent=2)
    
    print("Detailed analysis saved to elasticsearch_tco_analysis.json")
```

---

## Decision Framework Summary

### Self-Managed vs Alternatives

```yaml
# Decision matrix for self-managed Elasticsearch
choose_self_managed_when:
  technical_requirements:
    - "Need custom performance tuning and optimization"
    - "Require specific plugins or custom analyzers"
    - "Have unique security or compliance requirements"
    - "Need integration with existing infrastructure"
    
  operational_capabilities:
    - "Team has strong Linux and Elasticsearch expertise"
    - "Dedicated DevOps/SRE resources available"
    - "Existing infrastructure automation in place"
    - "24/7 monitoring and support capability"
    
  economic_factors:
    - "Data volume >10TB with predictable growth"
    - "Long-term deployment (>2 years)"
    - "Cost optimization is primary concern"
    - "Existing hardware or cloud credits available"
    
  business_requirements:
    - "Full control over data location and processing"
    - "Strict SLA requirements with penalties"
    - "Integration with existing backup/DR procedures"
    - "Regulatory compliance needs custom implementation"

avoid_self_managed_when:
  constraints:
    - "Team size <5 engineers"
    - "Limited operational expertise"
    - "Rapid time-to-market requirements"
    - "Uncertain growth patterns"
    - "Budget constraints for operational overhead"
```

### ROI Analysis Framework

```yaml
# Return on Investment analysis for self-managed deployments
roi_calculation:
  investment_factors:
    initial_setup: "Hardware + setup time + training"
    operational_overhead: "40-60% of team time ongoing"
    tooling_and_automation: "Monitoring, backup, automation tools"
    
  return_factors:
    cost_savings: "40-60% vs managed solutions at scale"
    performance_gains: "20-40% better performance through optimization"
    feature_flexibility: "Access to full Elasticsearch ecosystem"
    vendor_independence: "No lock-in, full migration flexibility"
    
  break_even_analysis:
    typical_break_even: "12-18 months for >10TB deployments"
    factors_affecting_timeline:
      - "Team learning curve (3-6 months)"
      - "Infrastructure setup complexity"
      - "Data volume and growth rate"
      - "Optimization effort investment"
```

---

## Production Readiness Checklist

### Pre-Production Validation

```bash
#!/bin/bash
# elasticsearch_production_readiness.sh

CLUSTER_ENDPOINT="http://localhost:9200"
CHECKLIST_LOG="/var/log/elasticsearch_readiness.log"

# Function to log results
log_check() {
    local check_name=$1
    local status=$2
    local details=$3
    
    echo "$(date '+%Y-%m-%d %H:%M:%S') - [$status] $check_name: $details" | tee -a "$CHECKLIST_LOG"
}

# Function to check cluster health
check_cluster_health() {
    local health=$(curl -s "$CLUSTER_ENDPOINT/_cluster/health")
    local status=$(echo "$health" | jq -r '.status')
    local nodes=$(echo "$health" | jq -r '.number_of_nodes')
    local data_nodes=$(echo "$health" | jq -r '.number_of_data_nodes')
    
    if [[ "$status" == "green" && "$nodes" -ge 3 && "$data_nodes" -ge 3 ]]; then
        log_check "Cluster Health" "PASS" "Status: $status, Nodes: $nodes, Data nodes: $data_nodes"
        return 0
    else
        log_check "Cluster Health" "FAIL" "Status: $status, Nodes: $nodes, Data nodes: $data_nodes"
        return 1
    fi
}

# Function to check security configuration
check_security() {
    local security_enabled=$(curl -s "$CLUSTER_ENDPOINT/_xpack/security" | jq -r '.enabled')
    local ssl_check=$(curl -sk "https://localhost:9200" -o /dev/null -w "%{http_code}")
    
    if [[ "$security_enabled" == "true" && "$ssl_check" == "200" ]]; then
        log_check "Security Configuration" "PASS" "Security enabled, SSL configured"
        return 0
    else
        log_check "Security Configuration" "FAIL" "Security: $security_enabled, SSL: $ssl_check"
        return 1
    fi
}

# Function to check backup configuration
check_backup() {
    local repos=$(curl -s "$CLUSTER_ENDPOINT/_snapshot" | jq '. | length')
    local latest_snapshot=$(curl -s "$CLUSTER_ENDPOINT/_snapshot/_all/_all" | jq -r '.snapshots[-1].snapshot // "none"')
    
    if [[ "$repos" -gt 0 && "$latest_snapshot" != "none" ]]; then
        log_check "Backup Configuration" "PASS" "Repositories: $repos, Latest snapshot: $latest_snapshot"
        return 0
    else
        log_check "Backup Configuration" "FAIL" "Repositories: $repos, Latest snapshot: $latest_snapshot"
        return 1
    fi
}

# Function to check monitoring
check_monitoring() {
    local monitoring_enabled=$(curl -s "$CLUSTER_ENDPOINT/_xpack/monitoring" | jq -r '.enabled')
    local prometheus_metrics=$(curl -s "http://localhost:9114/metrics" | grep -c "elasticsearch_")
    
    if [[ "$monitoring_enabled" == "true" && "$prometheus_metrics" -gt 0 ]]; then
        log_check "Monitoring Setup" "PASS" "X-Pack monitoring: enabled, Prometheus metrics: $prometheus_metrics"
        return 0
    else
        log_check "Monitoring Setup" "FAIL" "X-Pack monitoring: $monitoring_enabled, Prometheus metrics: $prometheus_metrics"
        return 1
    fi
}

# Function to check performance baselines
check_performance() {
    log_check "Performance Baseline" "INFO" "Starting performance validation..."
    
    # Create test index
    curl -X PUT "$CLUSTER_ENDPOINT/performance_test" \
        -H "Content-Type: application/json" \
        -d '{
            "settings": {
                "number_of_shards": 1,
                "number_of_replicas": 1
            },
            "mappings": {
                "properties": {
                    "timestamp": {"type": "date"},
                    "message": {"type": "text"},
                    "value": {"type": "integer"}
                }
            }
        }'
    
    # Index test data
    local start_time=$(date +%s)
    for i in {1..1000}; do
        curl -X POST "$CLUSTER_ENDPOINT/performance_test/_doc" \
            -H "Content-Type: application/json" \
            -d "{
                \"timestamp\": \"$(date -Iseconds)\",
                \"message\": \"Test message $i\",
                \"value\": $i
            }" > /dev/null 2>&1
    done
    local end_time=$(date +%s)
    local indexing_time=$((end_time - start_time))
    
    # Test search performance
    local search_start=$(date +%s%3N)
    curl -s "$CLUSTER_ENDPOINT/performance_test/_search?q=message:test" > /dev/null
    local search_end=$(date +%s%3N)
    local search_time=$((search_end - search_start))
    
    # Cleanup
    curl -X DELETE "$CLUSTER_ENDPOINT/performance_test"
    
    if [[ "$indexing_time" -lt 30 && "$search_time" -lt 100 ]]; then
        log_check "Performance Baseline" "PASS" "Indexing: ${indexing_time}s for 1000 docs, Search: ${search_time}ms"
        return 0
    else
        log_check "Performance Baseline" "WARN" "Indexing: ${indexing_time}s for 1000 docs, Search: ${search_time}ms"
        return 1
    fi
}

# Function to check resource limits
check_resource_limits() {
    local nodes_stats=$(curl -s "$CLUSTER_ENDPOINT/_nodes/stats")
    local issues=0
    
    # Check heap usage across nodes
    echo "$nodes_stats" | jq -r '.nodes | to_entries[] | 
        "\(.value.name) \(.value.jvm.mem.heap_used_percent)"' | 
    while read -r node_name heap_percent; do
        if [[ "$heap_percent" -gt 75 ]]; then
            log_check "Resource Limits" "WARN" "Node $node_name heap usage: ${heap_percent}%"
            ((issues++))
        fi
    done
    
    # Check disk usage
    echo "$nodes_stats" | jq -r '.nodes | to_entries[] |
        "\(.value.name) \((.value.fs.total.total_in_bytes - .value.fs.total.available_in_bytes) / .value.fs.total.total_in_bytes * 100 | floor)"' |
    while read -r node_name disk_percent; do
        if [[ "$disk_percent" -gt 80 ]]; then
            log_check "Resource Limits" "WARN" "Node $node_name disk usage: ${disk_percent}%"
            ((issues++))
        fi
    done
    
    if [[ "$issues" -eq 0 ]]; then
        log_check "Resource Limits" "PASS" "All nodes within acceptable resource limits"
        return 0
    else
        log_check "Resource Limits" "FAIL" "$issues nodes with resource issues"
        return 1
    fi
}

# Function to check disaster recovery procedures
check_disaster_recovery() {
    # Check if DR documentation exists
    if [[ -f "/opt/elasticsearch/dr_procedures.md" ]]; then
        log_check "Disaster Recovery" "PASS" "DR documentation found"
    else
        log_check "Disaster Recovery" "FAIL" "DR documentation missing"
        return 1
    fi
    
    # Check if backup restoration has been tested
    local test_restore_log="/var/log/backup_test.log"
    if [[ -f "$test_restore_log" ]]; then
        local last_test=$(stat -c %Y "$test_restore_log")
        local current_time=$(date +%s)
        local days_since_test=$(( (current_time - last_test) / 86400 ))
        
        if [[ "$days_since_test" -lt 30 ]]; then
            log_check "Disaster Recovery" "PASS" "Backup restoration tested $days_since_test days ago"
            return 0
        else
            log_check "Disaster Recovery" "WARN" "Backup restoration last tested $days_since_test days ago"
            return 1
        fi
    else
        log_check "Disaster Recovery" "FAIL" "No backup restoration testing evidence"
        return 1
    fi
}

# Function to generate final report
generate_report() {
    local total_checks=0
    local passed_checks=0
    local failed_checks=0
    local warnings=0
    
    while IFS= read -r line; do
        ((total_checks++))
        if [[ "$line" == *"[PASS]"* ]]; then
            ((passed_checks++))
        elif [[ "$line" == *"[FAIL]"* ]]; then
            ((failed_checks++))
        elif [[ "$line" == *"[WARN]"* ]]; then
            ((warnings++))
        fi
    done < "$CHECKLIST_LOG"
    
    echo "
====================================
ELASTICSEARCH PRODUCTION READINESS REPORT
====================================
Total Checks: $total_checks
Passed: $passed_checks
Failed: $failed_checks
Warnings: $warnings

Production Ready: $([ $failed_checks -eq 0 ] && echo "YES" || echo "NO")
====================================
    "
    
    if [[ $failed_checks -gt 0 ]]; then
        echo "FAILED CHECKS:"
        grep "\[FAIL\]" "$CHECKLIST_LOG"
        echo
    fi
    
    if [[ $warnings -gt 0 ]]; then
        echo "WARNINGS:"
        grep "\[WARN\]" "$CHECKLIST_LOG"
        echo
    fi
}

# Main execution
main() {
    echo "Starting Elasticsearch Production Readiness Check..."
    echo "Log file: $CHECKLIST_LOG"
    echo "Cluster: $CLUSTER_ENDPOINT"
    echo
    
    # Clear previous log
    > "$CHECKLIST_LOG"
    
    # Run all checks
    check_cluster_health
    check_security
    check_backup
    check_monitoring
    check_performance
    check_resource_limits
    check_disaster_recovery
    
    # Generate final report
    generate_report
}

# Execute main function
main
```

### Go-Live Procedures

```bash
#!/bin/bash
# elasticsearch_go_live.sh

CLUSTER_ENDPOINT="http://localhost:9200"
PRODUCTION_INDICES=("app-logs" "metrics" "user-events")
LOAD_BALANCER_ENDPOINT="https://elasticsearch-prod.company.com"

# Function to gradually increase traffic
gradual_traffic_increase() {
    local percentages=(10 25 50 75 100)
    
    echo "Starting gradual traffic increase..."
    
    for percentage in "${percentages[@]}"; do
        echo "Increasing traffic to $percentage%"
        
        # Update load balancer weights (example with HAProxy)
        # This would vary based on your load balancer
        ssh load-balancer "echo 'set server elasticsearch-backend/node1 weight $percentage' | socat stdio /var/run/haproxy.sock"
        
        # Monitor for 10 minutes
        echo "Monitoring cluster performance for 10 minutes..."
        for i in {1..10}; do
            local health=$(curl -s "$CLUSTER_ENDPOINT/_cluster/health" | jq -r '.status')
            local query_time=$(curl -s "$CLUSTER_ENDPOINT/_nodes/stats" | jq -r '._all.indices.search.query_time_in_millis')
            
            echo "  Minute $i: Health=$health, Avg Query Time=${query_time}ms"
            
            if [[ "$health" != "green" ]]; then
                echo "❌ Health degraded, rolling back traffic increase"
                # Rollback traffic
                ssh load-balancer "echo 'set server elasticsearch-backend/node1 weight $((percentage - 25))' | socat stdio /var/run/haproxy.sock"
                return 1
            fi
            
            sleep 60
        done
        
        echo "✅ $percentage% traffic level stable"
    done
    
    echo "🎉 Full traffic migration completed successfully"
}

# Function to validate production workload
validate_production_workload() {
    echo "Validating production workload..."
    
    # Check index creation and data ingestion
    for index in "${PRODUCTION_INDICES[@]}"; do
        local doc_count=$(curl -s "$CLUSTER_ENDPOINT/$index/_count" | jq -r '.count')
        echo "Index $index: $doc_count documents"
        
        if [[ "$doc_count" -eq 0 ]]; then
            echo "⚠️ Warning: No documents in $index"
        fi
    done
    
    # Performance validation
    local avg_query_latency=$(curl -s "$CLUSTER_ENDPOINT/_nodes/stats" | jq -r '.nodes | map(.indices.search.query_time_in_millis / .indices.search.query_total) | add / length')
    local indexing_rate=$(curl -s "$CLUSTER_ENDPOINT/_nodes/stats" | jq -r '.nodes | map(.indices.indexing.index_total) | add')
    
    echo "Average query latency: ${avg_query_latency}ms"
    echo "Total indexed documents: $indexing_rate"
    
    # SLA validation
    if [[ $(echo "$avg_query_latency < 100" | bc) -eq 1 ]]; then
        echo "✅ Query latency SLA met"
    else
        echo "❌ Query latency SLA not met"
        return 1
    fi
}

# Function to enable production monitoring
enable_production_monitoring() {
    echo "Enabling production monitoring and alerting..."
    
    # Enable cluster-level monitoring
    curl -X PUT "$CLUSTER_ENDPOINT/_cluster/settings" \
        -H "Content-Type: application/json" \
        -d '{
            "persistent": {
                "xpack.monitoring.collection.enabled": true,
                "xpack.monitoring.collection.interval": "10s"
            }
        }'
    
    # Configure alerting
    curl -X PUT "$CLUSTER_ENDPOINT/_watcher/watch/production_health_monitor" \
        -H "Content-Type: application/json" \
        -d '{
            "trigger": {
                "schedule": {
                    "interval": "1m"
                }
            },
            "input": {
                "http": {
                    "request": {
                        "scheme": "http",
                        "host": "localhost",
                        "port": 9200,
                        "path": "/_cluster/health"
                    }
                }
            },
            "condition": {
                "compare": {
                    "ctx.payload.status": {
                        "not_eq": "green"
                    }
                }
            },
            "actions": {
                "send_alert": {
                    "webhook": {
                        "scheme": "https",
                        "host": "hooks.slack.com",
                        "port": 443,
                        "method": "post",
                        "path": "/services/YOUR/SLACK/WEBHOOK",
                        "body": "🚨 Production Elasticsearch cluster health is {{ctx.payload.status}}"
                    }
                }
            }
        }'
    
    echo "✅ Production monitoring enabled"
}

# Main go-live procedure
main() {
    echo "======================================"
    echo "ELASTICSEARCH PRODUCTION GO-LIVE"
    echo "======================================"
    echo "Cluster: $CLUSTER_ENDPOINT"
    echo "Load Balancer: $LOAD_BALANCER_ENDPOINT"
    echo "Time: $(date)"
    echo
    
    # Pre-flight checks
    echo "1. Running pre-flight checks..."
    ./elasticsearch_production_readiness.sh
    
    if [[ $? -ne 0 ]]; then
        echo "❌ Pre-flight checks failed. Aborting go-live."
        exit 1
    fi
    
    # Enable production monitoring
    echo "2. Enabling production monitoring..."
    enable_production_monitoring
    
    # Start gradual traffic increase
    echo "3. Starting gradual traffic migration..."
    gradual_traffic_increase
    
    if [[ $? -ne 0 ]]; then
        echo "❌ Traffic migration failed. Manual intervention required."
        exit 1
    fi
    
    # Validate production workload
    echo "4. Validating production workload..."
    validate_production_workload
    
    if [[ $? -ne 0 ]]; then
        echo "❌ Production workload validation failed."
        exit 1
    fi
    
    echo "
🎉 PRODUCTION GO-LIVE COMPLETED SUCCESSFULLY!
    
Next Steps:
1. Monitor cluster performance for the next 24 hours
2. Validate backup procedures within 48 hours
3. Conduct post-go-live review within 1 week
4. Update documentation with production configurations
    
Support Contacts:
- Primary: SRE Team
- Secondary: Platform Engineering
- Escalation: Engineering Manager
    "
}

# Execute main function
main
```

---

## Summary and Next Steps

Self-managed Elasticsearch deployments offer unparalleled control, performance optimization opportunities, and cost efficiency at scale. However, they require significant technical expertise, operational maturity, and long-term commitment to succeed.

### Key Success Factors

**Technical Foundation:**
- Proper hardware sizing and optimization
- Comprehensive monitoring and alerting
- Automated backup and disaster recovery
- Security implementation and maintenance

**Operational Excellence:**
- Skilled team with Elasticsearch expertise
- Robust deployment and update procedures
- 24/7 monitoring and incident response
- Regular capacity planning and optimization

**Strategic Alignment:**
- Clear ROI justification and tracking
- Long-term commitment to operational investment
- Integration with existing infrastructure
- Compliance and security requirements

### When Self-Managed Makes Sense

Choose self-managed Elasticsearch when:
- Data volume exceeds 10TB with predictable growth
- Team has strong infrastructure and Elasticsearch expertise
- Cost optimization is a primary concern (40-60% savings at scale)
- Custom performance tuning or security requirements exist
- Long-term deployment horizon (2+ years) justifies investment

### Migration Path from Managed Solutions

If you're currently using managed Elasticsearch and considering self-managed:

1. **Assessment Phase (1-2 months):**
   - Evaluate team capabilities and training needs
   - Analyze current costs and performance requirements
   - Plan infrastructure and automation requirements

2. **Proof of Concept (2-3 months):**
   - Build parallel self-managed environment
   - Test performance and operational procedures
   - Validate cost projections and ROI

3. **Production Migration (1-2 months):**
   - Implement gradual data migration
   - Validate functionality and performance
   - Execute complete cutover with rollback plan

---

## Next in the Series

Your self-managed infrastructure foundation is now solid. Continue exploring deployment strategies:

- **[Blog 4: Containerized Elasticsearch](https://thisiskushal31.github.io/blog/#/blog/docker-elasticsearch-container-deployment-strategies)** - Master Docker production strategies and container orchestration
- **[Blog 5: Kubernetes Deep Dive](https://thisiskushal31.github.io/blog/#/blog/kubernetes-elasticsearch-eck-helm-raw-yaml-deep-dive)** - Learn cloud-native deployment with ECK, Helm, and StatefulSets
- **[Blog 6: Local Development](https://thisiskushal31.github.io/blog/#/blog/elasticsearch-local-development-docker-packages-quick-start)** - Optimize development workflows for maximum productivity
- **[Blog 7: Ultimate Decision Matrix](https://thisiskushal31.github.io/blog/#/blog/elasticsearch-deployment-decision-matrix-complete-comparison-guide)** - Compare all deployment approaches with comprehensive analysis

---

Ready to explore advanced infrastructure automation and deployment patterns? Connect with a community of engineers building production-scale search infrastructure.

**[🔗 Access My Complete Technical Resource Collection](https://thisiskushal31.github.io/link/)**

---

**Fact-Checking & Verification:** This blog post contains technical specifications, best practices, and cost estimates based on publicly available documentation and industry research. All pricing information should be verified with official cloud provider pricing calculators. Technical capabilities and configurations may vary by environment and Elasticsearch version. For the most current and accurate information, please consult:
- [Elasticsearch Official Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Elasticsearch Installation Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)
- [Elasticsearch Configuration](https://www.elastic.co/guide/en/elasticsearch/reference/current/settings.html)

---

*From infrastructure as code to performance optimization, monitoring strategies to cost management - discover battle-tested insights for building resilient, scalable systems that power modern applications.* 
    