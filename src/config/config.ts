// Blog global configuration
// Central place to change all user-specific settings

// ===== DEPLOYMENT CONFIG =====
export const BLOG_BASE_PATH = "/blog"; // Change this to "/book-blog" or any other base path as needed
export const BASE_URL = "https://thisiskushal31.github.io/blog/"; // Change to your deployed endpoint
export const PORTFOLIO_URL = "https://thisiskushal31.github.io/"; // Change to your portfolio URL

// ===== AUTHOR CONFIG =====
export const AUTHOR = {
  name: "Kushal Gupta",
  title: "Tech Professional",
  avatar: "/blog/profile.jpeg", // Change this path as needed
  bio: "Insights, tutorials, and thoughts on technology, development, and everything in between.",
  location: "Global",
  website: "https://thisiskushal31.github.io/",
};

// ===== SOCIAL LINKS =====
export const SOCIAL_LINKS = {
  github: "https://github.com/thisiskushal31",
  linkedin: "https://www.linkedin.com/in/thisiskushalgupta/",
  portfolio: "https://thisiskushal31.github.io/",
  twitter: "", // Add your Twitter URL if you have one
  email: "", // Add your email if you want to display it
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
  defaultTheme: "system", // "light" | "dark" | "system"
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
