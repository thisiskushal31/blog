import { BlogPost } from '../index';
import content from '../markdown/postgresql_deployment_guide_2_cloud_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "postgresql-cloud-managed-rds-cloud-sql-azure-deep-dive",
  title: "Cloud-Managed PostgreSQL Deep Dive - RDS, Cloud SQL, Azure Database",
  subtitle: "Comprehensive analysis of cloud-managed PostgreSQL offerings with business-focused comparisons",
  excerpt: "Complete guide to cloud-managed PostgreSQL services (AWS RDS, Google Cloud SQL, Azure Database). Feature comparison, pricing analysis, and decision framework to choose the optimal managed service.",
  content,
  publishDate: "2025-01-21",
  categories: ["PostgreSQL", "Cloud", "Managed Services"],
  searchCategories: ["PostgreSQL", "Databases", "Cloud", "AWS RDS", "Cloud SQL", "Azure Database", "Managed Services"],
  coverImage: "/blog/blogImages/postgresql-cloud.png",
};

