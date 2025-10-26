// ScrollToTop.tsx
// Floating action button that appears when user scrolls down
// Provides smooth scroll-to-top functionality

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * ScrollToTop Component
 * Shows a floating button to scroll back to the top of the page
 * Only visible after scrolling down 300px
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center group"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
    </button>
  );
};

export default ScrollToTop;
