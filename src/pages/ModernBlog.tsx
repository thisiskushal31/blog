import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from 'lucide-react';
import ModernBlogCard from '@/components/blog/ModernBlogCard';
import ModernSearchFilter from '@/components/blog/ModernSearchFilter';
import ScrollToTop from '@/components/ScrollToTop';
import { blogPosts } from '@/content/blogPostIndex';
import { BLOG_CONFIG, AUTHOR } from '@/config/config';

const ModernBlog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = BLOG_CONFIG.postsPerPage;

  // Get all unique tags from blog posts
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      if (post.categories) {
        post.categories.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, []);

  // Filter blog posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.categories?.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  // Featured posts (only posts with featured: true)
  const featuredPosts = useMemo(() => {
    return blogPosts.filter(post => post.featured === true).slice(0, BLOG_CONFIG.featuredPostsCount);
  }, []);

  // Pagination for all posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 fade-in-up">
            Tech Blog
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto fade-in-up" style={{ animationDelay: '100ms' }}>
            Insights, tutorials, and thoughts on technology, development, and everything in between.
          </p>
          <div className="flex items-center justify-center space-x-8 text-muted-foreground fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>{blogPosts.length} Articles</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5" />
              <span>{availableTags.length} Topics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ModernSearchFilter
            onSearch={setSearchQuery}
            onFilter={setSelectedTags}
            availableTags={availableTags}
            searchQuery={searchQuery}
            selectedTags={selectedTags}
          />
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <ModernBlogCard
                  key={post.slug}
                  post={post}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      {paginatedPosts.length > 0 && (
        <section id="all-posts" className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post, index) => (
                <ModernBlogCard
                  key={post.slug}
                  post={post}
                  delay={index * 50}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
              }}
              className="btn-primary"
            >
              Clear filters
            </button>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      {BLOG_CONFIG.enableNewsletter && (
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {BLOG_CONFIG.newsletterTitle}
            </h2>
            <p className="text-muted-foreground mb-8">
              {BLOG_CONFIG.newsletterDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={BLOG_CONFIG.newsletterPlaceholder}
                className="flex-1 px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <button className="btn-primary px-6 py-3">
                {BLOG_CONFIG.newsletterButtonText}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default ModernBlog;
