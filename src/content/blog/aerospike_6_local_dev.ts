import { BlogPost } from '../index';
import content from '../markdown/aerospike_6_local_dev.md?raw';

export const blogPost: BlogPost = {
  slug: "aerospike-local-development-docker-native-quick-start",
  title: "Blog 6: Aerospike Local Development - Docker vs Native Quick Start",
  subtitle: "Optimize your development environment for maximum productivity and seamless production parity",
  excerpt: "Complete guide to Aerospike local development setup. Compare Docker vs native installation, IDE integration, local cluster setup, and development-to-production parity strategies.",
  content,
  publishDate: "2025-02-18",
  categories: ["Aerospike", "Development", "Local Setup"],
  searchCategories: ["Aerospike", "Databases", "Development", "Local", "Docker", "IDE"],
  coverImage: "/blog/blogImages/aerospike-dev.png",
};

