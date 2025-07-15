// blogPostIndex.ts - Central index for all blog post metadata and content.
// Imports and exports all blog posts for the blog app. Used for listing and looking up posts.
// If loading fails, an error is logged and an empty array is returned.

import { BLOG_POST_SLUGS, POST_MAP } from '../config/blogPosts.config';

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
 * @property coverImageCredit - Optional credit for the cover image
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
  /**
   * Optional credit for the cover image. Displayed as small text below the image in the markdown render.
   */
  coverImageCredit?: string;
  // author is now always global
}

export const blogPosts: BlogPost[] = BLOG_POST_SLUGS.map(slug => POST_MAP[slug]).filter(Boolean);
