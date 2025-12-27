import { BlogPost } from '../index';
import content from '../markdown/postgresql_4_docker.md?raw';

export const blogPost: BlogPost = {
  slug: "postgresql-docker-container-deployment-strategies",
  title: "Blog 4: Docker PostgreSQL - Container Deployment Strategies",
  subtitle: "Deploy production-ready PostgreSQL using Docker with focus on consistency and operational simplicity",
  excerpt: "Complete guide to PostgreSQL containerization with Docker. Learn Docker Compose production configurations, data persistence strategies, security best practices, and multi-node setups.",
  content,
  publishDate: "2025-01-23",
  categories: ["PostgreSQL", "Docker", "Containers"],
  searchCategories: ["PostgreSQL", "Databases", "Docker", "Containers", "Docker Compose", "Containerization"],
  coverImage: "/blog/blogImages/postgresql-docker.png",
};

