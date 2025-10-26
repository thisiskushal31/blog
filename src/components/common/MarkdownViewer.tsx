// MarkdownViewer.tsx
// Clean, modern markdown renderer with professional styling
// Maintains all existing functionality while providing a clean, readable look

import React, { useState, useEffect, useRef } from 'react';
import { SimpleRenderer } from '@/lib/marked/simple-renderer';
import { useTheme } from '@/hooks/useTheme';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import GistEmbed from './GistEmbed';
import YouTubeEmbed from './YouTubeEmbed';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-markdown';
import '@/styles/markdown.css';

interface MarkdownViewerProps {
  content: string;
  className?: string;
  postSlug?: string;
  onContentFullyLoaded?: () => void;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  className = '',
  postSlug,
  onContentFullyLoaded
}) => {
  const { theme } = useTheme();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const parserRef = useRef<SimpleRenderer | null>(null);

  // Initialize parser
  useEffect(() => {
    // Always create a new renderer to ensure fresh state
    parserRef.current = new SimpleRenderer(true); // true = open links in new tab for blog post content
  }, []);

  // Parse markdown content
  useEffect(() => {
    if (!parserRef.current) return;

    try {
      setIsLoading(true);
      
      // Parse the markdown
      const parsedHtml = parserRef.current.parse(content);
      
      // Sanitize the HTML
      const sanitizedHtml = DOMPurify.sanitize(parsedHtml, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 's', 'del',
          'ul', 'ol', 'li',
          'a', 'img', 'iframe',
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'pre', 'code',
          'blockquote',
          'div', 'span',
          'svg', 'path',
          'button', 'input',
          'script' // Allow script tags for GitHub Gists
        ],
        ALLOWED_ATTR: [
          'href', 'src', 'alt', 'title', 'class', 'id',
          'target', 'rel', 'loading',
          'aria-label', 'aria-hidden',
          'type', 'checked', 'disabled',
          'fill', 'viewBox', 'fill-rule', 'clip-rule', 'd',
          'stroke-linecap', 'stroke-linejoin', 'stroke-width', 'stroke',
          'frameborder', 'allowfullscreen', 'allow' // Allow iframe attributes
        ],
        ALLOW_DATA_ATTR: true,
        KEEP_CONTENT: true,
        ADD_ATTR: ['allowfullscreen', 'frameborder', 'allow'] // Allow additional iframe attributes
      });

      setHtmlContent(sanitizedHtml);
      setIsLoading(false);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      setHtmlContent('<div class="error">Error parsing markdown content</div>');
      setIsLoading(false);
    }
  }, [content]);

  // Add linkable headers
  useEffect(() => {
    if (htmlContent && containerRef.current) {
      const headers = containerRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headers.forEach(header => {
        const id = header.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        if (id) {
          header.id = id;
          const link = document.createElement('a');
          // For HashRouter, construct the URL with the current hash path + new hash
          const currentHash = window.location.hash;
          link.href = `${currentHash}#${id}`;
          link.className = 'header-link';
          link.innerHTML = '#';
          link.style.cssText = 'opacity: 0; margin-left: 8px; text-decoration: none; color: #6b7280; transition: opacity 0.2s; cursor: pointer;';
          header.appendChild(link);
          
          // Show link on hover
          header.addEventListener('mouseenter', () => {
            link.style.opacity = '1';
          });
          header.addEventListener('mouseleave', () => {
            link.style.opacity = '0';
          });

          // Handle click to copy URL
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const urlToCopy = `${window.location.origin}${window.location.pathname}${currentHash}#${id}`;
            navigator.clipboard.writeText(urlToCopy).then(() => {
              // Optional: Show a brief feedback
              const originalText = link.innerHTML;
              link.innerHTML = '✓';
              link.style.color = '#10b981';
              setTimeout(() => {
                link.innerHTML = originalText;
                link.style.color = '#6b7280';
              }, 1000);
            }).catch(err => {
              console.error('Failed to copy URL:', err);
            });
          });
        }
      });
    }
  }, [htmlContent]);

  // Apply syntax highlighting and code block styling after content is rendered
  useEffect(() => {
    if (htmlContent && containerRef.current) {
      const preElements = containerRef.current.querySelectorAll('.markdown .highlight pre');
      const isDarkMode = theme === 'dark';
      
      preElements.forEach(pre => {
        // Style the highlight wrapper first
        const highlightWrapper = pre.parentElement;
        if (highlightWrapper) {
          highlightWrapper.style.setProperty('background-color', 'transparent', 'important');
          highlightWrapper.style.setProperty('border', 'none', 'important');
          highlightWrapper.style.setProperty('border-radius', '0', 'important');
          highlightWrapper.style.setProperty('padding', '0', 'important');
          highlightWrapper.style.setProperty('margin', '0', 'important');
        }
        
        // Apply design system colors for code blocks
        pre.style.setProperty('background-color', isDarkMode ? 'hsl(217 32% 18%)' : 'hsl(0 0% 100%)', 'important');
        pre.style.setProperty('border-radius', '0.75rem', 'important');
        pre.style.setProperty('padding', '16px', 'important');
        pre.style.setProperty('margin', '16px 0', 'important');
        pre.style.setProperty('border', isDarkMode ? '1px solid hsl(217 32% 25%)' : '1px solid hsl(0 0% 85%)', 'important');
        pre.style.setProperty('overflow-x', 'auto', 'important');
        pre.style.setProperty('font-size', '14px', 'important');
        pre.style.setProperty('line-height', '1.5', 'important');
        pre.style.setProperty('box-shadow', isDarkMode ? '0 2px 6px hsl(0 0% 0% / 0.3)' : '0 2px 6px hsl(0 0% 0% / 0.04)', 'important');
        pre.style.setProperty('white-space', 'pre', 'important');
        pre.style.setProperty('word-wrap', 'normal', 'important');
        pre.style.setProperty('overflow-wrap', 'normal', 'important');
        pre.style.setProperty('text-wrap', 'wrap', 'important');
        pre.style.setProperty('word-break', 'normal', 'important');
        
        // Apply Prism.js syntax highlighting
        const codeElements = pre.querySelectorAll('code');
        codeElements.forEach(code => {
          // Use setTimeout to ensure DOM is ready
          setTimeout(() => {
            Prism.highlightElement(code as HTMLElement);
          }, 0);
          
          // Override Prism styles to work with our design system
          code.style.setProperty('background', 'transparent', 'important');
          code.style.setProperty('border', 'none', 'important');
          code.style.setProperty('border-radius', '0', 'important');
          code.style.setProperty('color', isDarkMode ? '#f0f6fc' : '#0d1117', 'important');
          code.style.setProperty('font-family', 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace', 'important');
          code.style.setProperty('font-size', '15px', 'important');
          code.style.setProperty('line-height', '1.6', 'important');
          code.style.setProperty('padding', '0', 'important');
          code.style.setProperty('font-weight', '500', 'important');
          code.style.setProperty('text-rendering', 'geometricPrecision', 'important');
          code.style.setProperty('-webkit-font-smoothing', 'subpixel-antialiased', 'important');
          code.style.setProperty('-moz-osx-font-smoothing', 'auto', 'important');
          code.style.setProperty('letter-spacing', '0.025em', 'important');
          code.style.setProperty('white-space', 'pre', 'important');
          code.style.setProperty('word-wrap', 'normal', 'important');
          code.style.setProperty('overflow-wrap', 'normal', 'important');
          code.style.setProperty('text-wrap', 'wrap', 'important');
          code.style.setProperty('word-break', 'normal', 'important');
        });
      });
    }
  }, [htmlContent, theme]);

  // Force override any conflicting styles after a delay
  useEffect(() => {
    const forceOverride = () => {
      const codeBlocks = containerRef.current?.querySelectorAll('.markdown .highlight pre');
      if (codeBlocks) {
        codeBlocks.forEach((pre) => {
          pre.style.setProperty('white-space', 'pre', 'important');
          pre.style.setProperty('text-wrap', 'wrap', 'important');
          pre.style.setProperty('word-wrap', 'normal', 'important');
          pre.style.setProperty('overflow-wrap', 'normal', 'important');
          pre.style.setProperty('word-break', 'normal', 'important');
          
          const codeElement = pre.querySelector('code');
          if (codeElement) {
            codeElement.style.setProperty('white-space', 'pre', 'important');
            codeElement.style.setProperty('text-wrap', 'wrap', 'important');
            codeElement.style.setProperty('word-wrap', 'normal', 'important');
            codeElement.style.setProperty('overflow-wrap', 'normal', 'important');
            codeElement.style.setProperty('word-break', 'normal', 'important');
          }
        });
      }
    };

    // Force override immediately and after delays
    forceOverride();
    const timeoutId = setTimeout(forceOverride, 100);
    const timeoutId2 = setTimeout(forceOverride, 500);
    const timeoutId3 = setTimeout(forceOverride, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, [htmlContent]);

  // Apply Prism.js syntax highlighting after styling is complete
  useEffect(() => {
    if (htmlContent && containerRef.current) {
      // Use Prism.highlightAll() to highlight all code blocks
      Prism.highlightAll();
      
      // Also try individual highlighting as fallback
      const codeElements = containerRef.current.querySelectorAll('.markdown .highlight pre code');
      codeElements.forEach(code => {
        try {
          Prism.highlightElement(code as HTMLElement);
        } catch (error) {
          console.warn('Prism highlighting failed for element:', error);
        }
      });
    }
  }, [htmlContent, theme]);

  // Handle anchor link clicks and external links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link) {
        // Handle external links with target="_blank"
        if (link.target === '_blank') {
          e.preventDefault();
          window.open(link.href, '_blank', 'noopener,noreferrer');
          return;
        }
        
        // Handle internal anchor links
        const href = link.getAttribute('href');
        if (href && href.includes('#')) {
          e.preventDefault();
          // Extract the hash part from the href
          const hashIndex = href.indexOf('#');
          if (hashIndex !== -1) {
            const id = href.substring(hashIndex + 1);
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('click', handleLinkClick);
      return () => container.removeEventListener('click', handleLinkClick);
    }
  }, [htmlContent]);

  // Handle initial scroll to hash on page load
  useEffect(() => {
    if (!isLoading && htmlContent && containerRef.current) {
      // Check if there's a hash in the URL that we need to scroll to
      const currentHash = window.location.hash;
      if (currentHash && currentHash.includes('#')) {
        // Extract the last hash (the section ID)
        const hashParts = currentHash.split('#');
        const sectionId = hashParts[hashParts.length - 1];
        
        // Wait a bit for the DOM to be fully rendered
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [isLoading, htmlContent]);

  // Call onContentFullyLoaded when content is ready
  useEffect(() => {
    if (!isLoading && onContentFullyLoaded) {
      onContentFullyLoaded();
    }
  }, [isLoading, onContentFullyLoaded]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Process embeds before rendering
  const processEmbeds = (html: string) => {
    const gistEmbeds: Array<{ id: string; placeholder: string }> = [];
    const youtubeEmbeds: Array<{ id: string; placeholder: string }> = [];
    let processedHtml = html;

    // Find all Gist embed wrappers
    const gistWrapperRegex = /<div class="gist-embed-wrapper[^"]*" data-gist-id="([^"]+)">[^<]*<div class="gist-loading">Loading Gist\.\.\.<\/div>[^<]*<\/div>/g;
    let match;
    let index = 0;

    while ((match = gistWrapperRegex.exec(html)) !== null) {
      const gistId = match[1];
      const placeholder = `__GIST_EMBED_${index}__`;
      gistEmbeds.push({ id: gistId, placeholder });
      processedHtml = processedHtml.replace(match[0], placeholder);
      index++;
    }

    // Find all YouTube embed placeholders
    const youtubeWrapperRegex = /<div class="youtube-embed-placeholder" data-video-id="([^"]+)"><\/div>/g;
    index = 0;

    while ((match = youtubeWrapperRegex.exec(html)) !== null) {
      const videoId = match[1];
      const placeholder = `__YOUTUBE_EMBED_${index}__`;
      youtubeEmbeds.push({ id: videoId, placeholder });
      processedHtml = processedHtml.replace(match[0], placeholder);
      index++;
    }

    return { processedHtml, gistEmbeds, youtubeEmbeds };
  };

  const { processedHtml, gistEmbeds, youtubeEmbeds } = processEmbeds(htmlContent);

  return (
    <div
      ref={containerRef}
      className={`markdown ${theme === 'dark' ? 'dark' : ''} ${className}`}
    >
      {processedHtml.split(/(__GIST_EMBED_\d+__|__YOUTUBE_EMBED_\d+__)/).map((part, index) => {
        const gistEmbed = gistEmbeds.find(embed => embed.placeholder === part);
        const youtubeEmbed = youtubeEmbeds.find(embed => embed.placeholder === part);
        
        if (gistEmbed) {
          return <GistEmbed key={index} gistId={gistEmbed.id} />;
        }
        
        if (youtubeEmbed) {
          return <YouTubeEmbed key={index} videoId={youtubeEmbed.id} />;
        }
        
        return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      })}
    </div>
  );
};

export default MarkdownViewer;
