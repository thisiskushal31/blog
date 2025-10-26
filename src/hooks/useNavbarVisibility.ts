import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbarVisibility = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') ||
                        (localStorage.getItem('theme') === 'dark') ||
                        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Check if we're on a blog post page
    const isBlogPostPage = () => {
      // Use React Router location to check if we're on a blog post
      // Route pattern: /blog/:slug (so /blog/post-name is a blog post)
      return location.pathname.startsWith('/blog/') && location.pathname !== '/blog' && location.pathname !== '/blog/';
    };

    // Listen for scroll events
    const handleScroll = () => {
      const isBlogPost = isBlogPostPage();
      console.log('Current path:', location.pathname, 'Is blog post:', isBlogPost);
      
      // If we're on a blog post page, show navbar immediately
      if (isBlogPost) {
        setShowNavbar(true);
        return;
      }

      // Otherwise, check intro section visibility
      const introSection = document.getElementById('intro-section');
      if (introSection) {
        const rect = introSection.getBoundingClientRect();
        const introHeight = introSection.offsetHeight;
        const hiddenPercentage = Math.abs(rect.top) / introHeight;
        
        // Show navbar when intro is 80% hidden
        const shouldShow = hiddenPercentage >= 0.8;
        console.log('Intro hidden percentage:', hiddenPercentage, 'Should show navbar:', shouldShow);
        setShowNavbar(shouldShow);
      } else {
        console.log('Intro section not found, hiding navbar');
        setShowNavbar(false);
      }
    };

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
      observer.disconnect();
    };
  }, [location]);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    setIsDark(newTheme === 'dark');
  };

  const toggleNavbar = () => {
    setShowNavbar(prev => !prev);
  };

  return {
    showNavbar,
    isDark,
    toggleTheme,
    toggleNavbar
  };
};
