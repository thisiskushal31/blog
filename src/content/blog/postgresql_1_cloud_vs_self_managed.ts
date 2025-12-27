import { BlogPost } from '../index';
import content from '../markdown/postgresql_1_cloud_vs_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "postgresql-cloud-vs-self-managed-strategic-decision-framework",
  title: "Blog 1: Cloud-Managed vs Self-Managed PostgreSQL - Strategic Decision Framework",
  subtitle: "Master the fundamental decision between managed services and self-managed infrastructure with business-focused analysis",
  excerpt: "Strategic framework for choosing between cloud-managed and self-managed PostgreSQL. Complete TCO analysis, risk assessment, performance comparison, and decision framework to make the right choice for your organization.",
  content,
  publishDate: "2025-01-20",
  categories: ["PostgreSQL", "Strategy", "Decision Framework"],
  searchCategories: ["PostgreSQL", "Databases", "Cloud", "Strategy", "Decision Framework", "TCO", "Cost Analysis"],
  coverImage: "/blog/blogImages/postgresql-decision.png",
};

