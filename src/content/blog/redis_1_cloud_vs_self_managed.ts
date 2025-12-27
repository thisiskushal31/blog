import { BlogPost } from '../index';
import content from '../markdown/redis_1_cloud_vs_self_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "redis-cloud-vs-self-managed-strategic-decision-framework",
  title: "Blog 1: Cloud-Managed vs Self-Managed Redis - Strategic Decision Framework",
  subtitle: "Master the fundamental decision between managed services and self-managed infrastructure with business-focused analysis",
  excerpt: "Strategic framework for choosing between cloud-managed and self-managed Redis. Complete TCO analysis, risk assessment, performance comparison, and decision framework to make the right choice for your organization.",
  content,
  publishDate: "2025-02-05",
  categories: ["Redis", "Strategy", "Decision Framework"],
  searchCategories: ["Redis", "Databases", "Cloud", "Strategy", "Decision Framework", "TCO", "Cost Analysis"],
  coverImage: "/blog/blogImages/redis-decision.png",
};

