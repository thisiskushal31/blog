
// Example blog post structure
// Copy this file and modify the content to create new blog posts
export const blogPost = {
  // URL slug - should match the filename (without .ts extension)
  slug: 'implementing-gitops-with-argocd',
  
  // Main post metadata
  title: 'Implementing GitOps with ArgoCD: A Complete Guide',
  subtitle: 'Learn how to set up continuous deployment using GitOps principles',
  excerpt: 'GitOps has revolutionized how we think about deployments. In this comprehensive guide, we will walk through setting up ArgoCD for automated Kubernetes deployments.',
  
  // Publication details
  publishDate: '2024-01-15',
  readTime: '8 min read',
  
  // Categories for filtering (can have multiple)
  categories: ['GitOps', 'ArgoCD', 'Kubernetes', 'DevOps'],
  
  // Mark as featured to show in featured section
  featured: true,
  
  // Images (use placeholder.svg or add your own images to public folder)
  coverImage: '/placeholder.svg',
  
  // Author information
  author: {
    name: 'DevOps Engineer',
    avatar: '/placeholder.svg'
  },
  
  // Full markdown content - supports headings, code blocks, lists, etc.
  content: `# Implementing GitOps with ArgoCD: A Complete Guide

## Introduction

GitOps has revolutionized how we think about deployments. In this comprehensive guide, we will walk through setting up ArgoCD for automated Kubernetes deployments.

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
};
