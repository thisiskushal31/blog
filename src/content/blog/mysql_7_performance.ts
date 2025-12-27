import { BlogPost } from '../index';
import content from '../markdown/mysql_7_performance.md?raw';

export const blogPost: BlogPost = {
  slug: "mysql-performance-optimization-query-tuning-indexing",
  title: "Blog 7: MySQL Performance Optimization - Query Tuning and Indexing",
  subtitle: "Master MySQL performance optimization with advanced tuning techniques",
  excerpt: "Complete guide to MySQL performance optimization covering EXPLAIN analysis, indexing strategies, configuration tuning, Performance Schema, slow query analysis, and monitoring tools. Includes official MySQL documentation references.",
  content,
  publishDate: "2025-01-15",
  categories: ["MySQL", "Performance", "Optimization"],
  searchCategories: ["MySQL", "Performance", "Optimization", "Indexing", "Query Tuning"],
  coverImage: "/blog/blogImages/mysql-performance.png",
};

