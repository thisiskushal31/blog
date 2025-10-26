import React from 'react';
import { QUICK_ACTIONS } from '@/config/config';

interface ComprehensiveLinksProps {
  className?: string;
  showDescriptions?: boolean;
  maxItems?: number;
}

const ComprehensiveLinks: React.FC<ComprehensiveLinksProps> = ({ 
  className = "", 
  showDescriptions = false,
  maxItems = 12 
}) => {
  const displayLinks = QUICK_ACTIONS.slice(0, maxItems);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {displayLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-4 bg-card/50 hover:bg-card/80 border border-border/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
              <span className="text-2xl">
                {link.icon === 'Mail' && '📧'}
                {link.icon === 'Calendar' && '📅'}
                {link.icon === 'LinkIcon' && '🔗'}
                {link.icon === 'Globe' && '🌐'}
                {link.icon === 'CodeIcon' && '💻'}
                {link.icon === 'Award' && '🏆'}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {link.name}
              </h3>
              {showDescriptions && (
                <p className="text-xs text-muted-foreground mt-1">
                  {link.description}
                </p>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ComprehensiveLinks;
