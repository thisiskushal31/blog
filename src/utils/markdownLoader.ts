// Utility to load markdown files dynamically
export async function loadMarkdownContent(filePath: string): Promise<string> {
  try {
    // For development, we can use dynamic imports
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading markdown file:', error);
    return `# Error Loading Content

Could not load the markdown file from: ${filePath}

Please check the file path and try again.`;
  }
}

// Simple approach: Define markdown content as strings
export const markdownContent = {
  'example-external-content': `# Example External Markdown Content

This is a markdown file that can be loaded as blog content.

## Features Demonstrated

### Code Blocks
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

### Images with Credits
![Sample Image](/blog/blogImages/blog.jpg)
*Credit: Photo by John Doe on Unsplash*

### Embedded Media
[youtube_embed id="dQw4w9WgXcQ" alt="Rick Astley - Never Gonna Give You Up" credit="Rick Astley Official"]

[gist_embed id="Ana-14x/13c4950303734c28ea97db9981fced2c" alt="React useDebounce hook example" credit="Ana-14x on GitHub"]

### Lists
- Feature 1
- Feature 2
- Feature 3

### Tables
| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Images | ✅ |
| Embeds | ✅ |
| Credits | ✅ |

## Conclusion
This demonstrates loading external markdown files as blog content.`,

  'sample-tutorial': `# Sample Tutorial

This is a sample tutorial markdown file.

## Getting Started

1. Install dependencies
2. Run the development server
3. Start coding!

\`\`\`bash
npm install
npm run dev
\`\`\`

## Next Steps

Continue with the tutorial...`,

  // Add more markdown content here
};

export function getMarkdownContent(fileName: string): string {
  const content = markdownContent[fileName as keyof typeof markdownContent];
  if (!content) {
    return `# Error Loading Content

Could not load the markdown file: ${fileName}

Please check the file name and try again.`;
  }
  return content;
} 