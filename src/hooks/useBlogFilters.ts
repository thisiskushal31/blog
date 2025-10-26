/**
 * useBlogFilters Hook
 * 
 * Manages blog post filtering logic including:
 * - Search query filtering
 * - Tag-based filtering
 * - Available tags extraction
 * 
 * @returns Object containing filter state and computed values
 */

import { useState, useMemo } from 'react';
import { BlogPost } from '@/content/index';

/**
 * Custom hook for managing blog post filters
 * @param posts - Array of blog posts to filter
 * @returns Filter state and filtered results
 */
export const useBlogFilters = (posts: BlogPost[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from blog posts
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      if (post.categories) {
        post.categories.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter blog posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.categories?.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  // Featured posts (only posts with featured: true)
  const featuredPosts = useMemo(() => {
    return posts.filter(post => post.featured === true);
  }, [posts]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    availableTags,
    filteredPosts,
    featuredPosts,
    clearFilters,
  };
};

