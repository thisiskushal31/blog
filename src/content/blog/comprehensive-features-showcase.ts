import { BlogPost } from '../blogPostIndex';
import content from './markdown/comprehensive-features-showcase.md?raw';

export const blogPost: BlogPost = {
  slug: "comprehensive-features-showcase",
  title: "Complete Markdown Features Showcase",
  subtitle: "Demonstrating all blog rendering capabilities",
  excerpt: "A comprehensive demonstration of all markdown features including embedded media, syntax highlighting, image captions, and external content loading capabilities.",
  content,
  publishDate: "2024-01-15",
  readTime: "8 min read",
  categories: ["Showcase", "Features", "Demo"],
  featured: true,
  coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
  author: {
    name: "Blog Platform",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
};