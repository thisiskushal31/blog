# Aerospike Local Development - Docker vs Native Quick Start

*Optimize your development environment for maximum productivity and seamless production parity*

---

## Introduction

Setting up Aerospike for local development shouldn't be complicated, but choosing between Docker and native installation can impact your productivity. This guide covers both approaches, helping you choose the right method for your workflow and optimize your development environment.

For technical managers, this guide helps you understand the trade-offs between Docker and native installations, and how to ensure development environments match production for better quality and faster delivery.

## TL;DR

- **What:** Complete guide to Aerospike local development setup
- **When to use:** When setting up Aerospike for development or testing
- **Reading time:** 8-10 minutes
- **Implementation time:** 15-30 minutes for setup
- **Key takeaway:** Docker provides consistency, native installation offers better performance—choose based on your team's workflow and needs
- **Skip if:** You're only deploying to production and don't need local development

**What You'll Master:**
- Docker development setup
- Native installation performance comparison
- IDE integration and debugging configurations
- Local cluster setup for multi-node testing
- Development-to-production parity strategies

---

## Docker Development Setup

> 💡 **Learning Aerospike basics?** Check out our [Aerospike Operations Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/aerospike/README.md#operations) for comprehensive operations, queries, and data manipulation techniques.

### Quick Start with Docker

The official Aerospike Docker image is the easiest way to get started:

**Basic Setup:**
```bash
docker run --name aerospike-dev \
    -p 3000:3000 \
    -p 3001:3001 \
    -p 3002:3002 \
    -p 3003:3003 \
    -d aerospike/aerospike-server:7.0
```

**Connect:**
```bash
asadm -h localhost -p 3000
```

### Docker Compose for Development

**docker-compose.dev.yml:**
```yaml
version: '3.8'

services:
  aerospike:
    image: aerospike/aerospike-server:7.0
    container_name: aerospike-dev
    ports:
      - "3000:3000"
      - "3001:3001"
      - "3002:3002"
      - "3003:3003"
    volumes:
      - aerospike_dev_data:/opt/aerospike/data
    healthcheck:
      test: ["CMD", "asadm", "-e", "info"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  aerospike_dev_data:
```

---

## Native Installation

### Installation Methods

**Ubuntu/Debian:**
```bash
# Add Aerospike repository
curl -L https://aerospike.com/download/server/latest/artifact/ubuntu22 | sudo bash

# Install
sudo apt-get install aerospike-server-enterprise

# Start service
sudo systemctl start aerospike
```

**CentOS/RHEL:**
```bash
# Add Aerospike repository
curl -L https://aerospike.com/download/server/latest/artifact/el8 | sudo bash

# Install
sudo yum install aerospike-server-enterprise

# Start service
sudo systemctl start aerospike
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

## Next Steps

- **Need Production Setup?** → Read [Blog 3: Self-Managed](https://thisiskushal31.github.io/blog/#/blog/aerospike-self-managed-vm-bare-metal-production-guide)
- **Want Performance Optimization?** → Read [Blog 7: Performance Optimization](https://thisiskushal31.github.io/blog/#/blog/aerospike-performance-optimization-hma-clustering)
- **Considering Kubernetes?** → Read [Blog 5: Kubernetes Deep Dive](https://thisiskushal31.github.io/blog/#/blog/aerospike-kubernetes-statefulset-deep-dive)

## Deep Dive Resources

For comprehensive technical details, explore our [Aerospike Technical Deep Dive](https://thisiskushal31.github.io/dochub/#/databases/nosql/aerospike/README.md).

---

**Fact-Checking & Verification:** This blog post contains setup instructions, configuration examples, and best practices based on publicly available documentation and industry research. Installation steps and commands may vary by operating system and Aerospike version. For the most current and accurate information, please consult:
- [Aerospike Official Documentation](https://docs.aerospike.com/)
- [Aerospike Download Page](https://www.aerospike.com/download/)
- [Docker Official Documentation](https://docs.docker.com/)

---

*This is Blog 6 of the Aerospike Deployment Guide. Return to the [series hub](https://thisiskushal31.github.io/blog/#/blog/aerospike-deployment-guide) to explore all posts.*

