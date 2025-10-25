// GitHub-style Markdown Renderer
// Custom renderer that mimics GitHub's markdown rendering exactly
// Clean architecture with proper separation of concerns

import { Renderer } from 'marked';
import { marked } from 'marked';

export class GitHubRenderer extends Renderer {
  // Headings with GitHub-style styling and anchor links
  heading({ tokens, depth }: any): string {
    const level = depth as 1 | 2 | 3 | 4 | 5 | 6;
    const text = this.parser.parseInline(tokens);
    const id = this.slugger.slug(text);
    const anchorClass = 'group relative scroll-mt-20';
    const headingClass = `text-${this.getHeadingSize(level)} font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-6`;
    const anchorId = `user-content-${id}`;
    
    return `
      <h${level} id="${anchorId}" class="${anchorClass}">
        <a 
          class="anchor absolute -ml-10 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
          aria-label="Link to this section" 
          href="#${id}"
        >
          <svg class="octicon octicon-link" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
          </svg>
        </a>
        <span class="${headingClass}">${text}</span>
      </h${level}>
    `;
  }

  // Code blocks with GitHub-style syntax highlighting
  code(code: string, language?: string, escaped?: boolean): string {
    const lang = language || 'text';
    const langClass = language ? `language-${lang}` : '';
    
    return `
      <div class="highlight highlight-${lang} notranslate">
        <pre class="notranslate">
          <code class="${langClass}">${escaped ? code : this.escapeHtml(code)}</code>
        </pre>
      </div>
    `;
  }

  // Inline code with GitHub styling
  codespan(code: string): string {
    return `<code class="notranslate">${this.escapeHtml(code)}</code>`;
  }

  // Tables with GitHub styling
  table(header: string, body: string): string {
    return `
      <div class="table-wrapper">
        <table class="highlight tab-size js-file-line-container">
          <thead>
            ${header}
          </thead>
          <tbody>
            ${body}
          </tbody>
        </table>
      </div>
    `;
  }

  tablerow(content: string): string {
    return `<tr>${content}</tr>`;
  }

  tablecell(content: string, flags: { header?: boolean; align?: string }): string {
    const tag = flags.header ? 'th' : 'td';
    const alignClass = flags.align ? `text-${flags.align}` : '';
    return `<${tag} class="${alignClass}">${content}</${tag}>`;
  }

  // Blockquotes with GitHub styling
  blockquote(quote: string): string {
    return `
      <blockquote>
        <p>${quote}</p>
      </blockquote>
    `;
  }

  // Lists with proper GitHub styling
  list(body: string, ordered: boolean, start?: number): string {
    const tag = ordered ? 'ol' : 'ul';
    const startAttr = ordered && start !== 1 ? ` start="${start}"` : '';
    return `<${tag}${startAttr}>${body}</${tag}>`;
  }

  listitem(text: string, task?: boolean, checked?: boolean): string {
    if (task) {
      const checkedAttr = checked ? 'checked' : '';
      return `
        <li class="task-list-item">
          <input type="checkbox" class="task-list-item-checkbox" ${checkedAttr} disabled>
          ${text.replace(/^\[[ x]\]\s*/, '')}
        </li>
      `;
    }
    return `<li>${text}</li>`;
  }

  // Links with GitHub styling
  link(href: string, title: string | null, text: string): string {
    const titleAttr = title ? ` title="${this.escapeHtml(title)}"` : '';
    const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
    const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    
    return `<a href="${href}"${titleAttr}${targetAttr}>${text}</a>`;
  }

  // Images with GitHub styling
  image(href: string, title: string | null, text: string): string {
    const titleAttr = title ? ` title="${this.escapeHtml(title)}"` : '';
    const altAttr = text ? ` alt="${this.escapeHtml(text)}"` : '';
    
    return `
      <div class="image-wrapper">
        <img src="${href}"${altAttr}${titleAttr} class="max-w-full h-auto">
      </div>
    `;
  }

  // Horizontal rules
  hr(): string {
    return '<hr class="my-6 border-gray-200 dark:border-gray-700">';
  }

  // Paragraphs
  paragraph(text: string): string {
    return `<p class="mb-4">${text}</p>`;
  }

  // Strong and emphasis
  strong(text: string): string {
    return `<strong class="font-semibold">${text}</strong>`;
  }

  em(text: string): string {
    return `<em class="italic">${text}</em>`;
  }

  // Strikethrough
  del(text: string): string {
    return `<del class="line-through">${text}</del>`;
  }

  // Helper methods
  private getHeadingSize(level: number): string {
    const sizes = {
      1: 'text-3xl',
      2: 'text-2xl', 
      3: 'text-xl',
      4: 'text-lg',
      5: 'text-base',
      6: 'text-sm'
    };
    return sizes[level] || 'text-base';
  }

  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

// GitHub Markdown Parser
export class GitHubMarkdownParser {
  private renderer: GitHubRenderer;
  private marked: typeof marked;

  constructor() {
    this.renderer = new GitHubRenderer();
    this.marked = marked;
    this.setupMarked();
  }

  private setupMarked(): void {
    this.marked.setOptions({
      renderer: this.renderer,
      gfm: true, // GitHub Flavored Markdown
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
      return this.marked.parse(markdown);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return `<div class="error">Error parsing markdown content</div>`;
    }
  }

  // Parse inline markdown
  parseInline(markdown: string): string {
    try {
      return this.marked.parseInline(markdown);
    } catch (error) {
      console.error('Error parsing inline markdown:', error);
      return markdown;
    }
  }
}

export default GitHubMarkdownParser;
