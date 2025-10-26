// blogPosts.config.ts
// Blog post configuration file - maps slugs to blog post imports
// Add new blog posts here following the existing pattern

import { BlogPost } from '../content/index';

// ===== BLOG POST IMPORTS =====
// Import all blog post modules here
// import { blogPost as comprehensiveFeaturesShowcase } from '../content/blog/comprehensive-features-showcase';

// AI Security
import { blogPost as ai_shift_left_security } from '../content/blog/ai-shift-left-security';
import { blogPost as ai_shift_left_security_part1 } from '../content/blog/ai-shift-left-security-part1';
import { blogPost as ai_shift_left_security_part2 } from '../content/blog/ai-shift-left-security-part2';
import { blogPost as ai_shift_left_security_part3 } from '../content/blog/ai-shift-left-security-part3';

// Elasticsearch Deployment Guide
import { blogPost as es_deployment_guide_0_elasticsearch_hub } from '../content/blog/es_deployment_guide_0_elasticsearch_hub';
import { blogPost as es_deployment_guide_1_elastic_cloud_vs_self_managed } from '../content/blog/es_deployment_guide_1_elastic_cloud_vs_self_managed';
import { blogPost as es_deployment_guide_2_elastic_cloud_deep_dive } from '../content/blog/es_deployment_guide_2_elastic_cloud_deep_dive';
import { blogPost as es_deployment_guide_3_self_managed_infrastructure } from '../content/blog/es_deployment_guide_3_self_managed_infrastructure';
import { blogPost as es_deployment_guide_4_docker_elasticsearch } from '../content/blog/es_deployment_guide_4_docker_elasticsearch';
import { blogPost as es_deployment_guide_5_kubernetes_elasticsearch } from '../content/blog/es_deployment_guide_5_kubernetes_elasticsearch';
import { blogPost as es_deployment_guide_6_local_development } from '../content/blog/es_deployment_guide_6_local_development';
import { blogPost as es_deployment_guide_7_decision_matrix } from '../content/blog/es_deployment_guide_7_decision_matrix';

// Containerization

// ===== BLOG POST SLUGS =====
// Array of all blog post slugs for routing and navigation
export const BLOG_POST_SLUGS = [
  // 'comprehensive-features-showcase',

  // AI Security
  'ai-shift-left-security',
  'ai-shift-left-security-part1',
  'ai-shift-left-security-part2',
  'ai-shift-left-security-part3',

  // Elasticsearch Deployment Guide
  'elasticsearch-deployment-guide',
  'elastic-cloud-vs-self-managed-strategic-decision-framework',
  'elastic-cloud-deep-dive-hosted-vs-serverless-architecture',
  'self-managed-elasticsearch-vm-bare-metal-production-guide',
  'docker-elasticsearch-container-deployment-strategies',
  'kubernetes-elasticsearch-eck-helm-raw-yaml-deep-dive',
  'elasticsearch-local-development-docker-packages-quick-start',
  'elasticsearch-deployment-decision-matrix-complete-comparison-guide',

  // Containerization

  // Add new post slugs here (must match the .ts file in ./blog/)
];

// ===== BLOG POST MAP =====
// Maps slugs to their corresponding blog post data
export const POST_MAP: Record<string, BlogPost> = {
  // 'comprehensive-features-showcase': comprehensiveFeaturesShowcase,

  // AI Security
  'ai-shift-left-security': ai_shift_left_security,
  'ai-shift-left-security-part1': ai_shift_left_security_part1,
  'ai-shift-left-security-part2': ai_shift_left_security_part2,
  'ai-shift-left-security-part3': ai_shift_left_security_part3,

  // Elasticsearch Deployment Guide
  'elasticsearch-deployment-guide': es_deployment_guide_0_elasticsearch_hub,
  'elastic-cloud-vs-self-managed-strategic-decision-framework': es_deployment_guide_1_elastic_cloud_vs_self_managed,
  'elastic-cloud-deep-dive-hosted-vs-serverless-architecture': es_deployment_guide_2_elastic_cloud_deep_dive,
  'self-managed-elasticsearch-vm-bare-metal-production-guide': es_deployment_guide_3_self_managed_infrastructure,
  'docker-elasticsearch-container-deployment-strategies': es_deployment_guide_4_docker_elasticsearch,
  'kubernetes-elasticsearch-eck-helm-raw-yaml-deep-dive': es_deployment_guide_5_kubernetes_elasticsearch,
  'elasticsearch-local-development-docker-packages-quick-start': es_deployment_guide_6_local_development,
  'elasticsearch-deployment-decision-matrix-complete-comparison-guide': es_deployment_guide_7_decision_matrix,

  // Containerization
  
  // Add new slug: import pairs here
}; 