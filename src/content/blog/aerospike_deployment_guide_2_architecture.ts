import { BlogPost } from '../index';
import content from '../markdown/aerospike_deployment_guide_2_architecture.md?raw';

export const blogPost: BlogPost = {
  slug: "aerospike-architecture-deep-dive-hybrid-memory",
  title: "Aerospike Architecture Deep Dive - Hybrid Memory Architecture",
  subtitle: "Comprehensive analysis of Aerospike's unique architecture with business-focused insights",
  excerpt: "Complete guide to Aerospike architecture and Hybrid Memory Architecture (HMA). Learn how HMA provides sub-millisecond latency with cost-effective storage, clustering, and performance optimization.",
  content,
  publishDate: "2025-02-14",
  categories: ["Aerospike", "Architecture", "Performance"],
  searchCategories: ["Aerospike", "Databases", "Architecture", "HMA", "Hybrid Memory", "Performance"],
  coverImage: "/blog/blogImages/aerospike-deployment-guide.png",
};

