import { BlogPost } from '../blogPostIndex';
import content from './markdown/es_deployment_guide_5_kubernetes_elasticsearch.md?raw';

export const blogPost: BlogPost = {
  slug: "kubernetes-elasticsearch-eck-helm-raw-yaml-deep-dive",
  title: "Kubernetes Elasticsearch - ECK, Helm, and Raw YAML Deep Dive",
  subtitle: "Advanced Kubernetes deployment strategies for Elasticsearch clusters",
  excerpt: "Master Elasticsearch on Kubernetes with ECK operator, Helm charts, and raw YAML StatefulSet configurations for production-scale deployments.",
  content,
  publishDate: "2025-08-24",
  categories: ["Kubernetes", "ECK", "Helm"],
  searchCategories: ["Deployment Guide", "Elasticsearch", "Database Management"],
  coverImage: "/blog/blogImages/elasticsearch-deployment-guide.png",
  // coverImageCredit: "Photo by ThisisEngineering RAEng on Unsplash"
}; 