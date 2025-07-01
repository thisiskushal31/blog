
export const portfolioConfig = {
  personal: {
    name: "DevOps Portfolio",
    initials: "DP",
    title: "DevOps Engineer",
    subtitle: "Transitioning to DevSecOps & Platform Engineering",
    description: "Passionate about building secure, scalable infrastructure and streamlining development workflows. Currently expanding into security-first practices and platform engineering.",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    email: "hello@devopsportfolio.com"
  },
  
  skills: {
    categories: [
      {
        title: "Cloud Platforms",
        icon: "☁️",
        skills: ["AWS", "Azure", "Google Cloud", "DigitalOcean"]
      },
      {
        title: "DevOps Tools", 
        icon: "🔧",
        skills: ["Docker", "Kubernetes", "Terraform", "Ansible"]
      },
      {
        title: "CI/CD & Automation",
        icon: "🚀", 
        skills: ["Jenkins", "GitHub Actions", "GitLab CI", "Azure DevOps"]
      },
      {
        title: "Programming",
        icon: "💻",
        skills: ["Python", "Bash/Shell", "JavaScript", "Go"]
      },
      {
        title: "Security & Monitoring",
        icon: "🔒",
        skills: ["Prometheus", "Grafana", "ELK Stack", "Vault"]
      },
      {
        title: "Databases",
        icon: "🗄️",
        skills: ["PostgreSQL", "Redis", "MongoDB", "MinIO"]
      }
    ]
  },

  projects: [
    {
      title: 'Cloud Infrastructure Automation Platform',
      description: 'Built a comprehensive infrastructure-as-code platform using Terraform and Ansible to automate cloud resource provisioning across multiple providers.',
      technologies: ['Terraform', 'Ansible', 'AWS', 'Azure', 'Python', 'Jenkins'],
      features: [
        'Multi-cloud resource provisioning',
        'Automated security compliance checks',
        'Cost optimization recommendations',
        'Self-service infrastructure portal'
      ],
      links: {
        github: 'https://github.com',
        demo: 'https://demo.com'
      },
      status: 'Production',
      category: 'DevOps'
    },
    {
      title: 'Kubernetes Monitoring Stack',
      description: 'Designed and implemented a comprehensive monitoring solution for Kubernetes clusters using Prometheus, Grafana, and custom alerting rules.',
      technologies: ['Kubernetes', 'Prometheus', 'Grafana', 'Helm', 'Go', 'Docker'],
      features: [
        'Custom Prometheus operators',
        'Multi-cluster monitoring',
        'Automated alert routing',
        'SLI/SLO tracking dashboards'
      ],
      links: {
        github: 'https://github.com'
      },
      status: 'Production',
      category: 'Platform Engineering'
    },
    {
      title: 'CI/CD Pipeline as Code',
      description: 'Created reusable CI/CD pipeline templates that can be deployed across different projects with minimal configuration.',
      technologies: ['GitHub Actions', 'Docker', 'Kubernetes', 'ArgoCD', 'YAML'],
      features: [
        'Template-based pipeline generation',
        'Automated security scanning',
        'Multi-environment deployments',
        'Rollback automation'
      ],
      links: {
        github: 'https://github.com'
      },
      status: 'Active Development',
      category: 'DevOps'
    },
    {
      title: 'Security Compliance Automation',
      description: 'Developed automated security compliance checking tools that integrate with CI/CD pipelines to ensure security standards.',
      technologies: ['Python', 'Docker', 'Trivy', 'OWASP ZAP', 'Jenkins'],
      features: [
        'Vulnerability scanning automation',
        'Compliance report generation',
        'Policy-as-code implementation',
        'Integration with popular CI/CD tools'
      ],
      links: {},
      status: 'Beta',
      category: 'DevSecOps'
    },
    {
      title: 'Microservices Platform',
      description: 'Built a complete platform for microservices deployment with service mesh, monitoring, and automated scaling.',
      technologies: ['Kubernetes', 'Istio', 'React', 'Node.js', 'PostgreSQL'],
      features: [
        'Service mesh integration',
        'Automated service discovery',
        'Load balancing and traffic management',
        'Comprehensive monitoring dashboard'
      ],
      links: {
        demo: 'https://demo.com'
      },
      status: 'Production',
      category: 'Software Engineering'
    }
  ],

  blogPosts: [
    {
      title: 'Implementing GitOps with ArgoCD: A Complete Guide',
      subtitle: 'Learn how to set up continuous deployment using GitOps principles',
      excerpt: 'GitOps has revolutionized how we think about deployments. In this comprehensive guide, we\'ll walk through setting up ArgoCD for automated Kubernetes deployments...',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['GitOps', 'ArgoCD', 'Kubernetes', 'DevOps'],
      featured: true,
      slug: 'implementing-gitops-with-argocd',
      category: 'DevOps',
      content: `# Implementing GitOps with ArgoCD: A Complete Guide

## Introduction

GitOps has revolutionized how we think about deployments. In this comprehensive guide, we'll walk through setting up ArgoCD for automated Kubernetes deployments.

## What is GitOps?

GitOps is a way of implementing Continuous Deployment for cloud native applications. It focuses on using Git as a single source of truth for declarative infrastructure and applications.

### Key Principles

- **Declarative**: The entire system described declaratively
- **Versioned and Immutable**: Git as the source of truth
- **Pulled Automatically**: Software agents automatically pull changes
- **Continuously Reconciled**: Software agents continuously observe actual system state

## Setting up ArgoCD

\`\`\`bash
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
\`\`\`

## Configuration

Create your application configuration:

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/your-app
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: default
\`\`\`

## Best Practices

1. Use separate repositories for application code and deployment configurations
2. Implement proper RBAC controls
3. Set up notifications for deployment events
4. Use sync policies wisely

## Conclusion

GitOps with ArgoCD provides a robust, secure, and scalable way to manage Kubernetes deployments.`
    },
    {
      title: 'Securing Your CI/CD Pipeline: Best Practices',
      subtitle: 'Essential security measures for modern deployment pipelines',
      excerpt: 'Security should be built into every stage of your CI/CD pipeline. Here are the key practices that will help you maintain a secure deployment process...',
      date: '2024-01-08',
      readTime: '6 min read',
      tags: ['Security', 'CI/CD', 'DevSecOps', 'Best Practices'],
      slug: 'securing-cicd-pipeline-best-practices',
      category: 'DevSecOps',
      content: `# Securing Your CI/CD Pipeline: Best Practices

## Why Pipeline Security Matters

Modern CI/CD pipelines are critical infrastructure that can be targeted by attackers. A compromised pipeline can lead to supply chain attacks affecting your entire organization.

## Key Security Measures

### 1. Secure Your Source Code

\`\`\`bash
# Use signed commits
git config --global commit.gpgsign true
git config --global user.signingkey YOUR_GPG_KEY_ID
\`\`\`

### 2. Implement Secrets Management

Never hardcode secrets in your pipeline files:

\`\`\`yaml
# Good - Using environment variables
- name: Deploy to production
  env:
    API_KEY: \${{ secrets.API_KEY }}
    DB_PASSWORD: \${{ secrets.DB_PASSWORD }}
\`\`\`

### 3. Use Minimal Permissions

Apply the principle of least privilege:

- Use specific service accounts
- Limit repository access
- Implement time-based access controls

### 4. Scan for Vulnerabilities

\`\`\`yaml
- name: Security Scan
  uses: securecodewarrior/github-action-add-sarif@v1
  with:
    sarif-file: 'security-scan-results.sarif'
\`\`\`

## Monitoring and Alerting

Set up comprehensive monitoring:

1. **Pipeline execution logs**
2. **Failed authentication attempts**
3. **Unusual deployment patterns**
4. **Resource access anomalies**

## Conclusion

Security in CI/CD is not optional—it's essential for protecting your software supply chain.`
    },
    {
      title: 'Monitoring Kubernetes at Scale with Prometheus',
      subtitle: 'Advanced monitoring strategies for large-scale deployments',
      excerpt: 'As your Kubernetes clusters grow, monitoring becomes increasingly complex. Learn advanced Prometheus configurations and alerting strategies...',
      date: '2024-01-01',
      readTime: '10 min read',
      tags: ['Kubernetes', 'Prometheus', 'Monitoring', 'SRE'],
      slug: 'monitoring-kubernetes-at-scale-with-prometheus',
      category: 'Platform Engineering',
      content: `# Monitoring Kubernetes at Scale with Prometheus

## The Challenge of Scale

Monitoring Kubernetes at scale presents unique challenges:

- **High cardinality metrics**
- **Resource consumption**
- **Alert fatigue**
- **Multi-cluster visibility**

## Prometheus Architecture for Scale

### Federation Setup

\`\`\`yaml
global:
  scrape_interval: 15s
  external_labels:
    cluster: 'production'
    region: 'us-west-2'

scrape_configs:
  - job_name: 'federate'
    scrape_interval: 15s
    honor_labels: true
    metrics_path: '/federate'
    params:
      'match[]':
        - '{job=~"kubernetes-.*"}'
\`\`\`

### Custom Metrics

Create custom metrics for business logic:

\`\`\`go
package main

import (
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
)

var (
    processedJobs = promauto.NewCounter(prometheus.CounterOpts{
        Name: "myapp_processed_jobs_total",
        Help: "The total number of processed jobs",
    })
)
\`\`\`

## Advanced Alerting Rules

\`\`\`yaml
groups:
- name: kubernetes-alerts
  rules:
  - alert: PodCrashLooping
    expr: increase(kube_pod_container_status_restarts_total[1h]) > 5
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "Pod {{ $labels.pod }} is crash looping"
\`\`\`

## Best Practices

1. **Use recording rules** for expensive queries
2. **Implement proper labeling** strategies
3. **Set up multi-cluster monitoring**
4. **Use Grafana for visualization**

## Performance Optimization

- Tune scrape intervals
- Use metric relabeling
- Implement proper retention policies
- Use remote storage for long-term data

## Conclusion

Effective Kubernetes monitoring requires careful planning and the right tools. Prometheus provides the foundation for observability at scale.`
    },
    {
      title: 'Infrastructure as Code: Terraform vs Pulumi',
      subtitle: 'Comparing two popular IaC tools for cloud infrastructure',
      excerpt: 'Both Terraform and Pulumi offer powerful infrastructure automation capabilities. Let\'s compare their strengths and use cases...',
      date: '2023-12-28',
      readTime: '7 min read',
      tags: ['Terraform', 'Pulumi', 'IaC', 'Cloud'],
      slug: 'infrastructure-as-code-terraform-vs-pulumi',
      category: 'DevOps',
      content: `# Infrastructure as Code: Terraform vs Pulumi

## Introduction

Infrastructure as Code (IaC) has become essential for modern cloud deployments. Two popular tools dominate this space: Terraform and Pulumi.

## Terraform: The Declarative Approach

### Strengths

- **Mature ecosystem** with extensive provider support
- **Large community** and comprehensive documentation
- **Declarative syntax** using HCL
- **State management** with remote backends

### Example

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1d0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "HelloWorld"
  }
}
\`\`\`

## Pulumi: The Programming Approach

### Strengths

- **Real programming languages** (TypeScript, Python, Go, C#)
- **Better testing capabilities**
- **IDE support** with intellisense
- **Policy as code** with CrossGuard

### Example

\`\`\`typescript
import * as aws from "@pulumi/aws";

const server = new aws.ec2.Instance("web-server", {
    ami: "ami-0c55b159cbfafe1d0",
    instanceType: "t2.micro",
    tags: {
        Name: "HelloWorld",
    },
});
\`\`\`

## Comparison Matrix

| Feature | Terraform | Pulumi |
|---------|-----------|--------|
| Learning Curve | Moderate | Easy for developers |
| Language Support | HCL only | Multiple languages |
| State Management | Built-in | Service-based |
| Testing | Limited | Full unit testing |
| Community | Large | Growing |

## When to Choose What?

### Choose Terraform if:
- You prefer declarative configuration
- You need maximum provider coverage
- Your team is comfortable with HCL

### Choose Pulumi if:
- You want to use familiar programming languages
- Testing is a priority
- You need complex logic in your infrastructure code

## Conclusion

Both tools are excellent choices. Your decision should be based on team preferences, existing skills, and specific project requirements.`
    },
    {
      title: 'Building Resilient Microservices with Istio Service Mesh',
      subtitle: 'Implementing service mesh for better microservice communication',
      excerpt: 'Service mesh architecture provides crucial capabilities for microservice deployments. Here\'s how to implement Istio effectively...',
      date: '2023-12-20',
      readTime: '12 min read',
      tags: ['Istio', 'Service Mesh', 'Microservices', 'Kubernetes'],
      slug: 'building-resilient-microservices-with-istio',
      category: 'Platform Engineering',
      content: `# Building Resilient Microservices with Istio Service Mesh

## What is a Service Mesh?

A service mesh is a dedicated infrastructure layer for handling service-to-service communication in microservices architectures.

## Why Istio?

Istio provides:

- **Traffic management**
- **Security policies**
- **Observability**
- **Policy enforcement**

## Installation

\`\`\`bash
# Download and install Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=$PWD/bin:$PATH

# Install Istio
istioctl install --set values.defaultRevision=default
\`\`\`

## Traffic Management

### Virtual Services

\`\`\`yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: productpage
spec:
  http:
  - match:
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: reviews
        subset: v2
  - route:
    - destination:
        host: reviews
        subset: v1
\`\`\`

### Destination Rules

\`\`\`yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: reviews
spec:
  host: reviews
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
\`\`\`

## Security Features

### Mutual TLS

\`\`\`yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
spec:
  mtls:
    mode: STRICT
\`\`\`

### Authorization Policies

\`\`\`yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: allow-read
spec:
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/bookinfo-reviews"]
    to:
    - operation:
        methods: ["GET"]
\`\`\`

## Observability

Istio provides built-in observability through:

1. **Distributed tracing** with Jaeger
2. **Metrics collection** with Prometheus
3. **Service topology** with Kiali

## Best Practices

1. Start with a pilot project
2. Implement gradual rollout
3. Monitor performance impact
4. Use circuit breakers
5. Implement proper retry policies

## Conclusion

Istio provides powerful capabilities for microservice communication, but requires careful planning and implementation.`
    },
    {
      title: 'Container Security: From Development to Production',
      subtitle: 'Comprehensive security practices for containerized applications',
      excerpt: 'Container security is multi-layered. Learn how to secure your containers from development through production deployment...',
      date: '2023-12-15',
      readTime: '9 min read',
      tags: ['Docker', 'Security', 'Containers', 'DevSecOps'],
      slug: 'container-security-development-to-production',
      category: 'DevSecOps',
      content: `# Container Security: From Development to Production

## The Container Security Landscape

Container security involves multiple layers:

- **Image security**
- **Runtime security**
- **Host security**
- **Network security**
- **Orchestration security**

## Secure Image Building

### Use Minimal Base Images

\`\`\`dockerfile
# Instead of this
FROM ubuntu:latest

# Use this
FROM alpine:3.18
# Or even better
FROM scratch
\`\`\`

### Multi-stage Builds

\`\`\`dockerfile
# Build stage
FROM golang:1.19 AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

# Production stage
FROM alpine:3.18
RUN adduser -D -s /bin/sh appuser
COPY --from=builder /app/main /app/main
USER appuser
CMD ["/app/main"]
\`\`\`

## Image Scanning

### Using Trivy

\`\`\`bash
# Scan local image
trivy image myimage:latest

# Scan in CI/CD pipeline
trivy image --format json --output result.json myimage:latest
\`\`\`

### GitHub Actions Integration

\`\`\`yaml
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'myimage:latest'
    format: 'sarif'
    output: 'trivy-results.sarif'
\`\`\`

## Runtime Security

### Security Contexts

\`\`\`yaml
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: app
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
\`\`\`

### Network Policies

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
\`\`\`

## Monitoring and Compliance

### Falco Rules

\`\`\`yaml
- rule: Unexpected outbound connection
  desc: Detect unexpected outbound connections
  condition: >
    outbound_connection and not fd.sport in (80, 443, 53)
  output: >
    Unexpected outbound connection (command=%proc.cmdline
    connection=%fd.name)
  priority: WARNING
\`\`\`

## Best Practices Checklist

- [ ] Use minimal base images
- [ ] Scan images for vulnerabilities
- [ ] Implement least privilege access
- [ ] Use read-only root filesystems
- [ ] Set up network segmentation
- [ ] Monitor runtime behavior
- [ ] Implement secrets management
- [ ] Regular security updates

## Conclusion

Container security requires a comprehensive approach covering the entire lifecycle from development to production.`
    },
    {
      title: 'Kubernetes Operators: Extending Platform Capabilities',
      subtitle: 'Building custom operators for automated application management',
      excerpt: 'Kubernetes operators extend the platform with custom automation. Learn how to build and deploy operators for your applications...',
      date: '2023-12-10',
      readTime: '11 min read',
      tags: ['Kubernetes', 'Operators', 'Automation', 'Go'],
      slug: 'kubernetes-operators-extending-platform-capabilities',
      category: 'Platform Engineering',
      content: `# Kubernetes Operators: Extending Platform Capabilities

## What are Kubernetes Operators?

Operators are software extensions to Kubernetes that use custom resources to manage applications and their components.

## Operator Pattern

The Operator pattern combines:

- **Custom Resource Definitions (CRDs)**
- **Custom Controllers**
- **Domain-specific knowledge**

## Building an Operator

### Define Custom Resource

\`\`\`yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: webapps.example.com
spec:
  group: example.com
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              replicas:
                type: integer
              image:
                type: string
\`\`\`

### Controller Logic

\`\`\`go
func (r *WebAppReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    log := r.Log.WithValues("webapp", req.NamespacedName)

    // Fetch the WebApp instance
    var webapp examplev1.WebApp
    if err := r.Get(ctx, req.NamespacedName, &webapp); err != nil {
        return ctrl.Result{}, client.IgnoreNotFound(err)
    }

    // Create or update deployment
    deployment := &appsv1.Deployment{}
    err := r.Get(ctx, types.NamespacedName{
        Name:      webapp.Name,
        Namespace: webapp.Namespace,
    }, deployment)

    if errors.IsNotFound(err) {
        // Create new deployment
        deployment = r.createDeployment(&webapp)
        return ctrl.Result{}, r.Create(ctx, deployment)
    }

    return ctrl.Result{}, nil
}
\`\`\`

## Operator SDK

### Initialize Project

\`\`\`bash
# Initialize new operator project
operator-sdk init --domain=example.com --repo=github.com/example/webapp-operator

# Create API
operator-sdk create api --group=apps --version=v1 --kind=WebApp --resource --controller
\`\`\`

## Advanced Patterns

### Finalizers

\`\`\`go
const webappFinalizer = "webapp.example.com/finalizer"

func (r *WebAppReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    webapp := &examplev1.WebApp{}
    err := r.Get(ctx, req.NamespacedName, webapp)
    
    if webapp.ObjectMeta.DeletionTimestamp.IsZero() {
        // Add finalizer if not present
        if !controllerutil.ContainsFinalizer(webapp, webappFinalizer) {
            controllerutil.AddFinalizer(webapp, webappFinalizer)
            return ctrl.Result{}, r.Update(ctx, webapp)
        }
    } else {
        // Handle deletion
        if controllerutil.ContainsFinalizer(webapp, webappFinalizer) {
            // Perform cleanup
            if err := r.cleanup(ctx, webapp); err != nil {
                return ctrl.Result{}, err
            }
            
            controllerutil.RemoveFinalizer(webapp, webappFinalizer)
            return ctrl.Result{}, r.Update(ctx, webapp)
        }
    }
    
    return ctrl.Result{}, nil
}
\`\`\`

### Status Subresource

\`\`\`go
type WebAppStatus struct {
    Conditions []metav1.Condition \`json:"conditions,omitempty"\`
    ReadyReplicas int32 \`json:"readyReplicas,omitempty"\`
}

// Update status
webapp.Status.ReadyReplicas = deployment.Status.ReadyReplicas
if err := r.Status().Update(ctx, webapp); err != nil {
    return ctrl.Result{}, err
}
\`\`\`

## Testing Operators

### Unit Tests

\`\`\`go
func TestWebAppController(t *testing.T) {
    scheme := runtime.NewScheme()
    _ = examplev1.AddToScheme(scheme)
    
    client := fake.NewClientBuilder().
        WithScheme(scheme).
        Build()
    
    reconciler := &WebAppReconciler{
        Client: client,
        Scheme: scheme,
    }
    
    // Test reconciliation logic
}
\`\`\`

### Integration Tests

\`\`\`bash
# Run tests with envtest
make test
\`\`\`

## Deployment Strategies

### Helm Charts

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "webapp-operator.fullname" . }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
      - name: manager
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        command:
        - /manager
\`\`\`

## Best Practices

1. **Follow Kubernetes conventions**
2. **Implement proper error handling**
3. **Use status subresources**
4. **Handle finalizers correctly**
5. **Write comprehensive tests**
6. **Implement observability**

## Conclusion

Operators provide a powerful way to extend Kubernetes with domain-specific automation, enabling platform teams to build self-service capabilities.`
    },
    {
      title: 'Multi-Cloud Strategy: Avoiding Vendor Lock-in',
      subtitle: 'Strategies for building portable cloud-native applications',
      excerpt: 'Multi-cloud strategies help avoid vendor lock-in while maximizing cloud benefits. Learn practical approaches to multi-cloud architecture...',
      date: '2023-12-05',
      readTime: '8 min read',
      tags: ['Multi-Cloud', 'Strategy', 'Architecture', 'Kubernetes'],
      slug: 'multi-cloud-strategy-avoiding-vendor-lock-in',
      category: 'Platform Engineering',
      content: `# Multi-Cloud Strategy: Avoiding Vendor Lock-in

## Why Multi-Cloud?

Multi-cloud strategies provide:

- **Vendor independence**
- **Risk mitigation**
- **Cost optimization**
- **Geographic flexibility**
- **Best-of-breed services**

## Multi-Cloud Patterns

### 1. Active-Active

Deploy the same application across multiple clouds simultaneously.

\`\`\`yaml
# Kubernetes deployment across clouds
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    cloud: aws
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        image: myapp:v1.0.0
        env:
        - name: CLOUD_PROVIDER
          value: "aws"
---
# Similar deployment in GCP
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    cloud: gcp
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        image: myapp:v1.0.0
        env:
        - name: CLOUD_PROVIDER
          value: "gcp"
\`\`\`

### 2. Active-Passive

Primary cloud with failover to secondary.

### 3. Hybrid Workloads

Different services running on different clouds based on their strengths.

## Technology Choices

### Container Orchestration

**Kubernetes** provides the most portable platform:

\`\`\`bash
# Same manifests work across clouds
kubectl apply -f app-manifests/ --context=aws-cluster
kubectl apply -f app-manifests/ --context=gcp-cluster
kubectl apply -f app-manifests/ --context=azure-cluster
\`\`\`

### Infrastructure as Code

**Terraform** with provider abstraction:

\`\`\`hcl
# modules/kubernetes-cluster/main.tf
resource "kubernetes_cluster" "main" {
  name     = var.cluster_name
  location = var.region
  
  # Provider-specific configurations
  dynamic "aws_config" {
    for_each = var.provider == "aws" ? [1] : []
    content {
      instance_type = var.aws_instance_type
      subnet_ids    = var.aws_subnet_ids
    }
  }
  
  dynamic "gcp_config" {
    for_each = var.provider == "gcp" ? [1] : []
    content {
      machine_type = var.gcp_machine_type
      zones        = var.gcp_zones
    }
  }
}
\`\`\`

### Service Mesh

**Istio** for consistent networking across clouds:

\`\`\`yaml
apiVersion: networking.istio.io/v1alpha3
kind: ServiceEntry
metadata:
  name: external-service
spec:
  hosts:
  - external-service.example.com
  ports:
  - number: 443
    name: https
    protocol: HTTPS
  location: MESH_EXTERNAL
  resolution: DNS
\`\`\`

## Data Strategy

### Data Replication

\`\`\`sql
-- Configure cross-cloud database replication
CREATE REPLICA DATABASE prod_replica 
FROM prod_primary 
WITH REGION = 'us-west-2';
\`\`\`

### Data Synchronization

\`\`\`python
import asyncio
from cloud_sync import CloudSync

async def sync_data():
    syncer = CloudSync(
        primary_cloud='aws',
        secondary_clouds=['gcp', 'azure']
    )
    
    await syncer.sync_buckets([
        'user-uploads',
        'application-data',
        'backup-storage'
    ])

# Run synchronization
asyncio.run(sync_data())
\`\`\`

## Monitoring and Observability

### Unified Monitoring

\`\`\`yaml
# Prometheus configuration for multi-cloud
global:
  scrape_interval: 15s
  external_labels:
    cluster: 'multi-cloud'

scrape_configs:
- job_name: 'aws-cluster'
  kubernetes_sd_configs:
  - api_server: 'https://aws-k8s-api.example.com'
  
- job_name: 'gcp-cluster'
  kubernetes_sd_configs:
  - api_server: 'https://gcp-k8s-api.example.com'
\`\`\`

### Distributed Tracing

\`\`\`yaml
# Jaeger configuration
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: multi-cloud-jaeger
spec:
  strategy: production
  storage:
    type: elasticsearch
    elasticsearch:
      nodeCount: 3
      redundancyPolicy: MultipleRedundancy
\`\`\`

## Cost Management

### Cloud Cost Optimization

\`\`\`python
# Cost optimization script
import boto3
import google.cloud.billing
from azure.mgmt.consumption import ConsumptionManagementClient

class MultiCloudCostOptimizer:
    def __init__(self):
        self.aws_client = boto3.client('ce')
        self.gcp_client = google.cloud.billing.CloudBillingClient()
        self.azure_client = ConsumptionManagementClient()
    
    def analyze_costs(self):
        aws_costs = self.get_aws_costs()
        gcp_costs = self.get_gcp_costs()
        azure_costs = self.get_azure_costs()
        
        return {
            'aws': aws_costs,
            'gcp': gcp_costs,
            'azure': azure_costs,
            'recommendations': self.generate_recommendations()
        }
\`\`\`

## Security Considerations

### Identity and Access Management

\`\`\`yaml
# Cross-cloud RBAC
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: multi-cloud-admin
rules:
- apiGroups: [""]
  resources: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: multi-cloud-admin-binding
subjects:
- kind: User
  name: admin@company.com
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: multi-cloud-admin
  apiGroup: rbac.authorization.k8s.io
\`\`\`

## Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Network Latency | Edge computing, CDN |
| Data Consistency | Event sourcing, CQRS |
| Compliance | Policy as code |
| Complexity | Automation, standardization |

## Best Practices

1. **Start with standards**: Use cloud-agnostic tools
2. **Automate everything**: Infrastructure, deployments, monitoring
3. **Plan for data**: Strategy for data portability
4. **Monitor costs**: Regular cost analysis and optimization
5. **Security first**: Consistent security policies across clouds

## Conclusion

Multi-cloud strategies require careful planning but provide significant benefits in terms of flexibility, resilience, and cost optimization.`
    },
    {
      title: 'Platform Engineering: Building Developer-Centric Infrastructure',
      subtitle: 'Creating self-service platforms that empower development teams',
      excerpt: 'Platform engineering focuses on building internal platforms that enable developers to deploy and manage applications efficiently...',
      date: '2023-11-30',
      readTime: '10 min read',
      tags: ['Platform Engineering', 'DevOps', 'Infrastructure', 'Developer Experience'],
      slug: 'platform-engineering-developer-centric-infrastructure',
      category: 'Platform Engineering',
      content: `# Platform Engineering: Building Developer-Centric Infrastructure

## What is Platform Engineering?

Platform engineering is the discipline of building and maintaining internal platforms that enable software development teams to deliver applications efficiently and reliably.

## Core Principles

### 1. Developer Self-Service

Enable developers to provision infrastructure without waiting for ops teams:

\`\`\`yaml
# Platform abstraction example
apiVersion: platform.company.com/v1
kind: Application
metadata:
  name: my-web-app
spec:
  runtime: nodejs
  version: "18"
  scaling:
    min: 2
    max: 10
  database:
    type: postgresql
    version: "14"
  monitoring:
    enabled: true
  security:
    policies: ["standard-web-app"]
\`\`\`

### 2. Golden Paths

Provide opinionated, well-tested paths for common use cases:

\`\`\`bash
# CLI tool for platform interaction
platform create app --name my-service --type web-api --language python
platform add database --type postgres --environment production
platform deploy --environment staging
\`\`\`

### 3. Progressive Disclosure

Start simple, allow complexity when needed:

\`\`\`yaml
# Simple configuration
apiVersion: platform.company.com/v1
kind: Service
metadata:
  name: simple-api
spec:
  image: my-org/api:v1.0.0
  port: 8080

---
# Advanced configuration with full control
apiVersion: platform.company.com/v1
kind: Service
metadata:
  name: complex-api
spec:
  image: my-org/api:v1.0.0
  port: 8080
  advanced:
    kubernetes:
      deployment:
        strategy:
          type: RollingUpdate
          rollingUpdate:
            maxSurge: 1
            maxUnavailable: 0
      service:
        type: LoadBalancer
        annotations:
          service.beta.kubernetes.io/aws-load-balancer-type: nlb
\`\`\`

## Platform Architecture

### Control Plane

\`\`\`go
// Platform controller example
type ApplicationController struct {
    client.Client
    Scheme   *runtime.Scheme
    Recorder record.EventRecorder
}

func (r *ApplicationController) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    app := &platformv1.Application{}
    if err := r.Get(ctx, req.NamespacedName, app); err != nil {
        return ctrl.Result{}, client.IgnoreNotFound(err)
    }

    // Create underlying Kubernetes resources
    if err := r.createDeployment(ctx, app); err != nil {
        return ctrl.Result{}, err
    }
    
    if err := r.createService(ctx, app); err != nil {
        return ctrl.Result{}, err
    }
    
    if app.Spec.Database != nil {
        if err := r.createDatabase(ctx, app); err != nil {
            return ctrl.Result{}, err
        }
    }

    return ctrl.Result{}, nil
}
\`\`\`

### API Gateway

\`\`\`yaml
# API Gateway configuration
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: platform-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*.platform.company.com"
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: platform-tls
    hosts:
    - "*.platform.company.com"
\`\`\`

## Developer Experience Tools

### CLI Interface

\`\`\`python
#!/usr/bin/env python3
import click
import yaml
from platform_sdk import PlatformClient

@click.group()
def cli():
    """Platform CLI for developers"""
    pass

@cli.command()
@click.option('--name', required=True, help='Application name')
@click.option('--type', type=click.Choice(['web', 'api', 'worker']), required=True)
def create(name, type):
    """Create a new application"""
    client = PlatformClient()
    
    template = client.get_template(type)
    app_config = template.render(name=name)
    
    with open(f'{name}.yaml', 'w') as f:
        yaml.dump(app_config, f)
    
    click.echo(f'Created {name}.yaml')
    click.echo(f'Deploy with: platform deploy {name}.yaml')

@cli.command()
@click.argument('config_file')
def deploy(config_file):
    """Deploy application"""
    client = PlatformClient()
    
    with open(config_file) as f:
        config = yaml.safe_load(f)
    
    result = client.deploy(config)
    click.echo(f'Deployed {config["metadata"]["name"]} - {result.status}')

if __name__ == '__main__':
    cli()
\`\`\`

### Web Interface

\`\`\`typescript
// React dashboard component
import React, { useState, useEffect } from 'react';
import { PlatformAPI } from './api';

const ApplicationDashboard: React.FC = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apps = await PlatformAPI.getApplications();
        setApplications(apps);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const deployApplication = async (appId: string) => {
    try {
      await PlatformAPI.deployApplication(appId);
      // Refresh application list
      const apps = await PlatformAPI.getApplications();
      setApplications(apps);
    } catch (error) {
      console.error('Deployment failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>My Applications</h1>
      <div className="app-grid">
        {applications.map(app => (
          <div key={app.id} className="app-card">
            <h3>{app.name}</h3>
            <p>Status: {app.status}</p>
            <p>Environment: {app.environment}</p>
            <button onClick={() => deployApplication(app.id)}>
              Deploy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDashboard;
\`\`\`

## Observability Integration

### Metrics Collection

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: platform-metrics
data:
  prometheus.yml: |
    global:
      scrape_interval: 30s
    scrape_configs:
    - job_name: 'platform-applications'
      kubernetes_sd_configs:
      - role: pod
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_platform_company_com_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_platform_company_com_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
\`\`\`

### Logging Pipeline

\`\`\`yaml
apiVersion: logging.coreos.com/v1
kind: ClusterLogForwarder
metadata:
  name: platform-logs
spec:
  outputs:
  - name: application-logs
    type: elasticsearch
    url: https://elasticsearch.platform.svc.cluster.local:9200
    elasticsearch:
      index: "platform-apps-{.log_type}-{+yyyy.MM.dd}"
  pipelines:
  - name: application-pipeline
    inputRefs:
    - application
    filterRefs:
    - platform-filter
    outputRefs:
    - application-logs
\`\`\`

## Security and Compliance

### Policy Enforcement

\`\`\`yaml
# Open Policy Agent policy
package platform.security

import future.keywords.in

deny[msg] {
    input.kind == "Application"
    not input.spec.security.scanImage
    msg := "Container image must be scanned for vulnerabilities"
}

deny[msg] {
    input.kind == "Application"
    input.spec.resources.limits.cpu > "2"
    not "high-cpu" in input.metadata.labels
    msg := "High CPU applications must be labeled appropriately"
}

allow {
    input.kind == "Application"
    input.spec.security.policies[_] == "standard-web-app"
    input.spec.runtime in ["nodejs", "python", "java"]
}
\`\`\`

## Platform Metrics

Track platform adoption and health:

\`\`\`promql
# Platform adoption metrics
rate(platform_deployments_total[5m])
platform_applications_active
avg_over_time(platform_deployment_duration_seconds[1h])
platform_developer_satisfaction_score
\`\`\`

## Best Practices

### 1. Start Small, Scale Gradually

Begin with a single team or use case, then expand.

### 2. Measure Developer Productivity

Track metrics like:
- Time to first deploy
- Deployment frequency
- Mean time to recovery
- Developer satisfaction

### 3. Maintain Clear Documentation

\`\`\`markdown
# Platform Quick Start Guide

## Deploying Your First Application

1. **Install the CLI**
   \`\`\`bash
   curl -L https://platform.company.com/cli | sh
   \`\`\`

2. **Create Application**
   \`\`\`bash
   platform create app --name my-app --type web
   \`\`\`

3. **Deploy**
   \`\`\`bash
   platform deploy my-app.yaml
   \`\`\`

## Getting Help

- Documentation: https://docs.platform.company.com
- Slack: #platform-support
- Office Hours: Tuesdays 2-3 PM PST
\`\`\`

### 4. Build Community

Foster a community of platform users:
- Regular office hours
- Documentation contributions
- Feature request process
- Internal conferences

## Common Pitfalls

1. **Building everything from scratch** - Use existing tools when possible
2. **Not involving developers** - Build with user feedback
3. **Over-engineering** - Start simple, add complexity as needed
4. **Ignoring operations** - Platform teams need operational support too

## Conclusion

Platform engineering is about empowering developers while maintaining operational excellence. Success requires balancing developer productivity with platform reliability and security.`
    }
  ],

  quickActions: [
    { name: "Email", url: "mailto:hello@devopsportfolio.com", icon: "Mail", description: "Get in touch directly" },
    { name: "Resume", url: "#", icon: "Download", description: "Download my latest resume" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin", description: "Professional network" },
    { name: "GitHub", url: "https://github.com", icon: "Github", description: "Code repositories" },
    { name: "Calendar", url: "#", icon: "Calendar", description: "Schedule a meeting" },
    { name: "Portfolio", url: "/", icon: "Globe", description: "View my work" },
    { name: "Blog", url: "/blog", icon: "BookOpen", description: "Read my articles" },
    { name: "Projects", url: "/projects", icon: "Folder", description: "Browse my projects" },
    { name: "Skills", url: "/skills", icon: "Award", description: "Technical expertise" },
    { name: "Experience", url: "/experience", icon: "Briefcase", description: "Work history" }
  ],

  socialLinks: [
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { name: "GitHub", url: "https://github.com", icon: "Github" }
  ]
};
