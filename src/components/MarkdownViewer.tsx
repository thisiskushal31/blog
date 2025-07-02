import { useState, useEffect, useRef } from "react";
import LinkableHeading from "./LinkableHeading";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

const MarkdownViewer = ({ content, className = "" }: MarkdownViewerProps) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhanced markdown to HTML converter with linkable headings
    const convertMarkdownToHtml = (markdown: string) => {
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

      // Headers with linkable functionality (h1, h2, h3)
      // Only the paperclip is a link, heading text is not underlined or clickable
      const getBaseUrl = () => {
        if (typeof window === "undefined") return "";
        const { origin, pathname, search, hash } = window.location;
        const hashParts = hash.split("#");
        const hashRoute = hashParts.length > 1 ? "#/" + hashParts[1].replace(/^\/?/, "") : "";
        return `${origin}${pathname}${search}${hashRoute}`;
      };

      html = html.replace(/^### (.*$)/gim, (match, title) => {
        const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
        const baseUrl = getBaseUrl();
        return `<h3 id="${id}" class="text-xl font-semibold mb-4 mt-6 group relative scroll-mt-8 flex items-center">
          <span class="text-black dark:text-white">${title}</span>
          <a href="${baseUrl}#${id}" data-clipboard-link="${baseUrl}#${id}" class="ml-2 text-black dark:text-white hover:underline focus:underline transition-colors clipboard-link" aria-label="Copy link to ${title}">
            <svg class="h-4 w-4 inline-block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </a>
        </h3>`;
      });

      html = html.replace(/^## (.*$)/gim, (match, title) => {
        const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
        const baseUrl = getBaseUrl();
        return `<h2 id="${id}" class="text-2xl font-semibold mb-6 mt-8 group relative scroll-mt-8 flex items-center">
          <span class="text-black dark:text-white">${title}</span>
          <a href="${baseUrl}#${id}" data-clipboard-link="${baseUrl}#${id}" class="ml-2 text-black dark:text-white hover:underline focus:underline transition-colors clipboard-link" aria-label="Copy link to ${title}">
            <svg class="h-4 w-4 inline-block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </a>
        </h2>`;
      });

      html = html.replace(/^# (.*$)/gim, (match, title) => {
        const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
        const baseUrl = getBaseUrl();
        return `<h1 id="${id}" class="text-3xl font-bold mb-8 mt-10 group relative scroll-mt-8 flex items-center">
          <span class="text-black dark:text-white">${title}</span>
          <a href="${baseUrl}#${id}" data-clipboard-link="${baseUrl}#${id}" class="ml-2 text-black dark:text-white hover:underline focus:underline transition-colors clipboard-link" aria-label="Copy link to ${title}">
            <svg class="h-4 w-4 inline-block align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </a>
        </h1>`;
      });

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

      // Code blocks (restore them)
      codeBlocks.forEach((block, index) => {
        html = html.replace(
          `__CODE_BLOCK_${index}__`,
          block.replace(
            /```(\w+)?\n([\s\S]*?)```/g,
            '<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm">$2</code></pre>'
          )
        );
      });

      // Bold
      html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      // Italic
      html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

      // Links
      html = html.replace(
        /\[([^\]]+)\]\(([^\)]+)\)/g,
        '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
      );

      // Lists
      html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
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

      // Tables
      html = html.replace(/\|(.+)\|/g, (match, content) => {
        const cells = content.split("|").map((cell: string) => cell.trim());
        const isHeader = match.includes("---");
        if (isHeader) return "";

        const cellElements = cells
          .map(
            (cell: string) =>
              `<td class="border border-border px-4 py-2">${cell}</td>`
          )
          .join("");
        return `<tr>${cellElements}</tr>`;
      });

      html = html.replace(
        /(<tr>.*?<\/tr>)/gs,
        '<table class="w-full border-collapse border border-border my-4">$1</table>'
      );

      return html;
    };

    setHtmlContent(convertMarkdownToHtml(content));
  }, [content]);

  // Clipboard copy handler using event delegation
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest(".clipboard-link") as HTMLAnchorElement | null;
      if (link) {
        e.preventDefault();
        const url = link.getAttribute("data-clipboard-link");
        if (url) {
          navigator.clipboard.writeText(url);
          // Optionally, show feedback here (e.g. toast)
        }
      }
    };
    const ref = containerRef.current;
    if (ref) ref.addEventListener("click", handler);
    return () => {
      if (ref) ref.removeEventListener("click", handler);
    };
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className={`prose prose-slate max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownViewer;