import { BlogPost } from '../index';
import content from '../markdown/mysql_1_cloud_vs_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "mysql-cloud-vs-self-managed-strategic-decision-framework",
  title: "Blog 1: Cloud-Managed vs Self-Managed MySQL - Strategic Decision Framework",
  subtitle: "Master the fundamental decision between managed services and self-managed infrastructure",
  excerpt: "Strategic framework for choosing between cloud-managed and self-managed MySQL. Complete TCO analysis, risk assessment, performance comparison, and decision framework to make the right choice for your organization.",
  content,
  publishDate: "2025-01-15",
  categories: ["MySQL", "Strategy", "Decision Framework"],
  searchCategories: ["MySQL", "Databases", "Cloud", "Strategy", "Decision Framework"],
  coverImage: "/blog/blogImages/mysql-decision.png",
};

