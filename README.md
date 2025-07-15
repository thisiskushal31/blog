# Blog Website

A modern, responsive blog website built with React, TypeScript, and Tailwind CSS, specifically designed for sharing DevOps knowledge and experiences.

## 🚀 Features

- **Config-driven base path and author:** Easily change the blog URL and author info in one place (`src/config/config.ts`)
- **Config-driven post registration:** All blog post registration is managed in one config file (`src/config/blogPosts.config.ts`)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Category Filtering**: Filter blog posts by categories
- **Featured Posts**: Highlight important posts in a dedicated section
- **Markdown Support**: Write blog posts in Markdown with syntax highlighting
- **Embedded Media**: Support for YouTube videos and GitHub Gists
- **Lazy Loading**: All images and iframes load only when needed
- **HTML Sanitization**: Secure content rendering with DOMPurify
- **Syntax Highlighting**: Support for multiple programming languages
- **Web Components**: Custom elements for embedded media
- **Social Sharing**: Share posts on Twitter, LinkedIn, and copy links
- **SEO Friendly**: Optimized for search engines
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Routing**: React Router DOM (HashRouter)
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Theme**: Custom dark/light mode implementation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd devops-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🏗️ Build for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Preview production build locally**
   ```bash
   npm run preview
   ```

The built files will be in the `dist` directory, ready for deployment.

## ✍️ Adding New Blog Posts

### Step 1: Create your Markdown and TypeScript files

1. Create a new Markdown file in `src/content/blog/markdown/` (e.g., `my-awesome-post.md`)
2. Create a new TypeScript file in `src/content/blog/` (e.g., `my-awesome-post.ts`):

```typescript
import { BlogPost } from '../blogPostIndex';
import content from './markdown/my-awesome-post.md?raw';

export const blogPost: BlogPost = {
  slug: 'my-awesome-post',
  title: 'My Awesome Post',
  subtitle: 'Optional subtitle for context',
  excerpt: 'A brief description of your post that appears on the blog listing page.',
  content, // imported markdown
  publishDate: '2024-01-15',
  // No need to specify readTime! It is automatically calculated based on the post content.
  categories: ['DevOps', 'Tutorial'],
  featured: true,
  coverImage: '/path-to-your-image.jpg',
  coverImageCredit: 'Photo by ...',
  // Optional: Override the author for this post (otherwise the global author is used)
  // author: {
  //   name: "Jane Doe",
  //   avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  // }
};
```

### Step 2: Register your post in the config-driven index

1. In `src/config/blogPosts.config.ts`:
   - Import your new post at the top:
     ```typescript
     import { blogPost as myAwesomePost } from '../content/blog/my-awesome-post';
     ```
   - Add your post's slug to the `BLOG_POST_SLUGS` array:
     ```typescript
     export const BLOG_POST_SLUGS = [
       'comprehensive-features-showcase',
       'my-awesome-post', // Add your new post here
     ];
     ```
   - Add your post to the `POST_MAP`:
     ```typescript
     export const POST_MAP: Record<string, BlogPost> = {
       'comprehensive-features-showcase': comprehensiveFeaturesShowcase,
       'my-awesome-post': myAwesomePost,
     };
     ```

That's it! Your post will now appear in the blog.

## 🧑‍💻 Changing Blog Base Path and Author

- Open `src/config/config.ts`:
  - To change the blog's base URL (e.g., `/blog` to `/book-blog`):
    ```typescript
    export const BLOG_BASE_PATH = "/book-blog";
    ```
  - To change the default author name or avatar (used for all posts unless overridden):
    ```typescript
    export const AUTHOR = {
      name: "Your Name",
      avatar: "/blog/profile.jpeg", // or any image path
    };
    ```
- You can override the author for any individual post by adding an `author` field to the post object (see above). If not specified, the global author is used as a fallback.
- All posts and author info will update automatically.
- **All config files are in the `src/config/` folder.**

## 🔗 Anchor, Copy, and Share Links

- All anchor links, copy-link buttons, and share buttons generate correct URLs for hash-based routing (e.g., `http://localhost:8080/#/blog/my-awesome-post#section`)
- No more double paths or broken anchors.

## 📝 Markdown Features

The blog supports rich markdown formatting:

- **Headings**: `# H1`, `## H2`, `### H3`
- **Text Formatting**: `**bold**`, `*italic*`
- **Code**: ``inline code`` and ```language\ncode blocks```
- **Lists**: Ordered (`1. item`) and unordered (`- item`)
- **Links**: `[text](url)`
- **Images**: `![alt](url)` (with lazy loading)
- **Tables**: Pipe-separated tables
- **Embedded Media**: `[youtube_embed id="VIDEO_ID"]` and `[gist_embed id="USERNAME/GIST_ID"]`

### Supported Programming Languages

The blog supports syntax highlighting for:
- JavaScript/TypeScript
- Python
- YAML/JSON
- Docker
- Bash/Shell
- Git
- Markdown
- And many more via Prism.js

## 🎨 Best Practices

- Use descriptive titles and excerpts
- Choose relevant categories
- Optimize images
- Test locally before publishing
- Use YYYY-MM-DD format for publish dates

## 🚀 Deployment

This project can be deployed to various platforms:

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel
1. Import your GitHub repository
2. Vercel auto-detects Vite configuration
3. Deploy with one click

### GitHub Pages
1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/your-repo"`
3. Add script: `"deploy": "gh-pages -d dist"`
4. Run: `npm run build && npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you have any questions or need help:
1. Check the existing blog posts for examples
2. Review this README for guidance
3. Create an issue in the repository
4. Follow the best practices outlined above

---

**Happy Blogging! 🎉**
