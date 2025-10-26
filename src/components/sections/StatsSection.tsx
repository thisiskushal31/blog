/**
 * StatsSection Component
 * 
 * Displays blog statistics including:
 * - Total number of articles
 * - Number of topics
 * 
 * Props:
 * @param articleCount - Total number of articles
 * @param topicCount - Total number of unique topics
 */

import React from 'react';
import { BookOpen, Tag } from 'lucide-react';

interface StatsSectionProps {
  articleCount: number;
  topicCount: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({ articleCount, topicCount }) => {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center space-x-4 text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-2">
        <div className="flex items-center space-x-1">
          <BookOpen className="w-3 h-3 text-primary" />
          <span>{articleCount} Articles</span>
        </div>
        <div className="w-px h-3 bg-border"></div>
        <div className="flex items-center space-x-1">
          <Tag className="w-3 h-3 text-accent" />
          <span>{topicCount} Topics</span>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;

