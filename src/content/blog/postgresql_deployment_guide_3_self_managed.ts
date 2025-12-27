import { BlogPost } from '../index';
import content from '../markdown/postgresql_deployment_guide_3_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "postgresql-self-managed-vm-bare-metal-production-guide",
  title: "Self-Managed PostgreSQL - VM and Bare Metal Production Guide",
  subtitle: "Build production-grade self-managed PostgreSQL deployments with focus on cost efficiency and performance",
  excerpt: "Complete guide to self-managed PostgreSQL on VMs and bare metal with production optimizations. Learn architecture, HA setup, performance tuning, and cost optimization strategies.",
  content,
  publishDate: "2025-01-22",
  categories: ["PostgreSQL", "Self-Managed", "Infrastructure"],
  searchCategories: ["PostgreSQL", "Databases", "Self-Managed", "VM", "Bare Metal", "Production", "HA"],
  coverImage: "/blog/blogImages/postgresql-deployment-guide.png",
};

