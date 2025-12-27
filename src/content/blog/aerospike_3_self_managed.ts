import { BlogPost } from '../index';
import content from '../markdown/aerospike_3_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "aerospike-self-managed-vm-bare-metal-production-guide",
  title: "Blog 3: Self-Managed Aerospike - VM and Bare Metal Production Guide",
  subtitle: "Build production-grade self-managed Aerospike deployments with focus on cost efficiency and performance",
  excerpt: "Complete guide to self-managed Aerospike on VMs and bare metal with production optimizations. Learn architecture, HA setup, HMA tuning, performance optimization, and cost optimization strategies.",
  content,
  publishDate: "2025-02-15",
  categories: ["Aerospike", "Self-Managed", "Infrastructure"],
  searchCategories: ["Aerospike", "Databases", "Self-Managed", "VM", "Bare Metal", "Production", "HA"],
  coverImage: "/blog/blogImages/aerospike-self-managed.png",
};

