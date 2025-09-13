# Blog Website

This repository contains the source code for the blog website, which is a companion to the blog content stored in the `blog-data` repository.

> **Info:** A public, general-use version of this repository is available at [https://github.com/thisiskushal31/configurable-react-blog-starter](https://github.com/thisiskushal31/configurable-react-blog-starter).

---

## 🚀 Features

### **Modern Tech Stack**
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive, modern styling
- **React Router** for client-side navigation
- **GitHub Pages** for hosting with automatic CI/CD

### **SEO & Performance**
- **Google Search Console** integration with meta tag verification
- **Automated sitemap generation** with all blog posts
- **robots.txt** for search engine crawler guidance
- **Open Graph** and **Twitter Card** meta tags
- **Responsive design** optimized for all devices
- **Fast loading** with optimized assets and lazy loading

### **Content Management**
- **Markdown-based** blog posts with syntax highlighting
- **TypeScript configuration** for type-safe content
- **Automatic sitemap updates** when new posts are added
- **Category and search functionality**
- **Dark/Light mode** theme switching

---

## 📝 How to Add a New Blog Post

1. **Create Markdown:**
   - Add your post as a `.md` file in `src/content/blog/markdown/` (e.g., `my-post.md`).

2. **Create TypeScript Wrapper:**
   - Add a `.ts` file in `src/content/blog/` (e.g., `my-post.ts`) that imports the markdown and exports a `blogPost` object.

3. **Register the Post:**
   - In `src/config/blogPosts.config.ts`:
     - Import your new post at the top.
     - Add the slug to `BLOG_POST_SLUGS`.
     - Add the post to `POST_MAP`.

4. **Done!**
   - The post will now appear in the blog.
   - The sitemap will be automatically updated on the next deployment.

(See the public repo for a full example if needed.)

---

## 🔧 Development

### **Local Development**
```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

### **Sitemap Management**
```bash
# Generate sitemap manually
yarn generate-sitemap

# The sitemap is automatically generated during CI/CD
```

---

## 🌐 SEO & Search Console Setup

### **Google Search Console**
- **Verification**: Meta tag method configured
- **Sitemap**: Automatically submitted to Google Search Console
- **URLs**: `https://thisiskushal31.github.io/blog/sitemap.xml`

### **Sitemap Features**
- **Main sitemap**: Contains all blog posts with proper URLs
- **Backup sitemap**: Homepage-only version for fallback
- **Auto-updates**: Regenerated on every deployment
- **Google-compatible**: Valid XML format with proper encoding

### **SEO Meta Tags**
- **Title and description** for each blog post
- **Open Graph** tags for social media sharing
- **Twitter Card** support
- **Canonical URLs** for proper indexing

---

## 🚀 Deployment

### **Automatic Deployment**
- **Trigger**: Push to `main` branch
- **Platform**: GitHub Pages
- **URL**: `https://thisiskushal31.github.io/blog/`
- **Build**: Automated with GitHub Actions

### **CI/CD Pipeline**
1. **Dependency Installation**: Yarn for reliable package management
2. **Build Process**: Vite optimization with Rollup
3. **Sitemap Generation**: Automatic sitemap creation
4. **Deployment**: GitHub Pages with proper file copying
5. **Verification**: Build success and file validation

---

## 📁 Project Structure

```
blog/
├── src/
│   ├── content/blog/          # Blog post TypeScript files
│   ├── content/blog/markdown/ # Markdown content files
│   ├── components/            # React components
│   ├── config/               # Configuration files
│   └── pages/                # Page components
├── scripts/
│   └── generate-sitemap.js   # Sitemap generation script
├── .github/workflows/        # CI/CD configuration
├── sitemap.xml              # Main sitemap
├── sitemap-homepage-only.xml # Backup sitemap
├── robots.txt               # Search engine directives
└── index.html               # Main HTML with meta tags
```

---

## 🔍 Search Engine Optimization

### **Sitemap URLs**
- **Main**: `https://thisiskushal31.github.io/blog/sitemap.xml`
- **Backup**: `https://thisiskushal31.github.io/blog/sitemap-homepage-only.xml`

### **Blog Post URLs**
- **Format**: `https://thisiskushal31.github.io/blog/#/blog/{slug}`
- **Examples**:
  - `https://thisiskushal31.github.io/blog/#/blog/elasticsearch-deployment-guide`
  - `https://thisiskushal31.github.io/blog/#/blog/elastic-cloud-vs-self-managed-strategic-decision-framework`

### **Crawler Instructions**
- **robots.txt**: Allows all crawlers with 10-second delay
- **Sitemap reference**: Points to main sitemap
- **User-agent**: Universal access with crawl optimization

---

## 🛠️ Technical Details

### **Build Configuration**
- **Package Manager**: Yarn (better optional dependency handling)
- **Bundler**: Vite with Rollup
- **TypeScript**: Strict mode enabled
- **CSS**: Tailwind CSS with JIT compilation

### **Performance Optimizations**
- **Code splitting**: Automatic route-based splitting
- **Asset optimization**: Images and static files
- **Lazy loading**: Components and images
- **Caching**: Proper cache headers for static assets

---

## 📊 Analytics & Monitoring

### **Google Search Console**
- **Property**: `https://thisiskushal31.github.io/blog/`
- **Verification**: Meta tag method
- **Sitemap**: Automatically submitted and updated
- **Coverage**: All blog posts indexed

### **Performance Monitoring**
- **Core Web Vitals**: Optimized for Google's metrics
- **Mobile Performance**: Responsive design for all devices
- **Loading Speed**: Optimized assets and lazy loading

---

## Copyright and Licensing

© 2025 Kushal Gupta. All Rights Reserved.

The source code and all content within this repository are the exclusive property of Kushal Gupta. This content is not to be used, reproduced, or distributed without explicit permission.