import { BlogPost } from '../index';
import content from '../markdown/redis_deployment_guide_8_decision_matrix.md?raw';

export const blogPost: BlogPost = {
  slug: "redis-deployment-decision-matrix-complete-comparison-guide",
  title: "Redis Deployment Decision Matrix - Complete Comparison Guide",
  subtitle: "The definitive quantitative framework for choosing the right Redis deployment strategy",
  excerpt: "Complete decision framework for Redis deployment strategies. Quantitative scoring matrix, ROI calculations, real-world case studies, and migration strategies to make data-driven decisions.",
  content,
  publishDate: "2025-02-12",
  categories: ["Redis", "Decision Framework", "Strategy"],
  searchCategories: ["Redis", "Databases", "Decision Matrix", "Strategy", "ROI", "Comparison"],
  coverImage: "/blog/blogImages/redis-decision-matrix.png",
};

