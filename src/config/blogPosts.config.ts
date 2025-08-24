import { BlogPost } from '../content/blogPostIndex';

// Static imports for all posts (add new imports here)
// import { blogPost as comprehensiveFeaturesShowcase } from '../content/blog/comprehensive-features-showcase';

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

// Add new imports above

export const BLOG_POST_SLUGS = [
  // 'comprehensive-features-showcase',
  'elasticsearch-deployment-guide',
  'elastic-cloud-vs-self-managed-strategic-decision-framework',
  'elastic-cloud-deep-dive-hosted-vs-serverless-architecture',
  'self-managed-elasticsearch-vm-bare-metal-production-guide',
  'docker-elasticsearch-container-deployment-strategies',
  'kubernetes-elasticsearch-eck-helm-raw-yaml-deep-dive',
  'elasticsearch-local-development-docker-packages-quick-start',
  'elasticsearch-deployment-decision-matrix-complete-comparison-guide',
  // Add new post slugs here (must match the .ts file in ./blog/)
];

export const POST_MAP: Record<string, BlogPost> = {
  // 'comprehensive-features-showcase': comprehensiveFeaturesShowcase,
  'elasticsearch-deployment-guide': es_deployment_guide_0_elasticsearch_hub,
  'elastic-cloud-vs-self-managed-strategic-decision-framework': es_deployment_guide_1_elastic_cloud_vs_self_managed,
  'elastic-cloud-deep-dive-hosted-vs-serverless-architecture': es_deployment_guide_2_elastic_cloud_deep_dive,
  'self-managed-elasticsearch-vm-bare-metal-production-guide': es_deployment_guide_3_self_managed_infrastructure,
  'docker-elasticsearch-container-deployment-strategies': es_deployment_guide_4_docker_elasticsearch,
  'kubernetes-elasticsearch-eck-helm-raw-yaml-deep-dive': es_deployment_guide_5_kubernetes_elasticsearch,
  'elasticsearch-local-development-docker-packages-quick-start': es_deployment_guide_6_local_development,
  'elasticsearch-deployment-decision-matrix-complete-comparison-guide': es_deployment_guide_7_decision_matrix,
  // Add new slug: import pairs here
}; 