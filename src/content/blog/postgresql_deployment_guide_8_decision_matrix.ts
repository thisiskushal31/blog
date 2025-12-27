import { BlogPost } from '../index';
import content from '../markdown/postgresql_deployment_guide_8_decision_matrix.md?raw';

export const blogPost: BlogPost = {
  slug: "postgresql-deployment-decision-matrix-complete-comparison-guide",
  title: "PostgreSQL Deployment Decision Matrix - Complete Comparison Guide",
  subtitle: "The definitive quantitative framework for choosing the right PostgreSQL deployment strategy",
  excerpt: "Complete decision framework for PostgreSQL deployment strategies. Quantitative scoring matrix, ROI calculations, real-world case studies, and migration strategies to make data-driven decisions.",
  content,
  publishDate: "2025-01-27",
  categories: ["PostgreSQL", "Decision Framework", "Strategy"],
  searchCategories: ["PostgreSQL", "Databases", "Decision Matrix", "Strategy", "ROI", "Comparison"],
  coverImage: "/blog/blogImages/postgresql-deployment-guide.png",
};

