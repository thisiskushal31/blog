import { BlogPost } from '../index';
import content from '../markdown/redis_deployment_guide_0_hub.md?raw';

export const blogPost: BlogPost = {
  slug: "redis-deployment-guide",
  title: "The Complete Redis Mastery Series",
  subtitle: "Your comprehensive guide from development to production-scale in-memory data infrastructure",
  excerpt: "Complete guide to Redis deployment strategies, optimization, and operations. Master Redis from local development to production-scale infrastructure with hands-on examples and battle-tested configurations.",
  content,
  publishDate: "2025-01-15",
  categories: ["Redis", "Caching", "Series"],
  searchCategories: ["Redis", "Caching", "NoSQL", "Databases", "Series"],
  featured: false,
  coverImage: "/blog/blogImages/redis-series.png",
};

