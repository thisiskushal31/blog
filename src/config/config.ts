// Blog global configuration
// Central place to change all user-specific settings
// For comprehensive profile management, see profile.json

import profileData from './profile.json';

// ===== DEPLOYMENT CONFIG =====
export const BLOG_BASE_PATH = "/blog"; // Change this to "/book-blog" or any other base path as needed
export const BASE_URL = "https://thisiskushal31.github.io/blog/"; // Change to your deployed endpoint
export const PORTFOLIO_URL = "https://thisiskushal31.github.io/"; // Change to your portfolio URL

// ===== AUTHOR CONFIG =====
export interface Author {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  publicProfile: string;
  email: string;
}

export const AUTHOR: Author = {
  name: profileData.personal.name,
  title: profileData.personal.title,
  avatar: profileData.personal.avatar,
  bio: profileData.personal.bio,
  location: profileData.personal.location,
  website: profileData.websites.portfolio,
  publicProfile: profileData.websites.publicProfile,
  email: profileData.personal.email,
};

// ===== SOCIAL LINKS =====
export const SOCIAL_LINKS = {
  github: profileData.social.github,
  linkedin: profileData.social.linkedin,
  portfolio: profileData.websites.portfolio,
  twitter: profileData.social.twitter,
  email: profileData.personal.email,
  publicProfile: profileData.websites.publicProfile,
};

// ===== BLOG CONFIGURATION =====
export const BLOG_CONFIG = {
  // Pagination
  postsPerPage: 6, // Number of posts to show per page
  featuredPostsCount: 3, // Number of featured posts to display
  
  // Reading time calculation
  wordsPerMinute: 200, // Average reading speed for time calculation
  
  // Search and filtering
  searchPlaceholder: "Search articles...",
  filterPlaceholder: "Filters",
  
  // Newsletter
  enableNewsletter: false, // Set to true when you're ready to enable newsletter
  newsletterTitle: "Stay Updated",
  newsletterDescription: "Get the latest articles and insights delivered to your inbox.",
  newsletterPlaceholder: "Enter your email",
  newsletterButtonText: "Subscribe",
  
  // SEO
  siteName: "Kushal Gupta | Tech Blog",
  siteDescription: "Insights, tutorials, and thoughts on technology, development, and everything in between.",
  siteKeywords: ["tech blog", "programming", "development", "tutorials", "technology"],
  
  // Analytics (add your tracking IDs)
  googleAnalytics: "", // Add your GA4 tracking ID
  googleTagManager: "", // Add your GTM ID
  
  // Comments (if you want to add commenting system)
  commentsEnabled: false,
  commentsProvider: "disqus", // "disqus" | "utterances" | "giscus"
  commentsConfig: {
    disqusShortname: "", // Add your Disqus shortname
    utterancesRepo: "", // Add your GitHub repo for Utterances
    giscusRepo: "", // Add your GitHub repo for Giscus
  },
};

// ===== THEME CONFIG =====
export const THEME_CONFIG = {
  defaultTheme: "light", // "light" | "dark" | "system"
  enableThemeToggle: true,
  enableReadingProgress: true,
  enableScrollToTop: true,
};

// ===== NAVIGATION CONFIG =====
export const NAVIGATION_CONFIG = {
  showSocialLinks: true,
  showCopyLinkButton: true,
  showThemeToggle: true,
  enableMobileMenu: false, // Set to true if you add mobile menu back
  showPublicProfileLink: true, // Show link to public profile
};

// ===== BLOG POST CONFIG =====
export const BLOG_POST_CONFIG = {
  enableReadTime: true,
  enableAuthorInfo: true,
  enablePublishDate: true,
  enableCategories: true,
  enableSearchCategories: true,
  enableFeaturedFlag: true,
  enableCoverImage: true,
  enableCoverImageCredit: true,
  enableTableOfContents: true,
  enableLinkableHeaders: true,
  enableShareButtons: false, // Set to true if you want to add share buttons
};

// ===== CENTRALIZED PROFILE EXPORT =====
// Export the complete profile data for use in other projects
export const PROFILE_DATA = profileData;

// Export individual profile sections for easy access
export const PERSONAL_INFO = profileData.personal;
export const WEBSITE_LINKS = profileData.websites;
export const SOCIAL_MEDIA = profileData.social;
export const PROFESSIONAL_INFO = profileData.professional;
export const PROJECTS = profileData.projects;
export const CONTACT_INFO = profileData.contact;
export const QUICK_ACTIONS = profileData.quickActions;
