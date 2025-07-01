
import { useState, useEffect } from 'react';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

const MarkdownViewer = ({ content, className = "" }: MarkdownViewerProps) => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    // Simple markdown to HTML converter
    const convertMarkdownToHtml = (markdown: string) => {
      let html = markdown;
      
      // Headers
      html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-4 mt-6">$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-6 mt-8">$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-8 mt-10">$1</h1>');
      
      // Code blocks
      html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm">$2</code></pre>');
      
      // Inline code
      html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>');
      
      // Bold
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Italic
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // Links
      html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
      
      // Lists
      html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
      html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>');
      
      // Wrap consecutive list items in ul/ol
      html = html.replace(/(<li class="ml-4 list-disc">.*?<\/li>)/gs, '<ul class="my-4">$1</ul>');
      html = html.replace(/(<li class="ml-4 list-decimal">.*?<\/li>)/gs, '<ol class="my-4">$1</ol>');
      
      // Paragraphs
      html = html.replace(/\n\n/g, '</p><p class="mb-4">');
      html = '<p class="mb-4">' + html + '</p>';
      
      // Clean up empty paragraphs
      html = html.replace(/<p class="mb-4"><\/p>/g, '');
      
      // Tables
      html = html.replace(/\|(.+)\|/g, (match, content) => {
        const cells = content.split('|').map((cell: string) => cell.trim());
        const isHeader = match.includes('---');
        if (isHeader) return '';
        
        const cellElements = cells.map((cell: string) => `<td class="border border-border px-4 py-2">${cell}</td>`).join('');
        return `<tr>${cellElements}</tr>`;
      });
      
      html = html.replace(/(<tr>.*?<\/tr>)/gs, '<table class="w-full border-collapse border border-border my-4">$1</table>');
      
      return html;
    };

    setHtmlContent(convertMarkdownToHtml(content));
  }, [content]);

  return (
    <div 
      className={`prose prose-slate max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownViewer;
