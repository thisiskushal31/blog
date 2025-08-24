import { BlogPost } from '../blogPostIndex';
import content from './markdown/es_deployment_guide_1_elastic_cloud_vs_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "elastic-cloud-vs-self-managed-strategic-decision-framework",
  title: "Elastic Cloud vs Self-Managed - Strategic Decision Framework",
  subtitle: "Master the fundamental decision between managed services and self-managed infrastructure",
  excerpt: "Comprehensive analysis of Elastic Cloud vs self-managed Elasticsearch with TCO calculations, risk assessment, and performance benchmarks to guide your deployment strategy.",
  content,
  publishDate: "2025-08-24",
  categories: ["Elasticsearch", "Deployment", "Strategy", "Decision-Matrix"],
  searchCategories: ["Deployment Guide", "Elasticsearch", "Database Management"],
  coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  coverImageCredit: "Photo by ThisisEngineering RAEng on Unsplash"
}; 