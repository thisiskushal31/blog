import { BlogPost } from '../blogPostIndex';
import content from './markdown/es_deployment_guide_6_local_development.md?raw';

export const blogPost: BlogPost = {
  slug: "elasticsearch-local-development-docker-packages-quick-start",
  title: "Elasticsearch Local Development - Docker, Packages, and Quick Start",
  subtitle: "Set up Elasticsearch locally for development and testing with multiple approaches",
  excerpt: "Complete guide to local Elasticsearch development including Docker containers, package installations, and quick start configurations for developers.",
  content,
  publishDate: "2025-08-24",
  categories: ["Elasticsearch", "Deployment", "Local-Development", "Docker", "Quick-Start"],
  searchCategories: ["Deployment Guide", "Elasticsearch", "Database Management"],
  coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  coverImageCredit: "Photo by ThisisEngineering RAEng on Unsplash"
}; 