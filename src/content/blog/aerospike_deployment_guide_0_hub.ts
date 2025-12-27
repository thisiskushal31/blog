import { BlogPost } from '../index';
import content from '../markdown/aerospike_deployment_guide_0_hub.md?raw';

export const blogPost: BlogPost = {
  slug: "aerospike-deployment-guide",
  title: "The Complete Aerospike Mastery Series",
  subtitle: "Your comprehensive guide from development to production-scale high-performance key-value infrastructure",
  excerpt: "Complete guide to Aerospike deployment strategies, optimization, and operations. Master Aerospike from local development to production-scale infrastructure with hands-on examples and battle-tested configurations.",
  content,
  publishDate: "2025-01-15",
  categories: ["Aerospike", "NoSQL", "Series"],
  searchCategories: ["Aerospike", "NoSQL", "Databases", "Performance", "Series"],
  featured: false,
  coverImage: "/blog/blogImages/aerospike-deployment-guide.png",
};

