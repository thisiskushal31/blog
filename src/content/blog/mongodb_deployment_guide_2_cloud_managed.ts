import { BlogPost } from '../index';
import content from '../markdown/mongodb_deployment_guide_2_cloud_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "mongodb-cloud-managed-atlas-deep-dive",
  title: "MongoDB Atlas Deep Dive - Managed Cloud Service",
  subtitle: "Comprehensive analysis of MongoDB Atlas with business-focused feature and pricing comparisons",
  excerpt: "Complete guide to MongoDB Atlas managed service. Learn cluster configuration, pricing tiers, serverless architecture, global clusters, and cost optimization strategies.",
  content,
  publishDate: "2025-01-29",
  categories: ["MongoDB", "Cloud", "Managed Services"],
  searchCategories: ["MongoDB", "Databases", "Cloud", "MongoDB Atlas", "Managed Services"],
  coverImage: "/blog/blogImages/mongodb-cloud.png",
};

