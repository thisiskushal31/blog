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

# Preview production build
npm run preview
```

## ⚙️ Configuration

All configuration is centralized in `src/config/config.ts`:
- Author information
- Social links
- Blog settings
- Theme preferences

## 📄 Documentation

Detailed documentation and changelog available in:
- [`./changelog/v2/`](./changelog/v2/) - Version 2 changes and documentation

---

## Copyright and Licensing

© 2025 Kushal Gupta. All Rights Reserved.

The source code and all content within this repository are the exclusive property of Kushal Gupta. This content is not to be used, reproduced, or distributed without explicit permission.

## About

A public repository containing the website code for my personal link hub. All code is for my exclusive use and is not licensed for public distribution.

**Live Site**: [https://thisiskushal31.github.io/blog/](https://thisiskushal31.github.io/blog/)
