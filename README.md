# Blog Website

A modern, production-ready blog built with React, TypeScript, and Vite. Features clean design, SEO optimization, and GitHub Flavored Markdown (GFM) support.

## 🚀 Features

- **React 18** + **TypeScript** for type-safe development
- **Vite** for fast builds and development
- **Tailwind CSS** for responsive styling
- **GitHub Flavored Markdown** with syntax highlighting
- **Theme switching** (Light/Dark mode)
- **SEO optimized** with sitemaps and meta tags
- **GitHub Pages** deployment ready

## 📁 Project Structure

```
blog/
├── src/
│   ├── components/       # React components
│   │   ├── blog/         # Blog-specific components
│   │   ├── common/       # Shared components
│   │   ├── sections/     # Page sections
│   │   └── background/  # Background animations
│   ├── config/          # Configuration files
│   ├── content/          # Blog content
│   │   ├── blog/        # TypeScript post wrappers
│   │   └── markdown/    # Markdown files
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Libraries (markdown renderer)
│   ├── pages/           # Page components
│   ├── styles/          # CSS files
│   └── utils/           # Utility functions
├── scripts/             # Build scripts
└── public/              # Static assets
```

## 📝 Adding a New Blog Post

1. **Create Markdown File:**
   ```bash
   # Add to: src/content/blog/markdown/your-post.md
   ```

2. **Create TypeScript Wrapper:**
   ```bash
   # Create: src/content/blog/your-post.ts
   ```
   ```typescript
   import { BlogPost } from '@/content/index';
   import markdownContent from './markdown/your-post.md?raw';

   export const blogPost: BlogPost = {
     slug: 'your-post',
     title: 'Your Post Title',
     excerpt: 'Brief description...',
     content: markdownContent,
     publishDate: '2025-01-01',
     categories: ['Category'],
     coverImage: '/blog/blogImages/your-image.png',
   };
   ```

3. **Register in Config:**
   ```bash
   # Edit: src/config/blogPosts.config.ts
   ```
   - Import your new post
   - Add slug to `BLOG_POST_SLUGS` array
   - Add post to `POST_MAP` object

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Build with pre-rendering (for SEO)
npm run build:prerender

# Preview production build
npm run preview
```

## 🔍 SEO & Pre-rendering

The blog uses **HashRouter** for client-side routing. To ensure Google can index all blog posts, the build process includes pre-rendering that generates static HTML files for each post.

### How Pre-rendering Works

1. **Build**: Vite builds the React app normally
2. **Sitemap**: Generates sitemap with all blog post routes
3. **Pre-render**: Puppeteer visits each route and saves the rendered HTML
4. **Deploy**: Static HTML files are deployed to GitHub Pages

When Google crawls a clean URL like `/blog/post-name`, it gets the pre-rendered HTML immediately, without needing to execute JavaScript.

### Usage

**Quick Start:**
```bash
# Build and pre-render in one command
npm run build:prerender

# Or manually:
npm run build
npm run generate-sitemap
npm run prerender
```

**What Gets Pre-rendered:**
- Homepage (`/`)
- Blog listing (`/blog`)
- All individual blog posts (`/blog/post-slug`)

Each route gets its own directory with an `index.html` file:
- `/blog/post-name/` → `dist/post-name/index.html`

### CI/CD Integration

The GitHub Actions workflow automatically:
1. Builds the app
2. Generates sitemap
3. Pre-renders all routes
4. Deploys to GitHub Pages

### Troubleshooting

**Pre-rendering fails:**
- Make sure `npm run build` completes successfully first
- Check that the preview server can start (port 4173)
- Verify Puppeteer is installed: `npm install puppeteer`

**Routes not pre-rendered:**
- Check that `sitemap.xml` exists and contains all routes
- Run: `npm run generate-sitemap`

**Preview server failed to start:**
- Make sure port 4173 is available
- Try: `lsof -ti:4173 | xargs kill -9`

**Pre-rendering takes too long:**
- This is normal for 60+ blog posts
- Takes ~2-5 minutes
- Only runs during build, not on every request

### Performance Impact

- **Build time**: +2-5 minutes (one-time, during CI/CD)
- **Deploy size**: +5-10 MB (static HTML files)
- **SEO benefit**: ✅ Immediate indexing by Google
- **User experience**: No change (still works as SPA)

## ⚙️ Configuration

All configuration is centralized in `src/config/config.ts`:
- Author information
- Social links
- Blog settings
- Theme preferences

## 📄 Documentation

Detailed documentation and changelog available in:
- [`./changelog/v2/`](./changelog/v2/) - Version 2 changes and documentation

## 📊 Build Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:prerender` | Build + generate sitemap + pre-render |
| `npm run prerender` | Pre-render routes (requires built app) |
| `npm run generate-sitemap` | Generate sitemap.xml |
| `npm run preview` | Preview production build |

---

## Copyright and Licensing

© 2025 Kushal Gupta. All Rights Reserved.

The source code and all content within this repository are the exclusive property of Kushal Gupta. This content is not to be used, reproduced, or distributed without explicit permission.

## About

A public repository containing the website code for my personal link hub. All code is for my exclusive use and is not licensed for public distribution.

**Live Site**: [https://thisiskushal31.github.io/blog/](https://thisiskushal31.github.io/blog/)
