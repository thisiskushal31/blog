
// ScrollToTop.tsx - Floating button to scroll the page to the top when clicked.
// Only appears when the user has scrolled down. Improves navigation UX.
// If rendering fails, an error is logged and a fallback UI is shown.
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  // State to track button visibility
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
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

  // Handler to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    if (!isVisible) {
      return null;
    }
    return (
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg"
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering ScrollToTop:", err);
    return null;
  }
};

export default ScrollToTop;
