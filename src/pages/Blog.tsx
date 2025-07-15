// Blog.tsx - Main blog listing page.
// This page displays all blog posts, allows filtering by category, and toggling the theme.
// It is the entry point for browsing and discovering posts.
// If blog post data or categories fail to load, an error is logged and a fallback UI is shown.
import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Sun, Moon } from "lucide-react";
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

const POSTS_PER_PAGE = 6;
const Blog = () => {
  // React Hooks must always be called at the top level, not inside try/catch or conditionals.
  // State for the currently selected category filter
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { theme, toggleTheme } = useTheme();

  // Compute all unique categories from blog posts
  const categories = useMemo(() => {
    const cats = blogPosts.reduce((acc, post) => {
      post.categories.forEach((cat) => acc.add(cat));
      return acc;
    }, new Set<string>());
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter posts by selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return blogPosts;
    return blogPosts.filter((post) =>
      post.categories.includes(selectedCategory)
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
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold font-mono text-sm">
                    B
                  </span>
                </div>
                <h1 className="text-xl font-bold">Kushal's Blog</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-9 h-9 p-0"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://thisiskushal31.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    Back to Portfolio
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Featured Posts</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <Card key={post.slug} className="card-hover">
                    <CardHeader className="p-0">
                      <ImageWithFallback
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        loading="lazy"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
                      <Button asChild className="w-full">
                        <Link to={`/blog/${post.slug}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Category Filter */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-6">All Posts</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
                <Card key={post.slug} className="card-hover">
                  <CardHeader className="p-0">
                    <ImageWithFallback
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      loading="lazy"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Classic Pagination Controls */}
            <div className="flex justify-center mt-8">
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
