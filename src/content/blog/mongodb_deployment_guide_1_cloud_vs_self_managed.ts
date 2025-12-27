import { BlogPost } from '../index';
import content from '../markdown/mongodb_deployment_guide_1_cloud_vs_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "mongodb-cloud-vs-self-managed-strategic-decision-framework",
  title: "Cloud-Managed vs Self-Managed MongoDB - Strategic Decision Framework",
  subtitle: "Master the fundamental decision between MongoDB Atlas and self-managed infrastructure with business-focused analysis",
  excerpt: "Strategic framework for choosing between MongoDB Atlas and self-managed MongoDB. Complete TCO analysis, risk assessment, performance comparison, and decision framework to make the right choice for your organization.",
  content,
  publishDate: "2025-01-28",
  categories: ["MongoDB", "Strategy", "Decision Framework"],
  searchCategories: ["MongoDB", "Databases", "Cloud", "Strategy", "Decision Framework", "TCO", "Cost Analysis"],
  coverImage: "/blog/blogImages/mongodb-decision.png",
};

