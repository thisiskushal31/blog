import { BlogPost } from '../index';
import content from '../markdown/mysql_0_hub.md?raw';

export const blogPost: BlogPost = {
  slug: "mysql-mastery-series",
  title: "The Complete MySQL Mastery Series",
  subtitle: "Your comprehensive guide from development to production-scale relational database infrastructure",
  excerpt: "Complete guide to MySQL deployment strategies, optimization, and operations. Master MySQL from local development to production-scale infrastructure with hands-on examples and battle-tested configurations.",
  content,
  publishDate: "2025-01-15",
  categories: ["MySQL", "Databases", "Series"],
  searchCategories: ["MySQL", "Databases", "SQL", "Database Management", "Series"],
  featured: false,
  coverImage: "/blog/blogImages/mysql-series.png",
};

