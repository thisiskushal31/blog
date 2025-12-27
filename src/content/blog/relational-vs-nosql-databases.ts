import { BlogPost } from '../index';
import content from '../markdown/relational-vs-nosql-databases.md?raw';

export const blogPost: BlogPost = {
  slug: "relational-vs-nosql-databases-complete-guide",
  title: "Relational vs Non-Relational Databases: A Complete Guide",
  subtitle: "Understanding when to use SQL and NoSQL databases for your applications",
  excerpt: "Comprehensive comparison of relational and non-relational databases. Learn when to use SQL vs NoSQL, their advantages and disadvantages, and how to make the right choice for your application.",
  content,
  publishDate: "2025-01-15",
  categories: ["Databases", "Architecture", "Fundamentals"],
  searchCategories: ["Databases", "SQL", "NoSQL", "Architecture", "Database Management"],
  featured: false,
  coverImage: "/blog/blogImages/database-comparison.png",
};

