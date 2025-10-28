import React from 'react';
import BlogCard from '@/components/blog/BlogCard';
import SearchFilter from '@/components/blog/SearchFilter';
import ScrollToTop from '@/components/common/ScrollToTop';
import LinkableHeading from '@/components/LinkableHeading';
import DynamicNavbar from '@/components/DynamicNavbar';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import AnimatedBackground from '@/components/background/AnimatedBackground';
import IntroSection from '@/components/sections/IntroSection';
import StatsSection from '@/components/sections/StatsSection';
import EmptyState from '@/components/sections/EmptyState';
import { useNavbarVisibility } from '@/hooks/useNavbarVisibility';
import { useBlogFilters } from '@/hooks/useBlogFilters';
import { usePagination } from '@/hooks/usePagination';
import { blogPosts } from '@/content/index';
import { BLOG_CONFIG, AUTHOR, NAVIGATION_CONFIG } from '@/config/config';

const Blog: React.FC = () => {
  // Navbar visibility and theme management
  const { showNavbar, toggleNavbar } = useNavbarVisibility();

  // Blog filters (search, tags, featured posts)
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    availableTags,
    filteredPosts,
    featuredPosts: allFeaturedPosts,
    clearFilters,
  } = useBlogFilters(blogPosts);

  // Get featured posts (limited to configured count)
  const featuredPosts = allFeaturedPosts.slice(0, BLOG_CONFIG.featuredPostsCount);

  // Pagination
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToNextPage,
    goToPreviousPage,
    setCurrentPage,
  } = usePagination(filteredPosts.length, BLOG_CONFIG.postsPerPage, [searchQuery, selectedTags]);

  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return (
      <div className="min-h-screen bg-background">
        {/* Dynamic Navbar */}
        <DynamicNavbar isVisible={showNavbar} onClose={toggleNavbar} />
        
        {/* Floating Action Buttons */}
        <FloatingActionButtons
          showNavbar={showNavbar}
          onToggleNavbar={toggleNavbar}
        />
        
       {/* Personal Intro + Blog Section */}
       <section id="intro-section" className="relative py-12 px-4 overflow-hidden">
         <AnimatedBackground />
         
         <div className="relative z-10 max-w-6xl mx-auto">
           <IntroSection author={AUTHOR} />
           <StatsSection articleCount={blogPosts.length} topicCount={availableTags.length} />

           {/* Public Profile Link */}
           {NAVIGATION_CONFIG.showPublicProfileLink && (
             <div className="text-center">
               <a
                 href={AUTHOR.publicProfile}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full transition-all duration-300 hover:scale-105 text-sm font-medium"
               >
                 <span className="mr-2">🔗</span>
                 View My Public Profile
               </a>
             </div>
           )}
         </div>
       </section>

      {/* Search and Filter */}
      <section id="search-filter" className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <LinkableHeading level={2} id="search-and-filter" className="text-2xl font-bold text-foreground mb-6 text-center">
            Search & Filter Articles
          </LinkableHeading>
          <SearchFilter
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
        <section id="featured" className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <LinkableHeading level={2} id="featured-articles" className="text-2xl font-bold text-foreground mb-6">
              Featured Articles
            </LinkableHeading>
            <div className="space-y-4">
              {featuredPosts.map((post, index) => (
                <BlogCard
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
        <section id="all-posts" className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <LinkableHeading level={2} id="all-articles" className="text-2xl font-bold text-foreground mb-6">
              All Articles
            </LinkableHeading>
            <div className="space-y-4">
              {paginatedPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  delay={index * 50}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={goToPreviousPage}
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
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <EmptyState onClearFilters={clearFilters} />
      )}

      {/* Newsletter CTA */}
      {BLOG_CONFIG.enableNewsletter && (
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <LinkableHeading level={2} id="newsletter" className="text-3xl font-bold text-foreground mb-4">
              {BLOG_CONFIG.newsletterTitle}
            </LinkableHeading>
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

export default Blog;
