#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Blog post slugs - this should match your BLOG_POST_SLUGS from config
const BLOG_POST_SLUGS = [
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

  // MySQL Deployment Guide Series
  'mysql-deployment-guide',
  'mysql-cloud-vs-self-managed-strategic-decision-framework',
  'mysql-cloud-managed-rds-cloud-sql-azure-deep-dive',
  'mysql-self-managed-vm-bare-metal-production-guide',
  'mysql-docker-container-deployment-strategies',
  'mysql-kubernetes-statefulset-operator-deep-dive',
  'mysql-local-development-docker-native-quick-start',
  'mysql-performance-optimization-query-tuning-indexing',
  'mysql-deployment-decision-matrix-complete-comparison-guide',

  // MongoDB Deployment Guide Series
  'mongodb-deployment-guide',
  'mongodb-cloud-vs-self-managed-strategic-decision-framework',
  'mongodb-cloud-managed-atlas-deep-dive',
  'mongodb-self-managed-vm-bare-metal-production-guide',
  'mongodb-docker-container-deployment-strategies',
  'mongodb-kubernetes-statefulset-operator-deep-dive',
  'mongodb-local-development-docker-native-quick-start',
  'mongodb-performance-optimization-query-tuning-indexing',
  'mongodb-deployment-decision-matrix-complete-comparison-guide',

  // Redis Deployment Guide Series
  'redis-deployment-guide',
  'redis-cloud-vs-self-managed-strategic-decision-framework',
  'redis-cloud-managed-elasticache-memorystore-deep-dive',
  'redis-self-managed-vm-bare-metal-production-guide',
  'redis-docker-container-deployment-strategies',
  'redis-kubernetes-statefulset-operator-deep-dive',
  'redis-local-development-docker-native-quick-start',
  'redis-performance-optimization-memory-management',
  'redis-deployment-decision-matrix-complete-comparison-guide',

  // Aerospike Deployment Guide Series
  'aerospike-deployment-guide',
  'aerospike-cloud-vs-self-managed-strategic-decision-framework',
  'aerospike-architecture-deep-dive-hybrid-memory',
  'aerospike-self-managed-vm-bare-metal-production-guide',
  'aerospike-docker-container-deployment-strategies',
  'aerospike-kubernetes-statefulset-deep-dive',
  'aerospike-local-development-docker-native-quick-start',
  'aerospike-performance-optimization-hma-clustering',
  'aerospike-deployment-decision-matrix-complete-comparison-guide',

  // PostgreSQL Deployment Guide Series
  'postgresql-deployment-guide',
  'postgresql-cloud-vs-self-managed-strategic-decision-framework',
  'postgresql-cloud-managed-rds-cloud-sql-azure-deep-dive',
  'postgresql-self-managed-vm-bare-metal-production-guide',
  'postgresql-docker-container-deployment-strategies',
  'postgresql-kubernetes-statefulset-operator-deep-dive',
  'postgresql-local-development-docker-native-quick-start',
  'postgresql-performance-optimization-query-tuning-indexing',
  'postgresql-deployment-decision-matrix-complete-comparison-guide',
];

const baseUrl = 'https://thisiskushal31.github.io/blog';
const currentDate = new Date().toISOString().split('T')[0];

function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

// Add all blog post URLs
// Using clean URLs (Google's recommendation) - the index.html redirect script will convert to hash URLs
// Clean URLs work better for SEO even with hash routing
BLOG_POST_SLUGS.forEach(slug => {
  sitemap += `
  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
});

  sitemap += `
</urlset>`;

  return sitemap;
}

// Generate and write sitemap
const sitemap = generateSitemap();
fs.writeFileSync('sitemap.xml', sitemap);

console.log(`✅ Generated sitemap with ${BLOG_POST_SLUGS.length + 1} URLs`);
console.log(`📄 Sitemap saved to: sitemap.xml`);
console.log(`🔗 Base URL: ${baseUrl}`);
console.log(`📅 Generated on: ${currentDate}`);
