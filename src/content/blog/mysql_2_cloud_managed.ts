import { BlogPost } from '../index';
import content from '../markdown/mysql_2_cloud_managed.md?raw';

export const blogPost: BlogPost = {
  slug: "mysql-cloud-managed-rds-cloud-sql-azure-deep-dive",
  title: "Blog 2: Cloud-Managed MySQL Deep Dive - RDS, Cloud SQL, Azure Database",
  subtitle: "Comprehensive analysis of cloud-managed MySQL offerings with implementation details",
  excerpt: "Complete guide to cloud-managed MySQL services covering AWS RDS, Google Cloud SQL, and Azure Database for MySQL. Includes configuration examples, performance optimization, cost analysis, and migration strategies with official documentation references.",
  content,
  publishDate: "2025-01-15",
  categories: ["MySQL", "Cloud", "Managed Services"],
  searchCategories: ["MySQL", "AWS RDS", "Cloud SQL", "Azure", "Cloud", "Managed Services"],
  coverImage: "/blog/blogImages/mysql-cloud-managed.png",
};

