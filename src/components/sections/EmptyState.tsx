/**
 * EmptyState Component
 * 
 * Displays when no blog posts match the search/filter criteria.
 * 
 * Props:
 * @param onClearFilters - Callback function to clear all active filters
 */

import React from 'react';
import { BookOpen } from 'lucide-react';
import LinkableHeading from '@/components/LinkableHeading';

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-muted-foreground" />
        </div>
        <LinkableHeading level={3} id="no-articles-found" className="text-2xl font-semibold text-foreground mb-4">
          No articles found
        </LinkableHeading>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
        <button
          onClick={onClearFilters}
          className="btn-primary"
        >
          Clear filters
        </button>
      </div>
    </section>
  );
};

export default EmptyState;

