#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Blog post slugs - this should match your BLOG_POST_SLUGS from config
const BLOG_POST_SLUGS = [
  'elasticsearch-deployment-guide',
  'elastic-cloud-vs-self-managed-strategic-decision-framework',
  'elastic-cloud-deep-dive-hosted-vs-serverless-architecture',
  'self-managed-elasticsearch-vm-bare-metal-production-guide',
  'docker-elasticsearch-container-deployment-strategies',
  'kubernetes-elasticsearch-eck-helm-raw-yaml-deep-dive',
  'elasticsearch-local-development-docker-packages-quick-start',
  'elasticsearch-deployment-decision-matrix-complete-comparison-guide',
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

// Add all blog post URLs (clean URLs without hash for better SEO)
BLOG_POST_SLUGS.forEach(slug => {
  sitemap += `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>2025-08-24</lastmod>
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
