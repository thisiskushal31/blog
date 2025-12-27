import { BlogPost } from '../index';
import content from '../markdown/postgresql_deployment_guide_7_performance.md?raw';

export const blogPost: BlogPost = {
  slug: "postgresql-performance-optimization-query-tuning-indexing",
  title: "PostgreSQL Performance Optimization - Query Tuning & Indexing",
  subtitle: "Master PostgreSQL performance optimization to reduce costs and improve application responsiveness",
  excerpt: "Complete guide to PostgreSQL performance optimization. Learn query optimization, indexing strategies, configuration tuning, connection pooling, and monitoring to improve performance by 10-100x.",
  content,
  publishDate: "2025-01-26",
  categories: ["PostgreSQL", "Performance", "Optimization"],
  searchCategories: ["PostgreSQL", "Databases", "Performance", "Optimization", "Query Tuning", "Indexing"],
  coverImage: "/blog/blogImages/postgresql-performance.png",
};

