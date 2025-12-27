import { BlogPost } from '../index';
import content from '../markdown/postgresql_0_hub.md?raw';

export const blogPost: BlogPost = {
  slug: "postgresql-mastery-series",
  title: "The Complete PostgreSQL Mastery Series",
  subtitle: "Your strategic guide to choosing and deploying PostgreSQL from development to enterprise-scale infrastructure",
  excerpt: "Strategic guide to PostgreSQL deployment strategies with business-focused decision frameworks. Master TCO analysis, risk assessment, and deployment choices that align with your organization's goals and budget.",
  content,
  publishDate: "2025-01-20",
  categories: ["PostgreSQL", "Databases", "Series", "Strategy"],
  searchCategories: ["PostgreSQL", "Databases", "SQL", "Database Management", "Series", "Strategy", "Decision Framework"],
  featured: false,
  coverImage: "/blog/blogImages/postgresql-series.png",
};

