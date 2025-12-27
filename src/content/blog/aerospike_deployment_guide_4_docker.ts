import { BlogPost } from '../index';
import content from '../markdown/aerospike_deployment_guide_4_docker.md?raw';

export const blogPost: BlogPost = {
  slug: "aerospike-docker-container-deployment-strategies",
  title: "Docker Aerospike - Container Deployment Strategies",
  subtitle: "Deploy production-ready Aerospike using Docker with focus on consistency and operational simplicity",
  excerpt: "Complete guide to Aerospike containerization with Docker. Learn Docker Compose production configurations, HMA configuration, data persistence strategies, and security best practices.",
  content,
  publishDate: "2025-02-16",
  categories: ["Aerospike", "Docker", "Containers"],
  searchCategories: ["Aerospike", "Databases", "Docker", "Containers", "Docker Compose", "Containerization"],
  coverImage: "/blog/blogImages/aerospike-docker.png",
};

