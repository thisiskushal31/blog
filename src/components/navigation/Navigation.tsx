import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Github, Linkedin, ExternalLink, Copy, Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { SOCIAL_LINKS } from '@/config/config';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed navigation links - only keeping icon links

  const socialLinks = [
    { name: 'GitHub', href: SOCIAL_LINKS.github, icon: Github },
    { name: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: Linkedin },
    { name: 'Portfolio', href: SOCIAL_LINKS.portfolio, icon: ExternalLink },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const copyCurrentLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="reading-progress">
        <div 
          className="reading-progress-bar" 
          style={{ width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/80 backdrop-blur-md border-b border-border shadow-card' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/blog" 
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-primary-foreground font-bold text-sm">KG</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  Kushal Gupta
                </h1>
                <p className="text-sm text-muted-foreground">Tech Blog</p>
              </div>
            </Link>

            {/* Desktop Navigation - Removed text links, keeping only icon links */}

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Social Links - Desktop */}
              <div className="hidden lg:flex items-center space-x-3">
                {socialLinks.map((link, index) => {
                  // Unique styling for each social platform
                  const getLinkStyles = (platform: string) => {
                    switch (platform) {
                      case 'GitHub':
                        return "p-2 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-all duration-200 hover:scale-110 hover:shadow-md";
                      case 'LinkedIn':
                        return "p-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg border border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700 transition-all duration-200 hover:scale-110 hover:shadow-md";
                      case 'Portfolio':
                        return "p-2 text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-purple-300 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 rounded-lg border border-purple-200 hover:border-purple-300 dark:border-purple-800 dark:hover:border-purple-700 transition-all duration-200 hover:scale-110 hover:shadow-md";
                      default:
                        return "p-2 text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110";
                    }
                  };

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={getLinkStyles(link.name)}
                      aria-label={link.name}
                    >
                      <link.icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              {/* Copy Link Button */}
              <button
                onClick={copyCurrentLink}
                className="theme-toggle"
                aria-label="Copy current link"
              >
                {isCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Mobile menu button - Removed since no text links */}
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Removed text links, keeping only icon links */}
      </nav>
    </>
  );
};

export default Navigation;