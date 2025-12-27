import { BlogPost } from '../index';
import content from '../markdown/mongodb_deployment_guide_6_local_dev.md?raw';

export const blogPost: BlogPost = {
  slug: "mongodb-local-development-docker-native-quick-start",
  title: "MongoDB Local Development - Docker vs Native Quick Start",
  subtitle: "Optimize your development environment for maximum productivity and seamless production parity",
  excerpt: "Complete guide to MongoDB local development setup. Compare Docker vs native installation, IDE integration, local replica set setup, and development-to-production parity strategies.",
  content,
  publishDate: "2025-02-02",
  categories: ["MongoDB", "Development", "Local Setup"],
  searchCategories: ["MongoDB", "Databases", "Development", "Local", "Docker", "IDE"],
  coverImage: "/blog/blogImages/mongodb-deployment-guide.png",
};

