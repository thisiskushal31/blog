
// Blog post imports - Add new blog posts here
import { blogPost as comprehensiveFeaturesShowcase } from './blog/comprehensive-features-showcase';

// Blog post interface - defines the structure of each blog post
export interface BlogPost {
  slug: string;           // URL-friendly identifier (e.g., "my-blog-post")
  title: string;          // Main title of the blog post
  subtitle?: string;      // Optional subtitle for additional context
  excerpt: string;        // Short description shown on blog listing page
  content: string;        // Full markdown content of the blog post
  publishDate: string;    // Publication date (YYYY-MM-DD format)
  readTime: string;       // Estimated reading time (e.g., "5 min read")
  categories: string[];   // Array of category tags for filtering
  featured?: boolean;     // Optional flag to mark post as featured
  coverImage: string;     // URL or path to cover image
  author: {
    name: string;         // Author's name
    avatar: string;       // URL or path to author's avatar image
  };
}

// Export all blog posts - Add new posts to this array
export const blogPosts: BlogPost[] = [
  comprehensiveFeaturesShowcase, // Comprehensive features showcase
];
