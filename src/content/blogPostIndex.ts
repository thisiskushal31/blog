// blogPostIndex.ts - Central index for all blog post metadata and content.
// Imports and exports all blog posts for the blog app. Used for listing and looking up posts.
// If loading fails, an error is logged and an empty array is returned.

// Blog post imports - Add new blog posts here
import { blogPost as comprehensiveFeaturesShowcase } from './blog/comprehensive-features-showcase';

/**
 * BlogPost - Interface for blog post metadata and content.
 * @property slug - URL-friendly identifier (e.g., "my-blog-post")
 * @property title - Main title of the blog post
 * @property subtitle - Optional subtitle for additional context
 * @property excerpt - Short description shown on blog listing page
 * @property content - Full markdown content of the blog post
 * @property publishDate - Publication date (YYYY-MM-DD format)
 * @property readTime - Estimated reading time (e.g., "5 min read")
 * @property categories - Array of category tags for filtering
 * @property featured - Optional flag to mark post as featured
 * @property coverImage - URL or path to cover image
 * @property author - Author's name and avatar
 */
export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: string;
  categories: string[];
  featured?: boolean;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
}

/**
 * blogPosts - Array of all blog posts in the app.
 * Add new posts to this array.
 * If loading fails, returns an empty array and logs the error.
 */
export const blogPosts: BlogPost[] = (() => {
  try {
    return [
      comprehensiveFeaturesShowcase, // Add your new post here
      // ... existing posts
    ];
  } catch (err) {
    // Log the error and return an empty array
    // eslint-disable-next-line no-console
    console.error('Error loading blog posts:', err);
    return [];
  }
})();
