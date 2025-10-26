/**
 * IntroSection Component
 * 
 * Displays the author's introduction including:
 * - Profile photo with fallback
 * - Author name and title
 * - Bio description
 * 
 * Props:
 * @param author - Author information (name, title, bio, avatar)
 */

import React from 'react';
import type { Author } from '@/config/config';

interface IntroSectionProps {
  author: Author;
}

const IntroSection: React.FC<IntroSectionProps> = ({ author }) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white/20">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"><span class="text-white font-bold text-3xl">KG</span></div>';
                }
              }}
            />
          </div>
        </div>
        
        {/* Bio */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Hi, I'm {author.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{author.title}</p>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;

