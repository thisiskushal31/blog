# Complete Markdown Features Showcase

This blog post demonstrates all the advanced markdown rendering features implemented in this blog platform.

## 🎯 Overview

This sample post showcases:
- **DOMPurify sanitization** for secure HTML rendering
- **Lazy loading** for images and iframes
- **Embedded media support** (YouTube, GitHub Gists)
- **Syntax highlighting** for code blocks
- **Image captions and credits**
- **Responsive design** for all media elements

## 📸 Image with Caption

![DevOps Pipeline](https://images.unsplash.com/photo-1667372393119-5d6cdef1e383?w=800&h=400&fit=crop)

*Caption: A modern CI/CD pipeline showing automated testing and deployment stages*

## 🎥 Embedded YouTube Video

@youtube[dQw4w9WgXcQ]

*Credit: Rick Astley - Never Gonna Give You Up (Official Music Video)*

## 💻 Code Syntax Highlighting

### JavaScript Example

```javascript
// Modern JavaScript with async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Usage with destructuring
const { name, email, preferences } = await fetchUserData(123);
console.log(`User: ${name}, Email: ${email}`);
```

### TypeScript Example

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

class UserService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getUser(id: number): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    return response.json();
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  }
}
```

### Docker Configuration

```dockerfile
# Multi-stage build for Node.js application
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/node_modules ./node_modules
COPY . .

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
```

### Kubernetes Manifest

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: blog-app
  labels:
    app: blog-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: blog-app
  template:
    metadata:
      labels:
        app: blog-app
    spec:
      containers:
      - name: blog-app
        image: blog-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: blog-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: blog-service
spec:
  selector:
    app: blog-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

## 🔗 GitHub Gist Integration

<!-- To embed a Gist, use the script tag as below. You can add more Gists by changing the src URL. -->
<script src="https://gist.github.com/Ana-14x/13c4950303734c28ea97db9981fced2c.js"></script>

*Credit: Ana-14x - React Component Example*

## 📊 Another Image with Credit

![Kubernetes Cluster](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop)

*Credit: Unsplash - Kubernetes cluster management interface*

## 🎬 Another Embedded Video

@youtube[ee7uBc2IZvs]

*Credit: Me at the zoo - First YouTube video ever uploaded*

## 📊 Markdown Tables

This section demonstrates proper markdown table rendering with clean, Medium-like styling:

| **Feature** | **Status** | **Description** |
|-------------|------------|-----------------|
| **DOMPurify Sanitization** | ✅ Complete | Secure HTML rendering with XSS protection |
| **Lazy Loading** | ✅ Complete | Images and iframes load only when needed |
| **Embedded Media** | ✅ Complete | YouTube videos and GitHub Gists support |
| **Syntax Highlighting** | ✅ Complete | Prism.js with multiple language support |
| **Image Captions** | ✅ Complete | Alt text and credit support for images |
| **Responsive Design** | ✅ Complete | Mobile-first responsive layout |
| **External Content** | ✅ Complete | Load markdown from external files |
| **Table Rendering** | ✅ Complete | Clean, Medium-style table formatting |

### Comparison Table

| **Platform** | **Pros** | **Cons** |
|--------------|----------|----------|
| **Medium** | Excellent typography, built-in audience | Limited customization, paywall |
| **Dev.to** | Developer-focused, free | Less design control |
| **Hashnode** | Custom domains, good SEO | Smaller community |
| **WordPress** | Full control, extensive plugins | Requires maintenance |
| **Custom Blog** | Complete control, unique design | Requires development time |

## 📝 External Markdown Content

This section demonstrates loading content from external markdown files:

```typescript
// Example of loading external markdown content
import { loadMarkdownContent } from '@/utils/markdownLoader';

const externalContent = await loadMarkdownContent('/content/external-example.md');
```

## 🔧 Advanced Features

### 1. **DOMPurify Sanitization**
All HTML content is sanitized using DOMPurify to prevent XSS attacks while preserving safe HTML elements.

### 2. **Lazy Loading**
Images and iframes are loaded lazily to improve page performance:
- Images use `loading="lazy"` attribute
- Iframes are loaded only when they come into viewport
- Placeholder content is shown during loading

### 3. **Custom Web Components**
- **YouTube Embed**: `@youtube[videoId]` syntax
- **GitHub Gist**: `@gist[username/gistId]` syntax
- **Responsive Design**: All embeds are responsive and mobile-friendly

### 4. **Syntax Highlighting**
Code blocks support multiple languages with Prism.js:
- JavaScript/TypeScript
- Python
- YAML/JSON
- Dockerfile
- Shell/Bash
- And many more...

### 5. **Image Captions & Credits**
- Use `*Caption: description*` for image captions
- Use `*Credit: attribution*` for image credits
- Supports both local and external images

## 🎨 Styling Features

### Typography
- **Headings**: Proper hierarchy with consistent spacing
- **Lists**: Both ordered and unordered lists with proper indentation
- **Blockquotes**: Styled with left border and italic text
- **Tables**: Responsive tables with proper borders and spacing

### Code Blocks
- **Inline code**: `monospace font with background`
- **Code blocks**: Syntax highlighting with line numbers
- **Language detection**: Automatic language detection for syntax highlighting

### Responsive Design
- **Mobile-first**: All content is mobile responsive
- **Flexible images**: Images scale properly on all devices
- **Embedded media**: YouTube videos and Gists are responsive

## 🚀 Performance Optimizations

1. **Lazy Loading**: Images and iframes load only when needed
2. **Sanitization**: Secure HTML rendering prevents XSS
3. **Optimized CSS**: Minimal CSS with efficient selectors
4. **Code Splitting**: Components are loaded on demand

## 📱 Mobile Experience

All features work seamlessly on mobile devices:
- Touch-friendly navigation
- Responsive embedded media
- Readable typography on small screens
- Optimized image loading

## 🔒 Security Features

- **DOMPurify**: Sanitizes all HTML content
- **Content Security Policy**: Prevents malicious scripts
- **Safe URLs**: Validates external links and embeds
- **XSS Protection**: Multiple layers of security

## 🎯 Conclusion

This comprehensive showcase demonstrates all the advanced markdown rendering features available in this blog platform. From embedded media to syntax highlighting, every feature is designed to provide a rich, secure, and performant blogging experience.

The platform supports:
- ✅ Secure HTML rendering
- ✅ Lazy loading for performance
- ✅ Embedded media (YouTube, Gists)
- ✅ Syntax highlighting
- ✅ Image captions and credits
- ✅ Responsive design
- ✅ Mobile optimization
- ✅ External content loading

Ready to create your own blog posts with these powerful features! 