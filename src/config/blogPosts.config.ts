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

// Databases
import { blogPost as relational_vs_nosql_databases } from '../content/blog/relational-vs-nosql-databases';
import { blogPost as database_mastery_series_index } from '../content/blog/database-mastery-series-index';

// MySQL Mastery Series
import { blogPost as mysql_0_hub } from '../content/blog/mysql_0_hub';
import { blogPost as mysql_1_cloud_vs_self_managed } from '../content/blog/mysql_1_cloud_vs_self_managed';
import { blogPost as mysql_2_cloud_managed } from '../content/blog/mysql_2_cloud_managed';
import { blogPost as mysql_3_self_managed } from '../content/blog/mysql_3_self_managed';
import { blogPost as mysql_4_docker } from '../content/blog/mysql_4_docker';
import { blogPost as mysql_5_kubernetes } from '../content/blog/mysql_5_kubernetes';
import { blogPost as mysql_6_local_dev } from '../content/blog/mysql_6_local_dev';
import { blogPost as mysql_7_performance } from '../content/blog/mysql_7_performance';
import { blogPost as mysql_8_decision_matrix } from '../content/blog/mysql_8_decision_matrix';

// MongoDB Mastery Series
import { blogPost as mongodb_0_hub } from '../content/blog/mongodb_0_hub';
import { blogPost as mongodb_1_cloud_vs_self_managed } from '../content/blog/mongodb_1_cloud_vs_self_managed';
import { blogPost as mongodb_2_cloud_managed } from '../content/blog/mongodb_2_cloud_managed';
import { blogPost as mongodb_3_self_managed } from '../content/blog/mongodb_3_self_managed';
import { blogPost as mongodb_4_docker } from '../content/blog/mongodb_4_docker';
import { blogPost as mongodb_5_kubernetes } from '../content/blog/mongodb_5_kubernetes';
import { blogPost as mongodb_6_local_dev } from '../content/blog/mongodb_6_local_dev';
import { blogPost as mongodb_7_performance } from '../content/blog/mongodb_7_performance';
import { blogPost as mongodb_8_decision_matrix } from '../content/blog/mongodb_8_decision_matrix';

// Redis Mastery Series
import { blogPost as redis_0_hub } from '../content/blog/redis_0_hub';
import { blogPost as redis_1_cloud_vs_self_managed } from '../content/blog/redis_1_cloud_vs_self_managed';
import { blogPost as redis_2_cloud_managed } from '../content/blog/redis_2_cloud_managed';
import { blogPost as redis_3_self_managed } from '../content/blog/redis_3_self_managed';
import { blogPost as redis_4_docker } from '../content/blog/redis_4_docker';
import { blogPost as redis_5_kubernetes } from '../content/blog/redis_5_kubernetes';
import { blogPost as redis_6_local_dev } from '../content/blog/redis_6_local_dev';
import { blogPost as redis_7_performance } from '../content/blog/redis_7_performance';
import { blogPost as redis_8_decision_matrix } from '../content/blog/redis_8_decision_matrix';

// Aerospike Mastery Series
import { blogPost as aerospike_0_hub } from '../content/blog/aerospike_0_hub';
import { blogPost as aerospike_1_cloud_vs_self_managed } from '../content/blog/aerospike_1_cloud_vs_self_managed';
import { blogPost as aerospike_2_architecture } from '../content/blog/aerospike_2_architecture';
import { blogPost as aerospike_3_self_managed } from '../content/blog/aerospike_3_self_managed';
import { blogPost as aerospike_4_docker } from '../content/blog/aerospike_4_docker';
import { blogPost as aerospike_5_kubernetes } from '../content/blog/aerospike_5_kubernetes';
import { blogPost as aerospike_6_local_dev } from '../content/blog/aerospike_6_local_dev';
import { blogPost as aerospike_7_performance } from '../content/blog/aerospike_7_performance';
import { blogPost as aerospike_8_decision_matrix } from '../content/blog/aerospike_8_decision_matrix';

// PostgreSQL Mastery Series
import { blogPost as postgresql_0_hub } from '../content/blog/postgresql_0_hub';
import { blogPost as postgresql_1_cloud_vs_self_managed } from '../content/blog/postgresql_1_cloud_vs_self_managed';
import { blogPost as postgresql_2_cloud_managed } from '../content/blog/postgresql_2_cloud_managed';
import { blogPost as postgresql_3_self_managed } from '../content/blog/postgresql_3_self_managed';
import { blogPost as postgresql_4_docker } from '../content/blog/postgresql_4_docker';
import { blogPost as postgresql_5_kubernetes } from '../content/blog/postgresql_5_kubernetes';
import { blogPost as postgresql_6_local_dev } from '../content/blog/postgresql_6_local_dev';
import { blogPost as postgresql_7_performance } from '../content/blog/postgresql_7_performance';
import { blogPost as postgresql_8_decision_matrix } from '../content/blog/postgresql_8_decision_matrix';

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

  // Databases
  'database-mastery-series-index',
  'relational-vs-nosql-databases-complete-guide',

  // MySQL Mastery Series
  'mysql-mastery-series',
  'mysql-cloud-vs-self-managed-strategic-decision-framework',
  'mysql-cloud-managed-rds-cloud-sql-azure-deep-dive',
  'mysql-self-managed-vm-bare-metal-production-guide',
  'mysql-docker-container-deployment-strategies',
  'mysql-kubernetes-statefulset-operator-deep-dive',
  'mysql-local-development-docker-native-quick-start',
  'mysql-performance-optimization-query-tuning-indexing',
  'mysql-deployment-decision-matrix-complete-comparison-guide',

  // MongoDB Mastery Series
  'mongodb-mastery-series',
  'mongodb-cloud-vs-self-managed-strategic-decision-framework',
  'mongodb-cloud-managed-atlas-deep-dive',
  'mongodb-self-managed-vm-bare-metal-production-guide',
  'mongodb-docker-container-deployment-strategies',
  'mongodb-kubernetes-statefulset-operator-deep-dive',
  'mongodb-local-development-docker-native-quick-start',
  'mongodb-performance-optimization-query-tuning-indexing',
  'mongodb-deployment-decision-matrix-complete-comparison-guide',

  // Redis Mastery Series
  'redis-mastery-series',
  'redis-cloud-vs-self-managed-strategic-decision-framework',
  'redis-cloud-managed-elasticache-memorystore-deep-dive',
  'redis-self-managed-vm-bare-metal-production-guide',
  'redis-docker-container-deployment-strategies',
  'redis-kubernetes-statefulset-operator-deep-dive',
  'redis-local-development-docker-native-quick-start',
  'redis-performance-optimization-memory-management',
  'redis-deployment-decision-matrix-complete-comparison-guide',

  // Aerospike Mastery Series
  'aerospike-mastery-series',
  'aerospike-cloud-vs-self-managed-strategic-decision-framework',
  'aerospike-architecture-deep-dive-hybrid-memory',
  'aerospike-self-managed-vm-bare-metal-production-guide',
  'aerospike-docker-container-deployment-strategies',
  'aerospike-kubernetes-statefulset-deep-dive',
  'aerospike-local-development-docker-native-quick-start',
  'aerospike-performance-optimization-hma-clustering',
  'aerospike-deployment-decision-matrix-complete-comparison-guide',

  // PostgreSQL Mastery Series
  'postgresql-mastery-series',
  'postgresql-cloud-vs-self-managed-strategic-decision-framework',
  'postgresql-cloud-managed-rds-cloud-sql-azure-deep-dive',
  'postgresql-self-managed-vm-bare-metal-production-guide',
  'postgresql-docker-container-deployment-strategies',
  'postgresql-kubernetes-statefulset-operator-deep-dive',
  'postgresql-local-development-docker-native-quick-start',
  'postgresql-performance-optimization-query-tuning-indexing',
  'postgresql-deployment-decision-matrix-complete-comparison-guide',

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

  // Databases
  'database-mastery-series-index': database_mastery_series_index,
  'relational-vs-nosql-databases-complete-guide': relational_vs_nosql_databases,

  // MySQL Mastery Series
  'mysql-mastery-series': mysql_0_hub,
  'mysql-cloud-vs-self-managed-strategic-decision-framework': mysql_1_cloud_vs_self_managed,
  'mysql-cloud-managed-rds-cloud-sql-azure-deep-dive': mysql_2_cloud_managed,
  'mysql-self-managed-vm-bare-metal-production-guide': mysql_3_self_managed,
  'mysql-docker-container-deployment-strategies': mysql_4_docker,
  'mysql-kubernetes-statefulset-operator-deep-dive': mysql_5_kubernetes,
  'mysql-local-development-docker-native-quick-start': mysql_6_local_dev,
  'mysql-performance-optimization-query-tuning-indexing': mysql_7_performance,
  'mysql-deployment-decision-matrix-complete-comparison-guide': mysql_8_decision_matrix,

  // MongoDB Mastery Series
  'mongodb-mastery-series': mongodb_0_hub,
  'mongodb-cloud-vs-self-managed-strategic-decision-framework': mongodb_1_cloud_vs_self_managed,
  'mongodb-cloud-managed-atlas-deep-dive': mongodb_2_cloud_managed,
  'mongodb-self-managed-vm-bare-metal-production-guide': mongodb_3_self_managed,
  'mongodb-docker-container-deployment-strategies': mongodb_4_docker,
  'mongodb-kubernetes-statefulset-operator-deep-dive': mongodb_5_kubernetes,
  'mongodb-local-development-docker-native-quick-start': mongodb_6_local_dev,
  'mongodb-performance-optimization-query-tuning-indexing': mongodb_7_performance,
  'mongodb-deployment-decision-matrix-complete-comparison-guide': mongodb_8_decision_matrix,

  // Redis Mastery Series
  'redis-mastery-series': redis_0_hub,
  'redis-cloud-vs-self-managed-strategic-decision-framework': redis_1_cloud_vs_self_managed,
  'redis-cloud-managed-elasticache-memorystore-deep-dive': redis_2_cloud_managed,
  'redis-self-managed-vm-bare-metal-production-guide': redis_3_self_managed,
  'redis-docker-container-deployment-strategies': redis_4_docker,
  'redis-kubernetes-statefulset-operator-deep-dive': redis_5_kubernetes,
  'redis-local-development-docker-native-quick-start': redis_6_local_dev,
  'redis-performance-optimization-memory-management': redis_7_performance,
  'redis-deployment-decision-matrix-complete-comparison-guide': redis_8_decision_matrix,

  // Aerospike Mastery Series
  'aerospike-mastery-series': aerospike_0_hub,
  'aerospike-cloud-vs-self-managed-strategic-decision-framework': aerospike_1_cloud_vs_self_managed,
  'aerospike-architecture-deep-dive-hybrid-memory': aerospike_2_architecture,
  'aerospike-self-managed-vm-bare-metal-production-guide': aerospike_3_self_managed,
  'aerospike-docker-container-deployment-strategies': aerospike_4_docker,
  'aerospike-kubernetes-statefulset-deep-dive': aerospike_5_kubernetes,
  'aerospike-local-development-docker-native-quick-start': aerospike_6_local_dev,
  'aerospike-performance-optimization-hma-clustering': aerospike_7_performance,
  'aerospike-deployment-decision-matrix-complete-comparison-guide': aerospike_8_decision_matrix,

  // PostgreSQL Mastery Series
  'postgresql-mastery-series': postgresql_0_hub,
  'postgresql-cloud-vs-self-managed-strategic-decision-framework': postgresql_1_cloud_vs_self_managed,
  'postgresql-cloud-managed-rds-cloud-sql-azure-deep-dive': postgresql_2_cloud_managed,
  'postgresql-self-managed-vm-bare-metal-production-guide': postgresql_3_self_managed,
  'postgresql-docker-container-deployment-strategies': postgresql_4_docker,
  'postgresql-kubernetes-statefulset-operator-deep-dive': postgresql_5_kubernetes,
  'postgresql-local-development-docker-native-quick-start': postgresql_6_local_dev,
  'postgresql-performance-optimization-query-tuning-indexing': postgresql_7_performance,
  'postgresql-deployment-decision-matrix-complete-comparison-guide': postgresql_8_decision_matrix,

  // Containerization
  
  // Add new slug: import pairs here
}; 