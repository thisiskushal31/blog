import { BlogPost } from '../blogPostIndex';
import content from './markdown/es_deployment_guide_3_self_managed_infrastructure.md?raw';

export const blogPost: BlogPost = {
  slug: "self-managed-elasticsearch-vm-bare-metal-production-guide",
  title: "Self-Managed Elasticsearch - VM and Bare Metal Production Guide",
  subtitle: "Build production-grade self-managed clusters with advanced optimization techniques",
  excerpt: "Complete guide to self-managed Elasticsearch on VM and bare metal with multi-node automation, performance tuning, hardware sizing, and operational procedures.",
  content,
  publishDate: "2025-08-24",
  categories: ["Elasticsearch", "Deployment", "Self-Managed", "Infrastructure", "Production"],
  searchCategories: ["Deployment Guide", "Elasticsearch", "Database Management"],
  coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  coverImageCredit: "Photo by ThisisEngineering RAEng on Unsplash"
}; 