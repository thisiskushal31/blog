# Blog Configuration Guide

## 📁 Central Configuration Location
All user-specific settings are centralized in `/src/config/config.ts`

## 🔧 Configuration Sections

### 1. **DEPLOYMENT CONFIG**
```typescript
export const BLOG_BASE_PATH = "/blog"; // Base path for your blog
export const BASE_URL = "https://thisiskushal31.github.io/blog/"; // Your deployed URL
export const PORTFOLIO_URL = "https://thisiskushal31.github.io/"; // Your portfolio URL
```

### 2. **AUTHOR CONFIG**
```typescript
export const AUTHOR = {
  name: "Kushal Gupta",
  title: "Tech Professional", 
  avatar: "/blog/profile.jpeg",
  bio: "Insights, tutorials, and thoughts on technology...",
  location: "Global",
  website: "https://thisiskushal31.github.io/",
};
```

### 3. **SOCIAL LINKS**
```typescript
export const SOCIAL_LINKS = {
  github: "https://github.com/thisiskushal31",
  linkedin: "https://www.linkedin.com/in/thisiskushalgupta/",
  portfolio: "https://thisiskushal31.github.io/",
  twitter: "", // Add your Twitter URL
  email: "", // Add your email
};
```

### 4. **BLOG CONFIGURATION**
```typescript
export const BLOG_CONFIG = {
  // Pagination
  postsPerPage: 6, // Number of posts per page
  featuredPostsCount: 3, // Number of featured posts
  
  // Reading time
  wordsPerMinute: 200, // Reading speed for time calculation
  
  // Search & Filter
  searchPlaceholder: "Search articles...",
  filterPlaceholder: "Filters",
  
  // Newsletter
  newsletterTitle: "Stay Updated",
  newsletterDescription: "Get the latest articles...",
  newsletterPlaceholder: "Enter your email",
  newsletterButtonText: "Subscribe",
  
  // SEO
  siteName: "Kushal Gupta | Tech Blog",
  siteDescription: "Insights, tutorials...",
  siteKeywords: ["tech blog", "programming", "development"],
  
  // Analytics (optional)
  googleAnalytics: "", // Add your GA4 tracking ID
  googleTagManager: "", // Add your GTM ID
};
```

### 5. **THEME CONFIG**
```typescript
export const THEME_CONFIG = {
  defaultTheme: "system", // "light" | "dark" | "system"
  enableThemeToggle: true,
  enableReadingProgress: true,
  enableScrollToTop: true,
};
```

### 6. **NAVIGATION CONFIG**
```typescript
export const NAVIGATION_CONFIG = {
  showSocialLinks: true,
  showCopyLinkButton: true,
  showThemeToggle: true,
  enableMobileMenu: false,
};
```

### 7. **BLOG POST CONFIG**
```typescript
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
  enableShareButtons: false,
};
```

## 🚀 How to Update Settings

1. **Open** `/src/config/config.ts`
2. **Edit** the values you want to change
3. **Save** the file
4. **Refresh** your browser - changes apply automatically!

## 📝 Common Updates

### Change Posts Per Page
```typescript
postsPerPage: 9, // Change from 6 to 9
```

### Update Social Links
```typescript
linkedin: "https://www.linkedin.com/in/your-new-profile/",
twitter: "https://twitter.com/yourusername",
```

### Modify Newsletter Text
```typescript
newsletterTitle: "Subscribe to Updates",
newsletterDescription: "Get notified about new posts...",
```

### Add Analytics
```typescript
googleAnalytics: "G-XXXXXXXXXX", // Your GA4 tracking ID
```

## ✅ Benefits

- **Single Source of Truth**: All settings in one place
- **Easy Maintenance**: No hunting for hardcoded values
- **Consistency**: All components use the same values
- **Future-Proof**: Easy to add new configuration options
- **Type Safety**: TypeScript ensures correct configuration

## 🔄 Auto-Applied Changes

These settings automatically update across the entire blog:
- Posts per page
- Featured posts count
- Search placeholders
- Newsletter text
- Social links
- Author information
- Reading time calculation
- SEO metadata

No need to restart the development server - just save and refresh! 🎉
