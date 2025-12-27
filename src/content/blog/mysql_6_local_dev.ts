import { BlogPost } from '../index';
import content from '../markdown/mysql_6_local_dev.md?raw';

export const blogPost: BlogPost = {
  slug: "mysql-local-development-docker-native-quick-start",
  title: "Blog 6: Local Development - Docker vs Native Installation",
  subtitle: "Optimize your development environment for maximum productivity",
  excerpt: "Complete guide to MySQL local development setup covering Docker vs native installation, IDE integration, local replication setup, and development-to-production parity strategies. Includes performance comparisons and best practices.",
  content,
  publishDate: "2025-01-15",
  categories: ["MySQL", "Development", "Local Setup"],
  searchCategories: ["MySQL", "Development", "Docker", "Local Setup", "IDE"],
  coverImage: "/blog/blogImages/mysql-local-dev.png",
};

