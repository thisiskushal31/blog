import { BlogPost } from '../index';
import content from '../markdown/redis_deployment_guide_2_cloud_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "redis-cloud-managed-elasticache-memorystore-deep-dive",
  title: "Cloud-Managed Redis Deep Dive - ElastiCache, Memorystore, Azure Cache",
  subtitle: "Comprehensive analysis of cloud-managed Redis offerings with business-focused comparisons",
  excerpt: "Complete guide to cloud-managed Redis services (AWS ElastiCache, Google Memorystore, Azure Cache). Feature comparison, pricing analysis, and decision framework to choose the optimal managed service.",
  content,
  publishDate: "2025-02-06",
  categories: ["Redis", "Cloud", "Managed Services"],
  searchCategories: ["Redis", "Databases", "Cloud", "ElastiCache", "Memorystore", "Azure Cache", "Managed Services"],
  coverImage: "/blog/blogImages/redis-deployment-guide.png",
};

