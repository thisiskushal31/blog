# Blog Website

> **Info:** A public/world-view version of this repository is available at [https://github.com/thisiskushal31/configurable-react-blog-starter](https://github.com/thisiskushal31/configurable-react-blog-starter)

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

(See the public repo for a full example if needed.)