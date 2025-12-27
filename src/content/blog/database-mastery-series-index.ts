import { BlogPost } from '../index';
import content from '../markdown/database-mastery-series-index.md?raw';

export const blogPost: BlogPost = {
  slug: "database-mastery-series-index",
  title: "The Complete Database Mastery Series Collection",
  subtitle: "Your one-stop guide to mastering database deployment strategies across all major database systems",
  excerpt: "Master index linking to all database mastery series: MySQL, PostgreSQL, MongoDB, Redis, Aerospike, and Elasticsearch. Strategic decision frameworks, deployment guides, and optimization strategies for every major database system.",
  content,
  publishDate: "2025-01-27",
  categories: ["Databases", "Index", "Mastery Series"],
  searchCategories: ["Databases", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Aerospike", "Elasticsearch", "Index", "Mastery Series"],
  featured: true,
  coverImage: "/blog/blogImages/database-mastery-index.png",
};

