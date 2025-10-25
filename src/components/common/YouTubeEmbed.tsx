// YouTubeEmbed.tsx
// Click-to-load YouTube embed that bypasses ad blocker issues
// Shows thumbnail first, loads iframe only when clicked

import React, { useState, useRef } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isLoaded || isLoading) return;
    
    setIsLoading(true);
    
    // Small delay to show loading state
    setTimeout(() => {
      setIsLoaded(true);
      setIsLoading(false);
    }, 300);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className={`youtube-embed-wrapper ${className}`}>
        <div className="youtube-error bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center">
            <svg className="h-12 w-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
              Video unavailable
            </h3>
            <p className="text-red-600 dark:text-red-400 mb-4">
              This video cannot be displayed due to ad blocker restrictions.
            </p>
            <a 
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (isLoaded) {
    return (
      <div className={`youtube-embed-wrapper ${className}`}>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            ref={containerRef}
            className="youtube-iframe"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={handleError}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px',
              margin: 0,
              padding: 0
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`youtube-embed-wrapper ${className}`}>
      <div 
        className="youtube-placeholder"
        onClick={handleClick}
      >
        <div className="youtube-thumbnail">
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="YouTube video thumbnail"
            loading="lazy"
            onError={handleError}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="youtube-play-button">
              {isLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
              ) : (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </div>
          </div>
        </div>
        <div className="youtube-info">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLoading ? 'Loading video...' : 'Click to load YouTube video'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
