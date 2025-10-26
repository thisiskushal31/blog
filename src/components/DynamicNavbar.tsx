import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Github, Linkedin, ExternalLink, Copy, Check } from 'lucide-react';
import { AUTHOR, SOCIAL_LINKS, QUICK_ACTIONS } from '@/config/config';

interface DynamicNavbarProps {
  isVisible: boolean;
  onClose: () => void;
}

const DynamicNavbar: React.FC<DynamicNavbarProps> = ({ isVisible, onClose }) => {
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-card transition-all duration-300 ease-in-out transform ${
      isVisible 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      <div className="max-w-7xl mx-auto px-3 py-2">
        <div className="flex items-center justify-between">
          {/* Logo/Profile Section - Compact */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              onClick={onClose}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-teal-500 flex items-center justify-center">
                <img
                  src={AUTHOR.avatar}
                  alt={AUTHOR.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-white font-bold text-xs">KG</span>';
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-foreground">{AUTHOR.name}</span>
                <span className="text-xs text-muted-foreground">Tech Blog</span>
              </div>
            </Link>
          </div>

          {/* Social Links - Old Navigation Style */}
          <div className="flex items-center space-x-3">
            {/* GitHub - Old style */}
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            
            {/* LinkedIn - Old style */}
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg border border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700 transition-all duration-200 hover:scale-110 hover:shadow-md"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* External Link - Old style */}
            <a
              href={SOCIAL_LINKS.publicProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-purple-300 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 rounded-lg border border-purple-200 hover:border-purple-300 dark:border-purple-800 dark:hover:border-purple-700 transition-all duration-200 hover:scale-110 hover:shadow-md"
              title="My Profile & Links"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Copy Link - Old style */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(window.location.href);
              }}
              className="p-2 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
              title="Copy Link"
            >
              <Copy className="w-4 h-4" />
            </a>

            {/* Theme Toggle - Old style */}
            <button
              onClick={() => {
                const isDark = document.documentElement.classList.contains('dark');
                if (isDark) {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                }
              }}
              className="p-2 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-all duration-200 hover:scale-110 hover:shadow-md"
              title="Toggle Dark Mode"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicNavbar;
