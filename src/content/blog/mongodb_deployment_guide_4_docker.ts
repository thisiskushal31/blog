import { BlogPost } from '../index';
import content from '../markdown/mongodb_deployment_guide_4_docker.md?raw';

export const blogPost: BlogPost = {
  slug: "mongodb-docker-container-deployment-strategies",
  title: "Docker MongoDB - Container Deployment Strategies",
  subtitle: "Deploy production-ready MongoDB using Docker with focus on consistency and operational simplicity",
  excerpt: "Complete guide to MongoDB containerization with Docker. Learn Docker Compose production configurations, data persistence strategies, security best practices, and multi-node setups.",
  content,
  publishDate: "2025-01-31",
  categories: ["MongoDB", "Docker", "Containers"],
  searchCategories: ["MongoDB", "Databases", "Docker", "Containers", "Docker Compose", "Containerization"],
  coverImage: "/blog/blogImages/mongodb-deployment-guide.png",
};

