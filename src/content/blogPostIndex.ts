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
 * @property readTime - Estimated reading time (e.g., "5 min read") (automatically calculated)
 * @property categories - Array of detailed category tags for SEO and display purposes
 * @property searchCategories - Array of simplified categories for search and filtering
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
  categories: string[];
  searchCategories: string[];
  featured?: boolean;
  coverImage: string;
  /**
   * Optional credit for the cover image. Displayed as small text below the image in the markdown render.
   */
  coverImageCredit?: string;
  /**
   * Optional author override for this post. If not provided, the global AUTHOR is used.
   */
  author?: {
    name: string;
    avatar: string;
  };
  /**
   * Automatically calculated read time (minutes read, e.g., "5 min read")
   */
  readTime?: string;
}

// Utility to calculate read time from markdown content
function calculateReadTime(markdown: string): string {
  // Remove code blocks and HTML tags for a more accurate word count
  const text = markdown
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/<[^>]+>/g, '') // remove HTML tags
    .replace(/[#$*_\->`~\]]/g, '') // remove markdown symbols (escape only - and ])
    .replace(/\n/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min read`;
}

export const blogPosts: BlogPost[] = BLOG_POST_SLUGS.map(slug => {
  const post = POST_MAP[slug];
  return {
    ...post,
    readTime: calculateReadTime(post.content),
  };
}).filter(Boolean);
