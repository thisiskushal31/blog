# Blog Website

A modern, responsive blog website built with React, TypeScript, and Tailwind CSS, specifically designed for sharing DevOps knowledge and experiences.

## 🚀 Features

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
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Icons**: Lucide React
- **Theme**: Custom dark/light mode implementation

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd devops-blog
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser** and navigate to \`http://localhost:5173\`

## 🏗️ Build for Production

1. **Create production build**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Preview production build locally**
   \`\`\`bash
   npm run preview
   \`\`\`

The built files will be in the \`dist\` directory, ready for deployment.

## ✍️ Adding New Blog Posts

### Step 1: Create a new blog post file

1. Create a new TypeScript file in \`src/content/blog/\` directory
2. Use kebab-case naming (e.g., \`my-awesome-post.ts\`)

### Step 2: Define your blog post

Create a markdown file for your post content (e.g., `src/content/blog/markdown/my-awesome-post.md`).

Then, in your TypeScript file (e.g., `src/content/blog/my-awesome-post.ts`), import the markdown and define your post like this:

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
  readTime: '5 min read',
  categories: ['DevOps', 'Tutorial'],
  featured: true,
  coverImage: '/path-to-your-image.jpg',
  author: {
    name: 'Your Name',
    avatar: '/blog/path-to-avatar.jpg',
  },
};
```

> **Note:** Place your markdown file in `src/content/blog/markdown/` and use the `?raw` import suffix.

### Step 3: Register your blog post

Add your new post to \`src/content/blog/index.ts\`:

\`\`\`typescript
// 1. Import your new post
import { blogPost as myAwesomePost } from './my-awesome-post';

// 2. Add it to the blogPosts array
export const blogPosts: BlogPost[] = [
  myAwesomePost, // Add your new post here
  // ... existing posts
];
\`\`\`

## 🏷️ Blog Post Configuration Tags

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| \`slug\` | string | URL-friendly identifier | \`"implementing-gitops"\` |
| \`title\` | string | Main post title | \`"Implementing GitOps"\` |
| \`excerpt\` | string | Short description for listings | \`"Learn GitOps basics..."\` |
| \`content\` | string | Full markdown content | \`"# Title\\n\\nContent..."\` |
| \`publishDate\` | string | Publication date (YYYY-MM-DD) | \`"2024-01-15"\` |
| \`readTime\` | string | Estimated reading time | \`"5 min read"\` |
| \`categories\` | string[] | Category tags for filtering | \`["DevOps", "Tutorial"]\` |
| \`coverImage\` | string | Cover image path/URL | \`"/images/cover.jpg"\` |
| \`author.name\` | string | Author's name | \`"John Doe"\` |
| \`author.avatar\` | string | Author's avatar path/URL | \`"/images/avatar.jpg"\` |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| \`subtitle\` | string | Additional context | \`"A beginner's guide"\` |
| \`featured\` | boolean | Show in featured section | \`true\` |

### Popular Categories

Choose from these common categories or create your own:

- \`"DevOps"\` - General DevOps practices
- \`"CI/CD"\` - Continuous Integration/Deployment
- \`"Kubernetes"\` - Container orchestration
- \`"Docker"\` - Containerization
- \`"AWS"\` - Amazon Web Services
- \`"Terraform"\` - Infrastructure as Code
- \`"Monitoring"\` - System monitoring and observability
- \`"Security"\` - DevSecOps and security practices
- \`"Tutorial"\` - Step-by-step guides
- \`"Best Practices"\` - Industry best practices

## 📝 Markdown Features

The blog supports rich markdown formatting:

- **Headings**: \`# H1\`, \`## H2\`, \`### H3\`
- **Text Formatting**: \`**bold**\`, \`*italic*\`
- **Code**: \`\\\`inline code\\\`\` and \`\\\`\\\`\\\`language\\ncode blocks\\\`\\\`\\\`\`
- **Lists**: Ordered (\`1. item\`) and unordered (\`- item\`)
- **Links**: \`[text](url)\`
- **Images**: \`![alt](url)\` (with lazy loading)
- **Tables**: Pipe-separated tables
- **Embedded Media**: \`[youtube_embed id="VIDEO_ID"]\` and \`[gist_embed id="USERNAME/GIST_ID"]\`

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

### GitHub Gist Markdown Rendering

- Markdown files from GitHub Gists are rendered inline, just like local markdown.
- The filename/language header is omitted for a clean reading experience.
- A subtle notice box (with a grey background) is always shown directly below the rendered content, indicating the source and providing a 'view raw' link.
- The integration is styled to ensure there is no visual gap between the content and the notice, for a seamless look.

## 🎨 Best Practices

### Content Guidelines

1. **Use descriptive titles** that clearly indicate the post content
2. **Write compelling excerpts** (150-200 characters) for better engagement
3. **Choose relevant categories** to help users find your content
4. **Include code examples** when discussing technical topics
5. **Use proper heading hierarchy** (H1 for title, H2 for main sections, H3 for subsections)

### Technical Guidelines

1. **Consistent naming**: Use kebab-case for file names and slugs
2. **Unique slugs**: Ensure each post has a unique slug
3. **Optimize images**: Use appropriate image sizes and formats
4. **Test locally**: Always test your posts locally before publishing
5. **Validate dates**: Use YYYY-MM-DD format for publish dates

### SEO Optimization

1. **Descriptive titles** (50-60 characters)
2. **Compelling excerpts** that include key terms
3. **Relevant categories** for better organization
4. **Alt text for images** (handled automatically for cover images)

## 🚀 Deployment

This project can be deployed to various platforms:

### Netlify
1. Connect your GitHub repository
2. Set build command: \`npm run build\`
3. Set publish directory: \`dist\`

### Vercel
1. Import your GitHub repository
2. Vercel auto-detects Vite configuration
3. Deploy with one click

### GitHub Pages
1. Install \`gh-pages\`: \`npm install --save-dev gh-pages\`
2. Add to package.json: \`"homepage": "https://yourusername.github.io/your-repo"\`
3. Add script: \`"deploy": "gh-pages -d dist"\`
4. Run: \`npm run build && npm run deploy\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
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
