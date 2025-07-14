// markdownLoader.ts - Utility for loading and providing markdown content for the blog app.
// Supports dynamic loading from file paths and static content for tutorials/examples.
// If loading fails, an error is logged and a fallback message is returned.

/**
 * loadMarkdownContent - Loads markdown content from a file path (async).
 * @param filePath - The path to the markdown file
 * @returns The markdown content as a string, or an error message on failure
 */
export async function loadMarkdownContent(filePath: string): Promise<string> {
  try {
    // For development, we can use dynamic imports
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    // Log the error and return a fallback message
    // eslint-disable-next-line no-console
    console.error('Error loading markdown file:', error);
    return `# Error Loading Content\n\nCould not load the markdown file from: ${filePath}\n\nPlease check the file path and try again.`;
  }
}

// Static markdown content for examples/tutorials
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

/**
 * getMarkdownContent - Retrieves static markdown content by file name.
 * @param fileName - The key for the markdown content
 * @returns The markdown content as a string, or an error message on failure
 */
export function getMarkdownContent(fileName: string): string {
  try {
    const content = markdownContent[fileName as keyof typeof markdownContent];
    if (!content) {
      throw new Error(`No markdown content found for: ${fileName}`);
    }
    return content;
  } catch (error) {
    // Log the error and return a fallback message
    // eslint-disable-next-line no-console
    console.error('Error getting markdown content:', error);
    return `# Error Loading Content\n\nCould not load the markdown file: ${fileName}\n\nPlease check the file name and try again.`;
  }
} 