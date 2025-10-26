// Markdown Renderer
// Blog markdown renderer with styling support
// Clean implementation for rendering blog post content

import { marked } from 'marked';

export class BlogMarkdownRenderer {
  private marked: typeof marked;
  private openLinksInNewTab: boolean;

  constructor(openLinksInNewTab: boolean = false) {
    this.marked = marked;
    this.openLinksInNewTab = openLinksInNewTab;
    this.setupMarked();
  }

  private setupMarked(): void {
    this.marked.setOptions({
      gfm: true, // GitHub Flavored Markdown (enables tables, strikethrough, etc.)
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
  }

  parse(markdown: string): string {
    try {
      let html = this.marked.parse(markdown);
      
      // Apply custom enhancements
      html = this.enhanceWithGitHubStyling(html);
      
      return html;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return '<div class="error">Error parsing markdown content</div>';
    }
  }

  private enhanceWithGitHubStyling(html: string): string {
    // Add custom classes and enhancements
    
    // Process custom embeds first
    html = this.processCustomEmbeds(html);
    
    // Headings with anchor links
    html = html.replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, (match, level, content) => {
      const cleanContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags for ID
      const id = this.slugify(cleanContent);
      const headingClass = this.getHeadingClass(parseInt(level));
      
      return `
        <h${level} id="user-content-${id}" class="group relative scroll-mt-20 ${headingClass}">
          <a 
            class="anchor absolute -ml-10 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
            aria-label="Link to this section" 
            href="#${id}"
          >
            <svg class="octicon octicon-link" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
            </svg>
          </a>
          <span>${content}</span>
        </h${level}>
      `;
    });

    // Code blocks with syntax highlighting (with language)
    html = html.replace(/<pre><code class="language-([^"]+)"[^>]*>(.*?)<\/code><\/pre>/gs, (match, lang, code) => {
      // Remove leading whitespace from code content
      const trimmedCode = code.replace(/^\s+/, '');
      return `<div class="highlight highlight-${lang} notranslate">
<pre class="notranslate"><code class="language-${lang}">${trimmedCode}</code></pre>
</div>`;
    });

    // Code blocks with language-none (like decision trees)
    html = html.replace(/<pre><code class="language-none"[^>]*>(.*?)<\/code><\/pre>/gs, (match, code) => {
      // Remove leading whitespace from code content
      const trimmedCode = code.replace(/^\s+/, '');
      return `<div class="highlight highlight-none notranslate">
<pre class="notranslate"><code class="language-none">${trimmedCode}</code></pre>
</div>`;
    });

    // Code blocks without language specification
    html = html.replace(/<pre><code[^>]*>(.*?)<\/code><\/pre>/gs, (match, code) => {
      // Remove leading whitespace from code content
      const trimmedCode = code.replace(/^\s+/, '');
      return `<div class="highlight notranslate">
<pre class="notranslate"><code>${trimmedCode}</code></pre>
</div>`;
    });

    // Inline code
    html = html.replace(/<code>(.*?)<\/code>/g, '<code class="notranslate">$1</code>');

    // Tables with custom styling
    html = html.replace(/<table>/g, '<div class="table-wrapper"><table class="highlight tab-size js-file-line-container">');
    html = html.replace(/<\/table>/g, '</table></div>');

    // Blockquotes
    html = html.replace(/<blockquote>/g, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 text-gray-600 dark:text-gray-400">');

    // Links - configurable target behavior
    if (this.openLinksInNewTab) {
      // Process all links to add target="_blank" for ALL links in blog content
      // Use a more comprehensive regex that handles all link formats
      html = html.replace(/<a\s+([^>]*?)href="([^"]+)"([^>]*?)>([^<]+)<\/a>/g, (match, beforeHref, href, afterHref, text) => {
        // Add target="_blank" to ALL links in blog content
        if (!beforeHref.includes('target=') && !afterHref.includes('target=')) {
          return `<a ${beforeHref}href="${href}"${afterHref} target="_blank" rel="noopener noreferrer">${text}</a>`;
        }
        return match; // Return original if target already exists
      });

      // Also handle simple links without other attributes
      html = html.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, (match, href, text) => {
        // Add target="_blank" to ALL links in blog content
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      });
    }

    // Images with custom styling
    html = html.replace(/<img src="([^"]+)" alt="([^"]*)"(?: title="([^"]*)")?>/g, (match, src, alt, title) => {
      const titleAttr = title ? ` title="${title}"` : '';
      return `
        <div class="image-wrapper">
          <img src="${src}" alt="${alt}"${titleAttr} class="max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded">
        </div>
      `;
    });

    return html;
  }

  private getHeadingClass(level: number): string {
    const classes = {
      1: 'text-3xl font-bold mb-4 mt-6 border-b border-gray-200 dark:border-gray-700 pb-2',
      2: 'text-2xl font-semibold mb-4 mt-6 border-b border-gray-200 dark:border-gray-700 pb-2',
      3: 'text-xl font-semibold mb-3 mt-5',
      4: 'text-lg font-semibold mb-3 mt-4',
      5: 'text-base font-semibold mb-2 mt-3',
      6: 'text-sm font-semibold mb-2 mt-3 text-gray-600 dark:text-gray-400'
    };
    return classes[level as keyof typeof classes] || 'text-base font-semibold mb-2 mt-3';
  }

  private processCustomEmbeds(html: string): string {
    // Process YouTube embeds: @youtube[videoId]
    html = html.replace(/@youtube\[([^\]]+)\]/g, (match, videoId) => {
      return `<div class="youtube-embed-placeholder" data-video-id="${videoId}"></div>`;
    });

    // Process GitHub Gist embeds: @gist[username/gistId]
    html = html.replace(/@gist\[([^\]]+)\]/g, (match, gistId) => {
      return `
        <div class="gist-embed-wrapper my-6" data-gist-id="${gistId}">
          <div class="gist-loading">Loading Gist...</div>
        </div>
      `;
    });

    // Process existing GitHub Gist script tags
    html = html.replace(/<script src="https:\/\/gist\.github\.com\/([^"]+)\.js"><\/script>/g, (match, gistId) => {
      return `
        <div class="gist-embed-wrapper my-6" data-gist-id="${gistId}">
          <div class="gist-loading">Loading Gist...</div>
        </div>
      `;
    });

    return html;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }
}

export default SimpleGitHubRenderer;
