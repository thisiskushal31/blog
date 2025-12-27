import { BlogPost } from '../index';
import content from '../markdown/redis_deployment_guide_3_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "redis-self-managed-vm-bare-metal-production-guide",
  title: "Self-Managed Redis - VM and Bare Metal Production Guide",
  subtitle: "Build production-grade self-managed Redis deployments with focus on cost efficiency and performance",
  excerpt: "Complete guide to self-managed Redis on VMs and bare metal with production optimizations. Learn architecture, HA setup, performance tuning, and cost optimization strategies.",
  content,
  publishDate: "2025-02-07",
  categories: ["Redis", "Self-Managed", "Infrastructure"],
  searchCategories: ["Redis", "Databases", "Self-Managed", "VM", "Bare Metal", "Production", "HA"],
  coverImage: "/blog/blogImages/redis-deployment-guide.png",
};

