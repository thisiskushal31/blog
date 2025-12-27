import { BlogPost } from '../index';
import content from '../markdown/redis_deployment_guide_4_docker.md?raw';

export const blogPost: BlogPost = {
  slug: "redis-docker-container-deployment-strategies",
  title: "Docker Redis - Container Deployment Strategies",
  subtitle: "Deploy production-ready Redis using Docker with focus on consistency and operational simplicity",
  excerpt: "Complete guide to Redis containerization with Docker. Learn Docker Compose production configurations, data persistence strategies, security best practices, and multi-node setups.",
  content,
  publishDate: "2025-02-08",
  categories: ["Redis", "Docker", "Containers"],
  searchCategories: ["Redis", "Databases", "Docker", "Containers", "Docker Compose", "Containerization"],
  coverImage: "/blog/blogImages/redis-deployment-guide.png",
};

