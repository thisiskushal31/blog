import { BlogPost } from '../blogPostIndex';
import content from './markdown/es_deployment_guide_4_docker_elasticsearch.md?raw';

export const blogPost: BlogPost = {
  slug: "docker-elasticsearch-container-deployment-strategies",
  title: "Docker Elasticsearch - Container Deployment Strategies",
  subtitle: "Master Elasticsearch deployment within Docker containers for development and production",
  excerpt: "Comprehensive guide to deploying Elasticsearch with Docker including multi-node setups, Docker Compose configurations, production considerations, and best practices.",
  content,
  publishDate: "2025-08-24",
  categories: ["Docker", "Containers"],
  searchCategories: ["Deployment Guide", "Elasticsearch", "Database Management"],
  coverImage: "/blog/blogImages/elasticsearch-deployment-guide.png",
  // coverImageCredit: "Photo by ThisisEngineering RAEng on Unsplash"
}; 