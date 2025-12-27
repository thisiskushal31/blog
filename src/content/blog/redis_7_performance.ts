import { BlogPost } from '../index';
import content from '../markdown/redis_7_performance.md?raw';

export const blogPost: BlogPost = {
  slug: "redis-performance-optimization-memory-management",
  title: "Blog 7: Redis Performance Optimization - Memory Management and Data Structures",
  subtitle: "Master Redis performance optimization to reduce costs and improve application responsiveness",
  excerpt: "Complete guide to Redis performance optimization. Learn memory management, data structure selection, configuration tuning, connection pooling, and monitoring to improve performance by 10-100x.",
  content,
  publishDate: "2025-02-11",
  categories: ["Redis", "Performance", "Optimization"],
  searchCategories: ["Redis", "Databases", "Performance", "Optimization", "Memory Management", "Data Structures"],
  coverImage: "/blog/blogImages/redis-performance.png",
};

