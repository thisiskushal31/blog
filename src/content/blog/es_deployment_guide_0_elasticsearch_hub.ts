import { BlogPost } from '../blogPostIndex';
import content from './markdown/es_deployment_guide_0_elasticsearch_hub.md?raw';

export const blogPost: BlogPost = {
  slug: "elasticsearch-deployment-guide",
  title: "Elasticsearch Deployment Guide",
  subtitle: "Your comprehensive guide from development to production-scale search infrastructure",
  excerpt: "Master Elasticsearch deployment with our comprehensive 8-part series covering everything from local development to production-scale infrastructure decisions.",
  content,
  publishDate: "2025-08-24",
  categories: ["Elasticsearch Overview"],
  searchCategories: ["Deployment Guide", "Elasticsearch", "Database Management"],
  featured: true,
  coverImage: "/blog/blogImages/elasticsearch-deployment-guide.png",
  // coverImageCredit: "Photo by ThisisEngineering RAEng on Unsplash"
}; 