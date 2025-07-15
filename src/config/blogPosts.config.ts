import { BlogPost } from '../content/blogPostIndex';

// Static imports for all posts (add new imports here)
import { blogPost as comprehensiveFeaturesShowcase } from '../content/blog/comprehensive-features-showcase';
// Add new imports above

export const BLOG_POST_SLUGS = [
  'comprehensive-features-showcase',
  // Add new post slugs here (must match the .ts file in ./blog/)
];

export const POST_MAP: Record<string, BlogPost> = {
  'comprehensive-features-showcase': comprehensiveFeaturesShowcase,
  // Add new slug: import pairs here
}; 