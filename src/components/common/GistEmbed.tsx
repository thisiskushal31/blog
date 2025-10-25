// GistEmbed.tsx
// Proper GitHub Gist loading component that avoids document.write issues
// Uses GitHub's API to fetch and render Gist content safely

import React, { useEffect, useRef, useState } from 'react';

interface GistEmbedProps {
  gistId: string;
  className?: string;
}

const GistEmbed: React.FC<GistEmbedProps> = ({ gistId, className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gistHtml, setGistHtml] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGist = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch Gist data from GitHub API
        const response = await fetch(`https://api.github.com/gists/${gistId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load Gist: ${response.status}`);
        }

        const gistData = await response.json();
        
        // Get the first file from the Gist
        const files = Object.values(gistData.files) as any[];
        if (files.length === 0) {
          throw new Error('No files found in Gist');
        }

        const firstFile = files[0];
        const content = firstFile.content;
        const language = firstFile.language || 'text';
        const filename = firstFile.filename;

        // Create HTML for the Gist content
        const gistHtml = `
          <div class="gist-content">
            <div class="gist-header">
              <div class="gist-meta">
                <span class="gist-filename">${filename}</span>
                <span class="gist-language">${language}</span>
              </div>
            </div>
            <div class="gist-body">
              <pre><code class="language-${language.toLowerCase()}">${content}</code></pre>
            </div>
          </div>
        `;

        setGistHtml(gistHtml);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Gist:', err);
        setError(err instanceof Error ? err.message : 'Failed to load Gist');
        setIsLoading(false);
      }
    };

    if (gistId) {
      loadGist();
    }
  }, [gistId]);

  if (isLoading) {
    return (
      <div className={`gist-embed-wrapper ${className}`}>
        <div className="gist-loading">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
            <span>Loading Gist...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`gist-embed-wrapper ${className}`}>
        <div className="gist-error bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-red-700 dark:text-red-300">Error loading Gist: {error}</span>
          </div>
          <div className="mt-2">
            <a 
              href={`https://gist.github.com/${gistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              View Gist on GitHub →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`gist-embed-wrapper ${className}`}
      dangerouslySetInnerHTML={{ __html: gistHtml }}
    />
  );
};

export default GistEmbed;
