import { BlogPost } from '../index';
import content from '../markdown/mysql_deployment_guide_3_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "mysql-self-managed-vm-bare-metal-production-guide",
  title: "Self-Managed MySQL - VM and Bare Metal Production Guide",
  subtitle: "Build production-grade self-managed MySQL clusters with advanced optimization techniques",
  excerpt: "Complete guide to self-managed MySQL covering installation, configuration, replication setup, performance tuning, high availability, and operational best practices. Includes official MySQL documentation references and production-tested configurations.",
  content,
  publishDate: "2025-01-15",
  categories: ["MySQL", "Self-Managed", "Production"],
  searchCategories: ["MySQL", "Self-Managed", "Production", "Replication", "High Availability"],
  coverImage: "/blog/blogImages/mysql-self-managed.png",
};

