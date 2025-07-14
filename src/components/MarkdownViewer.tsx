// MarkdownViewer.tsx - Renders markdown content as sanitized, styled HTML with syntax highlighting and embedded media.
// Handles custom web components, code highlighting, image captions, tables, and more. All HTML is sanitized for security.
// If rendering fails, an error is logged and a fallback UI is shown.
import { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-git";
import "prismjs/components/prism-markdown";

interface MarkdownViewerProps {
  content: string;
  className?: string;
  postSlug?: string;
}

// Custom web components for embedded media
class YouTubeEmbed extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const videoId = this.getAttribute('video-id');
    const altText = this.getAttribute('alt') || `YouTube video: ${videoId}`;
    const shadow = this.shadowRoot!;
    
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 100%;
          margin: 1rem 0;
        }
        .youtube-container {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          background: #000;
          border-radius: 8px;
          overflow: hidden;
        }
        .youtube-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          loading: lazy;
        }
        .youtube-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f0f0;
          color: #666;
          font-family: Arial, sans-serif;
        }
        .youtube-alt {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #666;
          font-style: italic;
        }
      </style>
      <div class="youtube-container">
        <div class="youtube-placeholder">Loading YouTube video...</div>
        <iframe 
          class="youtube-iframe"
          src="https://www.youtube.com/embed/${videoId}?rel=0"
          title="${altText}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy">
        </iframe>
      </div>
      <div class="youtube-alt">${altText}</div>
    `;
  }
}

class GistEmbed extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const gistId = this.getAttribute('gist-id');
    const altText = this.getAttribute('alt') || `GitHub Gist: ${gistId}`;
    const shadow = this.shadowRoot!;
    
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 100%;
          margin: 1rem 0;
        }
        .gist-container {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e1e4e8;
        }
        .gist-iframe {
          width: 100%;
          border: none;
          loading: lazy;
        }
        .gist-alt {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #666;
          font-style: italic;
        }
      </style>
      <div class="gist-container">
        <iframe 
          class="gist-iframe"
          src="https://gist.github.com/${gistId}.js"
          title="${altText}"
          loading="lazy">
        </iframe>
      </div>
      <div class="gist-alt">${altText}</div>
    `;
  }
}

// Register custom elements
if (typeof window !== 'undefined') {
  if (!customElements.get('youtube-embed')) {
    customElements.define('youtube-embed', YouTubeEmbed);
  }
  if (!customElements.get('gist-embed')) {
    customElements.define('gist-embed', GistEmbed);
  }
}

const MarkdownViewer = ({ content, className = "", postSlug }: MarkdownViewerProps) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhanced markdown to HTML converter with security and features
    const convertMarkdownToHtml = (markdown: string) => {
      try {
        let html = markdown;

        // First, protect code blocks by temporarily replacing them
        const codeBlocks: string[] = [];
        html = html.replace(/```[\s\S]*?```/g, (match) => {
          const index = codeBlocks.length;
          codeBlocks.push(match);
          return `__CODE_BLOCK_${index}__`;
        });

        // Protect inline code
        const inlineCode: string[] = [];
        html = html.replace(/`[^`]+`/g, (match) => {
          const index = inlineCode.length;
          inlineCode.push(match);
          return `__INLINE_CODE_${index}__`;
        });

        // Process embedded media markers with alt text and credits
        // YouTube embeds: @youtube[VIDEO_ID]
        html = html.replace(/@youtube\[([^\]]+)\]/g, (match, videoId) => {
          const altText = `YouTube video: ${videoId}`;
          return `<div class="embedded-media">
            <youtube-embed video-id="${videoId}" alt="${altText}"></youtube-embed>
          </div>`;
        });
        
        // Gist embeds: Handle both @gist[USERNAME/GIST_ID] and script tags
        html = html.replace(/@gist\[([^\]]+)\]/g, (match, gistId) => {
          const altText = `GitHub Gist: ${gistId}`;
          return `<div class="embedded-media">
            <gist-embed gist-id="${gistId}" alt="${altText}"></gist-embed>
          </div>`;
        });

        // Handle script tags for Gist embeds - convert to direct API fetch
        html = html.replace(/<script src="https:\/\/gist\.github\.com\/([^/]+)\/([^"]+)\.js"><\/script>/g, (match, username, gistId) => {
          const fullGistId = `${username}/${gistId}`;
          return `<div class="embedded-media gist-container" data-gist="${fullGistId}">
            <div class="gist-loading">Loading Gist: ${fullGistId}...</div>
          </div>`;
        });

        // Headers with linkable functionality (h1, h2, h3)
        const getBaseUrl = () => {
          if (typeof window === "undefined") return "";
          const { origin, pathname, search, hash } = window.location;
          const hashParts = hash.split("#");
          const hashRoute = hashParts.length > 1 ? "#/" + hashParts[1].replace(/^\/?/, "") : "";
          return `${origin}${pathname}${search}${hashRoute}`;
        };

        // Render headings as clickable links with id for anchor navigation
        const getCurrentUrl = () => {
          if (typeof window === "undefined") return "";
          const { pathname, hash } = window.location;
          // For hash-based routing, construct the full URL
          if (hash) {
            return `${pathname}${hash}`;
          }
          return pathname;
        };

        html = html.replace(/^### (.*$)/gim, (match, title) => {
          // Clean the title for ID generation (remove emojis and special chars)
          const cleanTitle = title.replace(/[^\w\s-]/g, "").trim();
          const id = cleanTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
          const href = postSlug ? `/blog/${postSlug}#${id}` : `#${id}`;
          return `<h3 id="${id}" class="group relative scroll-mt-8 text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
            <span class="text-foreground">${title}</span>
            <button 
              data-href="${href}"
              class="copy-link-btn opacity-100 transition-opacity p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Copy link to this section"
            >
              <svg class="h-4 w-4 inline-block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
            </button>
          </h3>`;
        });

        html = html.replace(/^## (.*$)/gim, (match, title) => {
          // Clean the title for ID generation (remove emojis and special chars)
          const cleanTitle = title.replace(/[^\w\s-]/g, "").trim();
          const id = cleanTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
          const href = postSlug ? `/blog/${postSlug}#${id}` : `#${id}`;
          return `<h2 id="${id}" class="group relative scroll-mt-8 text-2xl font-semibold mb-6 mt-8 flex items-center gap-2">
            <span class="text-foreground">${title}</span>
            <button 
              data-href="${href}"
              class="copy-link-btn opacity-100 transition-opacity p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Copy link to this section"
            >
              <svg class="h-4 w-4 inline-block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
            </button>
          </h2>`;
        });

        html = html.replace(/^# (.*$)/gim, (match, title) => {
          // Clean the title for ID generation (remove emojis and special chars)
          const cleanTitle = title.replace(/[^\w\s-]/g, "").trim();
          const id = cleanTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
          const href = postSlug ? `/blog/${postSlug}#${id}` : `#${id}`;
          return `<h1 id="${id}" class="group relative scroll-mt-8 text-3xl font-bold mb-8 mt-10 flex items-center gap-2">
            <span class="text-foreground">${title}</span>
            <button 
              data-href="${href}"
              class="copy-link-btn opacity-100 transition-opacity p-1 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Copy link to this section"
            >
              <svg class="h-4 w-4 inline-block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
            </button>
          </h1>`;
        });

        // --- IMAGE CAPTION/CREDIT SUPPORT ---
        // Replace images and capture the next line if it's a credit/caption
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)\n(\*\s*(Credit|Caption):[^\n]+)?/g, (match, alt, src, captionLine) => {
          let captionHtml = '';
          if (captionLine) {
            const captionText = captionLine.replace(/^\*\s*(Credit|Caption):\s*/, '');
            captionHtml = `<div class="image-caption text-sm text-muted-foreground mt-2 italic">${captionText}</div>`;
          }
          return `<div class="image-with-caption"><img src="${src}" alt="${alt}" class="w-full rounded-lg shadow-lg my-4" loading="lazy" data-original-src="${src}" onerror="this.onerror=null; if(this.dataset.originalSrc.startsWith('/blog/')) { this.src = this.dataset.originalSrc.replace('/blog/', '/'); } else if(this.dataset.originalSrc.startsWith('/')) { this.src = this.dataset.originalSrc.replace('/', '/blog/'); } else { this.src = '/placeholder.svg'; }" />${captionHtml}</div>`;
        });

        // Tables - Process tables BEFORE other formatting
        const lines = html.split('\n');
        const tableLines: string[] = [];
        let inTable = false;
        let tableStartIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const isTableRow = line.trim().startsWith('|') && line.trim().endsWith('|');
          const isSeparatorRow = /^\s*\|(?:\s*-+\s*\|)+\s*$/.test(line);
          
          if (isTableRow && !inTable) {
            inTable = true;
            tableStartIndex = i;
            tableLines.push(line);
          } else if (inTable && isTableRow) {
            tableLines.push(line);
          } else if (inTable && !isTableRow) {
            // End of table - process it
            // Remove separator rows
            const filteredTableLines = tableLines.filter(l => !/^\s*\|(?:\s*-+\s*\|)+\s*$/.test(l));
            if (filteredTableLines.length >= 1) {
              const headerRow = filteredTableLines[0];
              const dataRows = filteredTableLines.slice(1);
              
              // Parse header
              const headerCells = headerRow.split('|').filter(cell => cell.trim()).map(cell => 
                cell.trim().replace(/^\*\*(.*?)\*\*$/, '$1')
              );
              
              const headerHtml = headerCells.map(cell => 
                `<th class="px-4 py-2 text-left font-semibold border-b">${cell}</th>`
              ).join('');
              
              // Parse data rows
              const dataRowsHtml = dataRows.map(row => {
                const cells = row.split('|').filter(cell => cell.trim()).map(cell => 
                  cell.trim().replace(/^\*\*(.*?)\*\*$/, '$1')
                );
                
                return cells.map(cell => 
                  `<td class="px-4 py-2 border-b">${cell}</td>`
                ).join('');
              }).map(rowHtml => `<tr>${rowHtml}</tr>`).join('');
              
              const tableHtml = `<div class="my-6 overflow-x-auto">
                <table class="w-full border-collapse border border-gray-200 dark:border-gray-700">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>${headerHtml}</tr>
                  </thead>
                  <tbody>
                    ${dataRowsHtml}
                  </tbody>
                </table>
              </div>`;
              
              // Replace the table lines with the HTML
              lines.splice(tableStartIndex, tableLines.length, tableHtml);
              i = tableStartIndex; // Reset index to process the new HTML
            }
            
            inTable = false;
            tableLines.length = 0;
          }
        }
        
        // Handle table at the end of content
        if (inTable && tableLines.length >= 1) {
          const filteredTableLines = tableLines.filter(l => !/^\s*\|(?:\s*-+\s*\|)+\s*$/.test(l));
          if (filteredTableLines.length >= 1) {
            const headerRow = filteredTableLines[0];
            const dataRows = filteredTableLines.slice(1);
            
            const headerCells = headerRow.split('|').filter(cell => cell.trim()).map(cell => 
              cell.trim().replace(/^\*\*(.*?)\*\*$/, '$1')
            );
            
            const headerHtml = headerCells.map(cell => 
              `<th class="px-4 py-2 text-left font-semibold border-b">${cell}</th>`
            ).join('');
            
            const dataRowsHtml = dataRows.map(row => {
              const cells = row.split('|').filter(cell => cell.trim()).map(cell => 
                cell.trim().replace(/^\*\*(.*?)\*\*$/, '$1')
              );
              
              return cells.map(cell => 
                `<td class="px-4 py-2 border-b">${cell}</td>`
              ).join('');
            }).map(rowHtml => `<tr>${rowHtml}</tr>`).join('');
            
            const tableHtml = `<div class="my-6 overflow-x-auto">
              <table class="w-full border-collapse border border-gray-200 dark:border-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>${headerHtml}</tr>
                </thead>
                <tbody>
                  ${dataRowsHtml}
                </tbody>
              </table>
            </div>`;
            
            lines.splice(tableStartIndex, tableLines.length, tableHtml);
          }
        }
        
        html = lines.join('\n');

        // Restore inline code first
        inlineCode.forEach((code, index) => {
          html = html.replace(
            `__INLINE_CODE_${index}__`,
            code.replace(
              /`([^`]+)`/g,
              '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>'
            )
          );
        });

        // Code blocks with syntax highlighting (restore them)
        codeBlocks.forEach((block, index) => {
          html = html.replace(
            `__CODE_BLOCK_${index}__`,
            block.replace(
              /```(\w+)?\n([\s\S]*?)```/g,
              (match, language, code) => {
                const lang = language || 'text';
                const highlightedCode = Prism.highlight(code, Prism.languages[lang] || Prism.languages.text, lang);
                return `<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code class="language-${lang}">${highlightedCode}</code></pre>`;
              }
            )
          );
        });

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        // Italic
        html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

        // Links
        html = html.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Lists
        html = html.replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
        html = html.replace(
          /^\d+\. (.*$)/gim,
          '<li class="ml-4 list-decimal">$1</li>'
        );

        // Wrap consecutive list items in ul/ol
        html = html.replace(
          /(<li class="ml-4 list-disc">.*?<\/li>)/gs,
          '<ul class="my-4">$1</ul>'
        );
        html = html.replace(
          /(<li class="ml-4 list-decimal">.*?<\/li>)/gs,
          '<ol class="my-4">$1</ol>'
        );

        // Paragraphs
        html = html.replace(/\n\n/g, '</p><p class="mb-4">');
        html = '<p class="mb-4">' + html + "</p>";

        // Clean up empty paragraphs
        html = html.replace(/<p class="mb-4"><\/p>/g, "");

        return html;
      } catch (err) {
        console.error('Error converting markdown to HTML:', err);
        return '<div class="text-red-500">Error rendering markdown content.</div>';
      }
    };

    let processedHtml = '';
    let sanitizedHtml = '';
    try {
      processedHtml = convertMarkdownToHtml(content);
      sanitizedHtml = DOMPurify.sanitize(processedHtml, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 's',
          'ul', 'ol', 'li',
          'a', 'img', 'iframe',
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'pre', 'code',
          'blockquote',
          'div', 'span',
          'svg', 'path', // For link icons in headings
          'youtube-embed', 'gist-embed', // Allow our custom elements
          'button' // For copy buttons
        ],
        ALLOWED_ATTR: [
          'href', 'src', 'alt', 'title', 'class', 'id',
          'target', 'rel', 'loading',
          'video-id', 'gist-id', 'alt', // Custom attributes for our web components
          'data-href', 'aria-label',
          'data-original-src', 'onerror', // For image fallback functionality
          'fill', 'viewBox', 'fill-rule', 'clip-rule', 'd', // SVG attributes
          'aria-hidden', // For accessibility
          'stroke-linecap', 'stroke-linejoin', 'stroke-width', 'stroke' // Added for SVG icons
        ],
        ALLOW_DATA_ATTR: true,
        KEEP_CONTENT: true
      });
    } catch (err) {
      console.error('Error sanitizing HTML:', err);
      sanitizedHtml = '<div class="text-red-500">Error rendering markdown content.</div>';
    }
    setHtmlContent(sanitizedHtml);
  }, [content]);

  // Clipboard copy handler using event delegation
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        const button = target.closest(".copy-link-btn") as HTMLButtonElement | null;
        if (button) {
          e.preventDefault();
          const href = button.getAttribute("data-href");
          if (href) {
            const fullUrl = `${window.location.origin}/blog/#${href}`;
            navigator.clipboard.writeText(fullUrl).then(() => {
              const svg = button.querySelector('svg');
              if (svg) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';
              }
              setTimeout(() => {
                if (svg) {
                  svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>';
                }
              }, 2000);
            }).catch(() => {
              const svg = button.querySelector('svg');
              if (svg) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
              }
              setTimeout(() => {
                if (svg) {
                  svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>';
                }
              }, 2000);
            });
          }
        }
      } catch (err) {
        console.error('Error handling copy link:', err);
      }
    };
    const ref = containerRef.current;
    if (ref) ref.addEventListener("click", handler);
    return () => {
      if (ref) ref.removeEventListener("click", handler);
    };
  }, [htmlContent]);

  // Handle Gist loading
  useEffect(() => {
    const loadGists = async () => {
      try {
        const gistContainers = document.querySelectorAll('.gist-container');
        for (const container of gistContainers) {
          const gistId = container.getAttribute('data-gist');
          if (!gistId) continue;
          try {
            const response = await fetch(`https://api.github.com/gists/${gistId.split('/')[1]}`);
            const gistData = await response.json();
            if (response.ok && gistData.files) {
              const files = Object.values(gistData.files) as Array<{
                filename: string;
                language: string;
                content: string;
              }>;
              let gistHtml = '<div class="gist-content">';
              files.forEach((file) => {
                if (file.content) {
                  gistHtml += `
                    <div class="gist-file">
                      <div class="gist-file-header">
                        <span class="gist-filename">${file.filename}</span>
                        <span class="gist-language">${file.language || 'text'}</span>
                      </div>
                      <pre class="gist-code"><code class="language-${file.language || 'text'}">${file.content}</code></pre>
                    </div>
                  `;
                }
              });
              gistHtml += '</div>';
              container.innerHTML = gistHtml;
              if (typeof Prism !== 'undefined') {
                container.querySelectorAll('pre code').forEach((block) => {
                  Prism.highlightElement(block as HTMLElement);
                });
              }
            } else {
              container.innerHTML = `<div class="gist-error">Failed to load Gist: ${gistId}</div>`;
            }
          } catch (error) {
            container.innerHTML = `<div class="gist-error">Error loading Gist: ${gistId}</div>`;
            console.error('Error loading Gist:', error);
          }
        }
      } catch (err) {
        console.error('Error in Gist loading effect:', err);
      }
    };
    if (htmlContent) {
      setTimeout(loadGists, 100);
    }
  }, [htmlContent]);

  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <div
        ref={containerRef}
        className={`prose prose-slate max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering MarkdownViewer:", err);
    return (
      <div style={{ color: 'red', fontFamily: 'monospace', padding: '2rem' }}>
        An error occurred while rendering markdown content.
      </div>
    );
  }
};

export default MarkdownViewer;