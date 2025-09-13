
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Share2, Twitter, Linkedin, Link2, Sun, Moon, ArrowLeft, Menu, X, Github, Briefcase } from 'lucide-react';
import { blogPosts } from '@/content/blogPostIndex';
import MarkdownViewer from '@/components/MarkdownViewer';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';
import { useTheme } from '@/hooks/useTheme';
import ImageWithFallback from '@/components/ImageWithFallback';
import { toast as sonnerToast } from "sonner"; // Import Sonner's toast for testing
import { useEffect, useState } from 'react';
import { AUTHOR, BLOG_BASE_PATH, BASE_URL, PORTFOLIO_URL } from '../config/config';

// BlogPost.tsx - Blog post detail page with Palark-inspired design.
// This page displays a single blog post, handles sharing, copying links, and error states.
// It fetches the post by slug and renders the Markdown content.
// If the post lookup or rendering fails, an error is logged and a fallback UI is shown.
const BlogPost = () => {
  // React Hooks must always be called at the top level, not inside try/catch or conditionals.
  const { slug } = useParams<{ slug: string }>();
  const { theme, toggleTheme } = useTheme();
  const [showFooter, setShowFooter] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect if there is a hash (anchor) in the URL
  const hasHash = typeof window !== 'undefined' && window.location.hash && window.location.hash.includes('#') && window.location.hash.length > 1;

  // If there is a hash, scroll to the anchor after render
  useEffect(() => {
    if (hasHash) {
      const anchor = window.location.hash.substring(1);
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [hasHash]);

  try {
    // Find the blog post by slug
    const post = blogPosts.find(p => p.slug === slug);

    // If post not found, show a 404 message
    if (!post) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to={BLOG_BASE_PATH}>Back to Blog</Link>
            </Button>
          </div>
        </div>
      );
    }

    // Construct the share URL for this post using the configured BASE_URL
    const shareUrl = `${BASE_URL}#/blog/${post.slug}`;
    
    // Handler for copying the post link to clipboard
    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        sonnerToast.success("Link copied!", {
          description: "The blog post link has been copied to your clipboard.",
        });
      } catch (err) {
        console.error('Failed to copy link:', err);
        sonnerToast.error("Copy failed", {
          description: "Unable to copy link to clipboard. Please try again.",
        });
      }
    };

    // Determine which author to use: per-post or global
    const postAuthor = post.author || AUTHOR;

    return (
      <div className="min-h-screen bg-background">
        {/* Header - Palark inspired */}
        <header className="border-b border-blue-100 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold font-mono text-xl">KG</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Kushal Gupta
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Tech Blog</p>
                </div>
              </div>

              {/* Right side - Navigation and Theme Toggle */}
              <div className="flex items-center space-x-4">
                {/* Desktop Navigation - Icon buttons */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button asChild variant="ghost" size="sm" className="w-14 h-14 p-0 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800" title="Back to Blog">
                    <Link to={BLOG_BASE_PATH}>
                      <ArrowLeft className="h-7 w-7" />
                    </Link>
                  </Button>
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
                </div>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-14 h-14 p-0 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? (
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
                    <Link to={BLOG_BASE_PATH} className="flex items-center">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Blog
                    </Link>
                  </Button>
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
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Article Header */}
          <article>
            <header className="mb-12">
              {/* Removed redundant breadcrumb button */}
              
              <div className="flex flex-wrap gap-2 mb-6">
                {/* Search Categories - Primary display (solid grey) */}
                {post.searchCategories.map((category) => (
                  <Badge key={`search-${category}`} variant="secondary" className="text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                    {category}
                  </Badge>
                ))}
                {/* SEO Categories - Secondary display (blue outline) */}
                {post.categories.map((category) => (
                  <Badge 
                    key={`seo-${category}`} 
                    variant="default"
                    className="text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{post.title}</h1>
              
              {post.subtitle && (
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">{post.subtitle}</p>
              )}

              {/* Author info and social buttons - improved mobile layout */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <img 
                      src={postAuthor.avatar}
                      alt={postAuthor.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-100">{postAuthor.name}</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Author</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.publishDate}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                
                {/* Social Share - Improved CTA styling */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:shadow-md hover:scale-105"
                    title="Copy link"
                  >
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>

              {post.coverImage && (
                <div className="relative w-full mb-8 rounded-xl overflow-hidden shadow-2xl">
                  <ImageWithFallback 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-96 object-cover"
                    loading="lazy"
                  />
                  {post.coverImageCredit && (
                    <div className="absolute left-0 bottom-2 w-full flex justify-end pr-4">
                      <span className="bg-white/90 dark:bg-slate-800/90 text-xs italic text-slate-600 dark:text-slate-300 px-3 py-2 rounded-lg shadow-sm backdrop-blur">
                        {post.coverImageCredit}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-code:text-slate-800 dark:prose-code:text-slate-100 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800 prose-pre:text-slate-800 dark:prose-pre:text-slate-100">
              <MarkdownViewer 
                content={post.content} 
                postSlug={post.slug} 
                onContentFullyLoaded={() => setShowFooter(true)}
              />
            </div>
          </article>
        </main>

        {/* Footer - only show after content is fully loaded */}
        {showFooter && <Footer />}

        <ScrollToTop />
      </div>
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering BlogPost page:", err);
    sonnerToast.error("Error loading blog post", {
      description: "An error occurred while loading the blog post. Please try refreshing the page.",
    });
    return (
      <div style={{ color: 'red', fontFamily: 'monospace', padding: '2rem' }}>
        An error occurred while loading the blog post. Please try refreshing the page.
      </div>
    );
  }
};

export default BlogPost;
