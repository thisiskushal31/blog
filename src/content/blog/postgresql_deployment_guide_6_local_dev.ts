import { BlogPost } from '../index';
import content from '../markdown/postgresql_deployment_guide_6_local_dev.md?raw';

export const blogPost: BlogPost = {
  slug: "postgresql-local-development-docker-native-quick-start",
  title: "PostgreSQL Local Development - Docker vs Native Quick Start",
  subtitle: "Optimize your development environment for maximum productivity and seamless production parity",
  excerpt: "Complete guide to PostgreSQL local development setup. Compare Docker vs native installation, IDE integration, local replication setup, and development-to-production parity strategies.",
  content,
  publishDate: "2025-01-25",
  categories: ["PostgreSQL", "Development", "Local Setup"],
  searchCategories: ["PostgreSQL", "Databases", "Development", "Local", "Docker", "IDE"],
  coverImage: "/blog/blogImages/postgresql-dev.png",
};

