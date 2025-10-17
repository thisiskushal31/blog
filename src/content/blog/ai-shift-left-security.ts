import { BlogPost } from '../blogPostIndex';
import content from './markdown/ai-shift-left-security.md?raw';

export const blogPost: BlogPost = {
  slug: "ai-shift-left-security",
  title: "From Bottleneck to Accelerator: How AI Automation Enables True Shift Left Security",
  subtitle: "Transform security from a gatekeeper into an accelerator with AI-powered shift-left strategies",
  excerpt: "Traditional security models create bottlenecks that slow down development. AI automation transforms security from a gatekeeper into an accelerator, enabling true shift-left security integration that catches issues early without slowing teams down.",
  content,
  publishDate: "2025-10-18",
  categories: ["DevSecOps"],
  searchCategories: ["AI Security", "DevSecOps", "Automation"],
  featured: true,
  coverImage: "/blog/blogImages/ai-security-shift-left.png",
  // coverImageCredit: "AI Security concept illustration"
};
