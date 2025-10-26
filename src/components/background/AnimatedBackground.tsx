/**
 * AnimatedBackground Component
 * 
 * Renders the animated background with tech stack logos, animated dots, 
 * and gradient patterns used on the blog homepage.
 * 
 * Features:
 * - SVG line pattern with animated opacity
 * - Floating tech stack logos with various animations
 * - Animated dots scattered across the background
 * - Layered gradients for depth
 */

import React from 'react';
import { ANIMATED_BACKGROUND_ELEMENTS, ANIMATED_DOTS } from '@/config/animations';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="w-full h-full bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-teal-600/10">
        {/* Animated Line Pattern Background */}
        <div className="absolute inset-0 opacity-60">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="line-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="15" y2="0" stroke="#3b82f6" strokeWidth="1" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite"/>
                </line>
                <line x1="0" y1="0" x2="0" y2="15" stroke="#3b82f6" strokeWidth="1" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="6s" repeatCount="indefinite"/>
                </line>
                <circle cx="7.5" cy="7.5" r="1" fill="#3b82f6" opacity="0.3">
                  <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite"/>
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#line-pattern)"/>
          </svg>
        </div>
        
        {/* Floating Tech Stack Logos */}
        {ANIMATED_BACKGROUND_ELEMENTS.map((element, index) => (
          <div
            key={index}
            className={element.className}
            style={element.style}
          >
            {element.content}
          </div>
        ))}
        
        {/* Animated Dots */}
        {ANIMATED_DOTS.map((dot, index) => (
          <div
            key={index}
            className={dot.className}
            style={dot.style}
          />
        ))}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/70 to-background/55" />
    </div>
  );
};

export default AnimatedBackground;

