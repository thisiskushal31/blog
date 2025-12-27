import { BlogPost } from '../index';
import content from '../markdown/mongodb_3_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "mongodb-self-managed-vm-bare-metal-production-guide",
  title: "Blog 3: Self-Managed MongoDB - VM and Bare Metal Production Guide",
  subtitle: "Build production-grade self-managed MongoDB deployments with focus on cost efficiency and performance",
  excerpt: "Complete guide to self-managed MongoDB on VMs and bare metal with production optimizations. Learn architecture, HA setup, performance tuning, and cost optimization strategies.",
  content,
  publishDate: "2025-01-30",
  categories: ["MongoDB", "Self-Managed", "Infrastructure"],
  searchCategories: ["MongoDB", "Databases", "Self-Managed", "VM", "Bare Metal", "Production", "HA"],
  coverImage: "/blog/blogImages/mongodb-self-managed.png",
};

