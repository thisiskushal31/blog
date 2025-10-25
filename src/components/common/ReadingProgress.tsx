// ReadingProgress.tsx - Modern reading progress indicator
// Features: Smooth progress bar, gradient styling, and scroll-based progress

import React, { useState, useEffect } from 'react';

interface ReadingProgressProps {
  className?: string;
  height?: number;
  color?: 'primary' | 'secondary' | 'accent';
  showPercentage?: boolean;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  className = '',
  height = 4,
  color = 'primary',
  showPercentage = false
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Initial calculation
    updateProgress();

    // Add scroll listener
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const colorClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-500',
    accent: 'bg-gradient-to-r from-emerald-500 to-blue-500'
  };

  const progressBarClasses = `
    fixed top-0 left-0 right-0 z-50 
    bg-slate-200 dark:bg-slate-700 
    transition-all duration-150 ease-out
    ${className}
  `;

  const progressFillClasses = `
    h-full transition-all duration-150 ease-out
    ${colorClasses[color]}
    shadow-sm
  `;

  return (
    <div className={progressBarClasses} style={{ height: `${height}px` }}>
      <div
        className={progressFillClasses}
        style={{ width: `${progress}%` }}
      />
      {showPercentage && (
        <div className="absolute top-0 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded-bl-md">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ReadingProgress;
