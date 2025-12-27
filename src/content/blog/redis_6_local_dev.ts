import { BlogPost } from '../index';
import content from '../markdown/redis_6_local_dev.md?raw';

export const blogPost: BlogPost = {
  slug: "redis-local-development-docker-native-quick-start",
  title: "Blog 6: Redis Local Development - Docker vs Native Quick Start",
  subtitle: "Optimize your development environment for maximum productivity and seamless production parity",
  excerpt: "Complete guide to Redis local development setup. Compare Docker vs native installation, IDE integration, local cluster setup, and development-to-production parity strategies.",
  content,
  publishDate: "2025-02-10",
  categories: ["Redis", "Development", "Local Setup"],
  searchCategories: ["Redis", "Databases", "Development", "Local", "Docker", "IDE"],
  coverImage: "/blog/blogImages/redis-dev.png",
};

