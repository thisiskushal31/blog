// Blog.tsx - Main blog listing page with Palark-inspired design.
// This page displays all blog posts, allows filtering by category, and toggling the theme.
// It is the entry point for browsing and discovering posts.
// If blog post data or categories fail to load, an error is logged and a fallback UI is shown.
import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Sun, Moon, Search, Menu, X, Github, Linkedin, Briefcase } from "lucide-react";
import { blogPosts } from "@/content/blogPostIndex";
import { useTheme } from "@/hooks/useTheme";
import ImageWithFallback from "@/components/ImageWithFallback";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { BLOG_BASE_PATH, AUTHOR, BASE_URL, PORTFOLIO_URL } from "../config/config";

const POSTS_PER_PAGE = 6;
const Blog = () => {
  // React Hooks must always be called at the top level, not inside try/catch or conditionals.
  // State for the currently selected category filter
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Compute all unique search categories from blog posts (for UI filtering)
  const categories = useMemo(() => {
    const cats = blogPosts.reduce((acc, post) => {
      post.searchCategories.forEach((cat) => acc.add(cat));
      return acc;
    }, new Set<string>());
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return blogPosts;
    return blogPosts.filter((post) =>
      post.searchCategories.includes(selectedCategory)
    );
  }, [selectedCategory]);

  // Get featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured);

  const [page, setPage] = useState(1);

  // Reset pagination when filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  }, [filteredPosts, page]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <div className="min-h-screen bg-background">
        {/* Header - Palark inspired */}
        <header className="border-b border-blue-100 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold font-mono text-xl">
                    KG
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Kushal Gupta
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Tech Blog</p>
                </div>
              </div>

              {/* Right side - Navigation and Theme Toggle */}
              <div className="flex items-center space-x-4">
                {/* Desktop Navigation - Icon buttons */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button asChild variant="ghost" size="sm" className="w-14 h-14 p-0 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800" title="Portfolio">
                    <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
                      <Briefcase className="h-7 w-7" />
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="w-14 h-14 p-0 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800" title="GitHub">
                    <a href="https://github.com/thisiskushal31" target="_blank" rel="noopener noreferrer">
                      <Github className="h-7 w-7" />
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="w-14 h-14 p-0 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800" title="LinkedIn">
                    <a href="https://linkedin.com/in/thisiskushal31" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-7 w-7" />
                    </a>
                  </Button>
                </div>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-14 h-14 p-0 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === "dark" ? (
                    <Sun className="h-7 w-7" />
                  ) : (
                    <Moon className="h-7 w-7" />
                  )}
                </Button>
                
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden w-9 h-9 p-0 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-blue-100 dark:border-slate-700 pt-4">
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="ghost" size="sm" className="justify-start text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800">
                    <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Portfolio
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="justify-start text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800">
                    <a href="https://github.com/thisiskushal31" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="justify-start text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800">
                    <a href="https://linkedin.com/in/thisiskushal31" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Featured Posts - Moved to top since it's the main attraction */}
          {featuredPosts.length > 0 && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3 text-slate-800 dark:text-slate-100">Featured Posts</h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Handpicked articles with the highest quality content and most valuable insights
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.slug} className="card-hover group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 hover:shadow-2xl">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="default" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-md">
                            Featured
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {/* Search Categories - Primary display (solid grey) */}
                        {post.searchCategories.slice(0, 3).map((category) => (
                          <Badge
                            key={`search-${category}`}
                            variant="secondary"
                            className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                          >
                            {category}
                          </Badge>
                        ))}
                        {/* SEO Categories - Secondary display (blue outline) */}
                        {post.categories.slice(0, 2).map((category) => (
                          <Badge
                            key={`seo-${category}`}
                            variant="default"
                            className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-800 dark:text-slate-100">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {post.publishDate}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
                        <Link to={`${BLOG_BASE_PATH}/${post.slug}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Category Filter - Tag Cloud Style */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg' 
                      : 'hover:shadow-md text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">All Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => {
                // Determine which author to use: per-post or global
                const postAuthor = post.author || AUTHOR;
                return (
                  <Card key={post.slug} className="card-hover group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 hover:shadow-2xl">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {/* Search Categories - Primary display (solid grey) */}
                        {post.searchCategories.slice(0, 3).map((category) => (
                          <Badge
                            key={`search-${category}`}
                            variant="secondary"
                            className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                          >
                            {category}
                          </Badge>
                        ))}
                        {/* SEO Categories - Secondary display (blue outline) */}
                        {post.categories.slice(0, 2).map((category) => (
                          <Badge
                            key={`seo-${category}`}
                            variant="default"
                            className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-800 dark:text-slate-100">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      {/* Author info below excerpt */}
                      <div className="flex items-center mb-3 text-sm text-slate-500 dark:text-slate-400">
                        <img
                          src={postAuthor.avatar}
                          alt={postAuthor.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <div>
                          <span className="font-medium">{postAuthor.name}</span>
                          {postAuthor.title && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">
                              • {postAuthor.title}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {post.publishDate}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      <Button asChild variant="outline" className="w-full hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:text-slate-800 dark:hover:text-slate-100">
                        <Link to={`${BLOG_BASE_PATH}/${post.slug}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {page === 1 ? (
                        <span className="gap-1 pl-2.5 opacity-50 pointer-events-none select-none inline-flex items-center h-10 px-4 rounded-md border border-input bg-background text-muted-foreground">
                          <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          <span>Previous</span>
                        </span>
                      ) : (
                        <PaginationPrevious onClick={() => setPage(page - 1)} />
                      )}
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      {page === totalPages ? (
                        <span className="gap-1 pr-2.5 opacity-50 pointer-events-none select-none inline-flex items-center h-10 px-4 rounded-md border border-input bg-background text-muted-foreground">
                          <span>Next</span>
                          <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      ) : (
                        <PaginationNext onClick={() => setPage(page + 1)} />
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>
        </main>
      </div>
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Blog page:", err);
    return (
      <div style={{ color: 'red', fontFamily: 'monospace', padding: '2rem' }}>
        An error occurred while loading the blog posts. Please try refreshing the page.
      </div>
    );
  }
};

export default Blog;
