import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { BLOG_CONFIG } from '@/config/config';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (tags: string[]) => void;
  availableTags: string[];
  searchQuery: string;
  selectedTags: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onFilter,
  availableTags,
  searchQuery,
  selectedTags
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onFilter(newTags);
  };

  const clearFilters = () => {
    onSearch('');
    onFilter([]);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder={BLOG_CONFIG.searchPlaceholder}
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input pl-10 pr-4"
        />
        {searchQuery && (
          <button
            onClick={() => onSearch('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-card-hover transition-colors duration-200"
        >
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">{BLOG_CONFIG.filterPlaceholder}</span>
          {selectedTags.length > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {selectedTags.length}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="glass-card p-4 space-y-4 fade-in-up">
          <h3 className="font-semibold text-foreground">Filter by tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`tag transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'hover:bg-primary/10 hover:text-primary hover:border-primary/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;