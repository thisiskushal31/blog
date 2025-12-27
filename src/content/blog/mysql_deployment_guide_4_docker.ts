import { BlogPost } from '../index';
import content from '../markdown/mysql_deployment_guide_4_docker.md?raw';

export const blogPost: BlogPost = {
  slug: "mysql-docker-container-deployment-strategies",
  title: "Containerized MySQL - Docker Production Strategies",
  subtitle: "Deploy production-ready MySQL using Docker with advanced patterns",
  excerpt: "Complete guide to MySQL containerization with Docker covering Docker Compose production configurations, persistent volumes, security, multi-node setups, and Docker Swarm orchestration. Includes official Docker and MySQL documentation references.",
  content,
  publishDate: "2025-01-15",
  categories: ["MySQL", "Docker", "Containers"],
  searchCategories: ["MySQL", "Docker", "Containers", "DevOps", "Production"],
  coverImage: "/blog/blogImages/mysql-deployment-guide.png",
};

