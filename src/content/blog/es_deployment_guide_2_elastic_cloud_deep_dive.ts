import { BlogPost } from '../blogPostIndex';
import content from './markdown/es_deployment_guide_2_elastic_cloud_deep_dive.md?raw';

export const blogPost: BlogPost = {
  slug: "elastic-cloud-deep-dive-hosted-vs-serverless-architecture",
  title: "Elastic Cloud Deep Dive - Hosted vs Serverless Architecture",
  subtitle: "Comprehensive analysis of Elastic's cloud offerings with implementation details",
  excerpt: "Deep dive into Elastic Cloud Hosted and Serverless solutions with performance testing, cost optimization, and advanced features like cross-cluster search.",
  content,
  publishDate: "2025-08-24",
  categories: ["Elasticsearch", "Deployment", "Elastic-Cloud", "Serverless"],
  searchCategories: ["Deployment Guide", "Elasticsearch", "Database Management"],
  coverImage: "/blog/blogImages/elasticsearch-deployment-guide.png",
  // coverImageCredit: "Photo by ThisisEngineering RAEng on Unsplash"
}; 