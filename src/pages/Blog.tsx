import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Tag } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import SearchFilter from '@/components/blog/SearchFilter';
import ScrollToTop from '@/components/common/ScrollToTop';
import LinkableHeading from '@/components/LinkableHeading';
import DynamicNavbar from '@/components/DynamicNavbar';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import { useNavbarVisibility } from '@/hooks/useNavbarVisibility';
import { blogPosts } from '@/content/index';
import { BLOG_CONFIG, AUTHOR, SOCIAL_LINKS, NAVIGATION_CONFIG } from '@/config/config';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = BLOG_CONFIG.postsPerPage;
  
  // Navbar visibility and theme management
  const { showNavbar, isDark, toggleTheme, toggleNavbar } = useNavbarVisibility();

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
        {/* Dynamic Navbar */}
        <DynamicNavbar isVisible={showNavbar} onClose={toggleNavbar} />
        
        {/* Floating Action Buttons */}
        <FloatingActionButtons
          showNavbar={showNavbar}
          onToggleNavbar={toggleNavbar}
        />
        
       {/* Personal Intro + Blog Section */}
       <section id="intro-section" className="relative py-16 px-4 overflow-hidden">
         {/* Animated Background */}
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
             
             {/* Floating Code Elements */}
             <div className="absolute top-10 left-10 text-6xl font-mono text-primary/10 select-none animate-bounce" style={{animationDuration: '6s'}}>
               {'</>'}
             </div>
             <div className="absolute bottom-10 right-10 text-4xl font-mono text-accent/10 select-none animate-pulse" style={{animationDuration: '4s'}}>
               {'{}'}
             </div>
             <div className="absolute top-1/2 left-1/4 text-3xl font-mono text-muted-foreground/10 select-none animate-ping" style={{animationDuration: '8s'}}>
               {'<div>'}
             </div>
             
             {/* Additional Floating Elements */}
             <div className="absolute top-1/3 right-1/4 text-2xl font-mono text-blue-500/10 select-none animate-float">
               {'React'}
             </div>
             <div className="absolute bottom-1/3 left-1/3 text-xl font-mono text-purple-500/10 select-none animate-float" style={{animationDelay: '2s'}}>
               {'TypeScript'}
             </div>
             <div className="absolute top-2/3 right-1/3 text-lg font-mono text-teal-500/10 select-none animate-float" style={{animationDelay: '4s'}}>
               {'Node.js'}
             </div>
             
             {/* Animated Dots */}
             <div className="absolute top-1/4 right-1/5 w-2 h-2 bg-primary/20 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
             <div className="absolute bottom-1/4 left-1/5 w-1 h-1 bg-accent/20 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
             <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-blue-500/20 rounded-full animate-ping" style={{animationDelay: '5s'}}></div>
           </div>
           <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/70 to-background/55"></div>
         </div>
         <div className="relative z-10 max-w-6xl mx-auto">
           {/* Personal Introduction */}
           <div className="mb-12">
             <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
               {/* Photo */}
               <div className="flex-shrink-0">
                 <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white/20">
                   <img 
                     src={AUTHOR.avatar} 
                     alt={AUTHOR.name} 
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
                 <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Hi, I'm {AUTHOR.name}</h1>
                 <p className="text-lg text-muted-foreground mb-4">{AUTHOR.title}</p>
                 <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                   {AUTHOR.bio}
                 </p>
               </div>
             </div>
           </div>

           {/* Stats */}
           <div className="text-center mb-6">
             <div className="inline-flex items-center space-x-4 text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-2">
               <div className="flex items-center space-x-1">
                 <BookOpen className="w-3 h-3 text-primary" />
                 <span>{blogPosts.length} Articles</span>
               </div>
               <div className="w-px h-3 bg-border"></div>
               <div className="flex items-center space-x-1">
                 <Tag className="w-3 h-3 text-accent" />
                 <span>{availableTags.length} Topics</span>
               </div>
             </div>
           </div>

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
      <section id="search-filter" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <LinkableHeading level={2} id="search-and-filter" className="text-3xl font-bold text-foreground mb-8 text-center">
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
        <section id="featured" className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <LinkableHeading level={2} id="featured-articles" className="text-3xl font-bold text-foreground mb-8">
              Featured Articles
            </LinkableHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <section id="all-posts" className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <LinkableHeading level={2} id="all-articles" className="text-3xl font-bold text-foreground mb-8">
              All Articles
            </LinkableHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="mt-12">
                <div className="flex items-center justify-center space-x-2">
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
            <LinkableHeading level={3} id="no-articles-found" className="text-2xl font-semibold text-foreground mb-4">
              No articles found
            </LinkableHeading>
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
