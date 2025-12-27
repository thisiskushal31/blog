import { BlogPost } from '../index';
import content from '../markdown/mongodb_deployment_guide_0_hub.md?raw';

export const blogPost: BlogPost = {
  slug: "mongodb-deployment-guide",
  title: "The Complete MongoDB Mastery Series",
  subtitle: "Your comprehensive guide from development to production-scale document database infrastructure",
  excerpt: "Complete guide to MongoDB deployment strategies, optimization, and operations. Master MongoDB from local development to production-scale infrastructure with hands-on examples and battle-tested configurations.",
  content,
  publishDate: "2025-01-15",
  categories: ["MongoDB", "NoSQL", "Series"],
  searchCategories: ["MongoDB", "NoSQL", "Databases", "Database Management", "Series"],
  featured: false,
  coverImage: "/blog/blogImages/mongodb-deployment-guide.png",
};

