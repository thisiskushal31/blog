import { BlogPost } from '../index';
import content from '../markdown/mongodb_7_performance.md?raw';

export const blogPost: BlogPost = {
  slug: "mongodb-performance-optimization-query-tuning-indexing",
  title: "Blog 7: MongoDB Performance Optimization - Query Tuning & Indexing",
  subtitle: "Master MongoDB performance optimization to reduce costs and improve application responsiveness",
  excerpt: "Complete guide to MongoDB performance optimization. Learn query optimization, indexing strategies, configuration tuning, connection pooling, and monitoring to improve performance by 10-100x.",
  content,
  publishDate: "2025-02-03",
  categories: ["MongoDB", "Performance", "Optimization"],
  searchCategories: ["MongoDB", "Databases", "Performance", "Optimization", "Query Tuning", "Indexing"],
  coverImage: "/blog/blogImages/mongodb-performance.png",
};

