import { BlogPost } from '../index';
import content from '../markdown/aerospike_deployment_guide_7_performance.md?raw';

export const blogPost: BlogPost = {
  slug: "aerospike-performance-optimization-hma-clustering",
  title: "Aerospike Performance Optimization - HMA & Clustering",
  subtitle: "Master Aerospike performance optimization to reduce costs and improve application responsiveness",
  excerpt: "Complete guide to Aerospike performance optimization. Learn HMA optimization, clustering strategies, configuration tuning, monitoring, and cost optimization to improve performance by 10-100x.",
  content,
  publishDate: "2025-02-19",
  categories: ["Aerospike", "Performance", "Optimization"],
  searchCategories: ["Aerospike", "Databases", "Performance", "Optimization", "HMA", "Clustering"],
  coverImage: "/blog/blogImages/aerospike-performance.png",
};

