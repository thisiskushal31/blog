#!/usr/bin/env node

/**
 * Pre-rendering script for blog posts
 * Generates static HTML files for each blog post to improve SEO
 * 
 * This script:
 * 1. Starts a local server with the built app
 * 2. Uses Puppeteer to visit each blog post route
 * 3. Waits for React to render the content
 * 4. Saves the rendered HTML to static files
 * 5. These files are served when Google crawls clean URLs
 */

import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We'll get routes from the sitemap or generate them dynamically
// For now, we'll read from a generated routes file or use a simpler approach

const DIST_DIR = path.join(__dirname, '../dist');
const BASE_URL = 'http://localhost:4173'; // Vite preview port
const BASE_PATH = '/blog';

// Read blog post slugs from sitemap or generate routes dynamically
function getRoutesFromSitemap() {
  const sitemapPath = path.join(__dirname, '../sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.warn('⚠️  Sitemap not found, using default routes');
    return ['/', '/blog'];
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
  
  const routes = ['/', '/blog']; // Always include homepage and blog listing
  
  urlMatches.forEach(match => {
    const url = match.replace(/<\/?loc>/g, '');
    try {
      const urlObj = new URL(url);
      let route = urlObj.pathname;
      
      // Remove base path if present, but keep the structure
      // Sitemap URLs: https://thisiskushal31.github.io/blog/post-name
      // We want routes: /blog/post-name (for HashRouter)
      if (route.startsWith(BASE_PATH)) {
        // Keep the /blog/ prefix for HashRouter
        route = route; // Keep as-is: /blog/post-name
      } else if (route !== '/' && route !== BASE_PATH) {
        // Route doesn't have /blog/ prefix, add it
        route = `${BASE_PATH}${route.startsWith('/') ? route : '/' + route}`;
      }
      
      // Only add blog post routes (not homepage)
      if (route && route !== '/' && route !== BASE_PATH && route.startsWith('/')) {
        routes.push(route);
      }
    } catch (e) {
      // Skip invalid URLs
    }
  });

  // Remove duplicates
  return [...new Set(routes)];
}

// Routes to pre-render
const routes = getRoutesFromSitemap();

let previewServer = null;

async function startPreviewServer() {
  return new Promise((resolve, reject) => {
    // Check if server is already running
    const checkServer = () => {
      http.get(`${BASE_URL}${BASE_PATH}/`, (res) => {
        if (res.statusCode === 200) {
          console.log('✅ Preview server is already running');
          resolve();
        } else {
          setTimeout(checkServer, 500);
        }
      }).on('error', () => {
        setTimeout(checkServer, 500);
      });
    };

    // Try to start preview server
    console.log('🚀 Starting preview server...');
    previewServer = spawn('npm', ['run', 'preview'], {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe',
    });

    previewServer.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') || output.includes('localhost')) {
        console.log('✅ Preview server started');
        setTimeout(resolve, 2000); // Give it a moment to fully start
      }
    });

    previewServer.stderr.on('data', (data) => {
      const error = data.toString();
      if (error.includes('EADDRINUSE')) {
        console.log('⚠️  Port already in use, assuming server is running');
        checkServer();
      } else {
        console.error('Preview server error:', error);
      }
    });

    previewServer.on('error', (error) => {
      console.error('Failed to start preview server:', error);
      reject(error);
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (previewServer && !previewServer.killed) {
        console.log('⚠️  Server start timeout, proceeding anyway...');
        checkServer();
      }
    }, 30000);
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  
  try {
    // Construct the hash route for HashRouter
    // Routes from sitemap: /blog/post-name
    // HashRouter expects: #/blog/post-name (where slug = post-name)
    let hashRoute;
    if (route === '/' || route === '/blog') {
      hashRoute = '/blog'; // Blog listing
    } else if (route.startsWith('/blog/')) {
      // Extract slug from /blog/post-name -> post-name
      const slug = route.replace('/blog/', '');
      hashRoute = `/blog/${slug}`; // HashRouter route: /blog/:slug
    } else {
      hashRoute = `/blog/${route.replace(/^\//, '')}`;
    }
    
    // Navigate to base URL first, then set hash programmatically
    const baseUrl = `${BASE_URL}${BASE_PATH}/`;
    console.log(`📄 Pre-rendering: ${route} (hash: #${hashRoute})`);
    
    // First, load the base page
    await page.goto(baseUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for React to mount
    await page.waitForSelector('#root', { timeout: 10000 });
    
    // Wait for React Router to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Now navigate to the hash route programmatically
    await page.evaluate((hash) => {
      window.location.hash = hash;
    }, hashRoute);
    
    // Wait for hash change to be processed by React Router
    await page.waitForFunction(
      (expectedHash) => {
        return window.location.hash === expectedHash || 
               window.location.hash === `#${expectedHash}`;
      },
      { timeout: 5000 },
      hashRoute
    );
    
    // Wait for React Router to render the new route
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Wait for React to fully hydrate and render content
    // For blog posts, wait for article tag or blog listing
    if (route.startsWith('/blog/') && route !== '/blog') {
      // This is a blog post - wait for article content
      try {
        await page.waitForSelector('article', { timeout: 15000 });
        // Wait for actual content inside article (not 404 page)
        await page.waitForFunction(
          () => {
            const article = document.querySelector('article');
            const h1 = document.querySelector('h1');
            // Check if we have article with content, not 404 page
            return article && h1 && !h1.textContent.includes('404') && !h1.textContent.includes('Page Not Found');
          },
          { timeout: 15000 }
        );
      } catch (e) {
        console.log(`⚠️  Blog post content not found for ${route}, might be 404...`);
      }
    } else {
      // This is homepage or blog listing - wait for blog cards
      try {
        await page.waitForSelector('.blog-card, article, h1', { timeout: 15000 });
      } catch (e) {
        console.log(`⚠️  Content selector not found for ${route}, continuing...`);
      }
    }

    // Wait a bit more for any lazy-loaded content and React hydration
    // Note: page.waitForTimeout() was removed in Puppeteer v24+
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Verify we didn't get a 404 page
    const pageContent = await page.content();
    const has404 = pageContent.includes('Page Not Found') || pageContent.includes('404');
    
    if (has404 && route !== '/' && route !== '/blog') {
      console.log(`⚠️  Warning: ${route} appears to be a 404 page, but continuing...`);
    }

    // Get the rendered HTML
    const html = pageContent;

    // Determine output path
    // For GitHub Pages, we need to create directories for each route
    let outputPath;
    if (route === '/' || route === '/blog') {
      // Homepage/blog listing stays as index.html
      outputPath = path.join(DIST_DIR, 'index.html');
    } else if (route.startsWith('/blog/')) {
      // Blog posts: /blog/post-name -> dist/post-name/index.html
      const slug = route.replace('/blog/', '').replace(/^\//, '');
      const postDir = path.join(DIST_DIR, slug);
      fs.mkdirSync(postDir, { recursive: true });
      outputPath = path.join(postDir, 'index.html');
    } else {
      // Other routes: /path -> dist/path/index.html
      const routePath = route.replace(/^\//, '');
      const routeDir = path.join(DIST_DIR, routePath);
      fs.mkdirSync(routeDir, { recursive: true });
      outputPath = path.join(routeDir, 'index.html');
    }

    // Ensure directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Inject meta tags and update HTML for clean URLs
    const updatedHtml = injectMetaTags(html, route);

    // Write the pre-rendered HTML
    fs.writeFileSync(outputPath, updatedHtml);
    console.log(`✅ Pre-rendered: ${route} → ${path.relative(DIST_DIR, outputPath)}`);

  } catch (error) {
    console.error(`❌ Error pre-rendering ${route}:`, error.message);
  } finally {
    await page.close();
  }
}

function injectMetaTags(html, route) {
  // The BlogPost component's useEffect will handle meta tags dynamically
  // This pre-rendered HTML already contains the rendered React content
  // which includes the meta tags that React added
  
  // For GitHub Pages, we need to ensure the base path is correct
  // The HTML should already have the correct base path from Vite build
  
  return html;
}

async function prerender() {
  console.log('🎨 Starting pre-rendering process...\n');

  // Check if dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  try {
    // Start preview server
    await startPreviewServer();

    // Launch Puppeteer
    console.log('🤖 Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    console.log(`📝 Pre-rendering ${routes.length} routes...\n`);

    // Pre-render each route
    for (const route of routes) {
      await prerenderRoute(browser, route);
    }

    // Close browser
    await browser.close();
    console.log('\n✅ Pre-rendering complete!');
    
    // Stop preview server immediately after pre-rendering completes
    await cleanupPreviewServer();

  } catch (error) {
    console.error('❌ Pre-rendering failed:', error);
    // Still try to cleanup on error
    await cleanupPreviewServer();
  }
}

async function cleanupPreviewServer() {
  if (previewServer && !previewServer.killed) {
    console.log('🛑 Stopping preview server...');
    
    return new Promise((resolve) => {
      let resolved = false;
      
      // Try graceful shutdown first
      previewServer.kill('SIGTERM');
      
      // Set up exit handler
      const exitHandler = () => {
        if (!resolved) {
          resolved = true;
          console.log('✅ Preview server stopped');
          resolve();
        }
      };
      
      previewServer.on('exit', exitHandler);
      
      // Force kill after 1 second if still running
      setTimeout(() => {
        if (previewServer && !previewServer.killed && !resolved) {
          console.log('⚠️  Force killing preview server...');
          previewServer.kill('SIGKILL');
        }
      }, 1000);
      
      // Force resolve after 3 seconds max (timeout)
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          console.log('✅ Cleanup complete');
          resolve();
        }
      }, 3000);
    });
  }
}

// Run pre-rendering
prerender()
  .then(() => {
    console.log('✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });

