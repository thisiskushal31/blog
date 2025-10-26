# Centralized Profile Management

This blog uses a centralized profile configuration system that makes it easy to keep all your profile information synchronized across different projects.

## 📁 Files

- **`src/config/profile.json`** - Central profile data (update this file to sync across all projects)
- **`src/config/config.ts`** - Blog-specific configuration that imports from profile.json

## 🔧 How to Update Your Profile

### 1. Update Central Profile Data
Edit `src/config/profile.json` to update your information:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio...",
    "avatar": "/blog/profile.jpeg",
    "email": "your@email.com"
  },
  "websites": {
    "portfolio": "https://your-portfolio.com",
    "blog": "https://your-blog.com",
    "publicProfile": "https://your-public-profile.com"
  },
  "social": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "twitter": "https://twitter.com/yourusername"
  }
}
```

### 2. Profile Sections

- **`personal`** - Basic personal information
- **`websites`** - All your website URLs
- **`social`** - Social media links (GitHub, LinkedIn, Twitter, etc.)
- **`professional`** - Skills, interests, current role
- **`projects`** - Featured projects
- **`contact`** - Contact information
- **`quickActions`** - Comprehensive list of all your links and profiles
- **`preferences`** - Theme and language preferences

## 🚀 Using in Other Projects

To use this profile data in other projects:

1. Copy `profile.json` to your other project
2. Import the data:
   ```javascript
   import profileData from './path/to/profile.json';
   
   // Access specific sections
   const { name, title, bio } = profileData.personal;
   const { github, linkedin } = profileData.social;
   ```

## 🔗 Public Profile Link

The blog now includes a "View My Public Profile" button that links to your centralized profile page. This makes it easy for visitors to find all your links and information in one place.

## 📱 Navigation Bar Removal

Since you plan to remove the navigation bar, the public profile link provides easy access to all your important links and information.

## 🎯 Benefits

- **Single Source of Truth**: Update once, sync everywhere
- **Consistency**: All projects use the same information
- **Easy Maintenance**: No need to update multiple files
- **Scalability**: Easy to add new projects and information

## 🔄 Sync Process

1. Update `profile.json` with new information
2. The blog automatically uses the updated data
3. Copy the updated `profile.json` to other projects
4. All your profiles stay synchronized!

## 📝 Example Usage in Components

```tsx
import { AUTHOR, SOCIAL_LINKS, PROFILE_DATA } from '@/config/config';

// Use in components
<h1>Hi, I'm {AUTHOR.name}</h1>
<p>{AUTHOR.bio}</p>
<a href={AUTHOR.publicProfile}>View My Profile</a>

// Access full profile data
const { skills, interests } = PROFILE_DATA.professional;

// Access comprehensive links
const allLinks = PROFILE_DATA.quickActions;
const socialLinks = PROFILE_DATA.social;
```
