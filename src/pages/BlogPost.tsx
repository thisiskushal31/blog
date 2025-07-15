
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Share2, Twitter, Linkedin, Link2, Sun, Moon } from 'lucide-react';
import { blogPosts } from '@/content/blogPostIndex';
import MarkdownViewer from '@/components/MarkdownViewer';
import ScrollToTop from '@/components/ScrollToTop';
import { useTheme } from '@/hooks/useTheme';
import ImageWithFallback from '@/components/ImageWithFallback';
import { toast as sonnerToast } from "sonner"; // Import Sonner's toast for testing
import { useEffect } from 'react';

// BlogPost.tsx - Blog post detail page.
// This page displays a single blog post, handles sharing, copying links, and error states.
// It fetches the post by slug and renders the Markdown content.
// If the post lookup or rendering fails, an error is logged and a fallback UI is shown.
const BlogPost = () => {
  // React Hooks must always be called at the top level, not inside try/catch or conditionals.
  const { slug } = useParams<{ slug: string }>();
  const { theme, toggleTheme } = useTheme();

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
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      );
    }

    // Construct the share URL for this post
    const shareUrl = `${window.location.origin}/blog/#/${post.slug}`;
    
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

    const handleShare = (platform: 'twitter' | 'linkedin') => {
      const text = `Check out this blog post: ${post.title}`;
      const url = shareUrl;
      
      if (platform === 'twitter') {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'noopener,noreferrer');
      } else if (platform === 'linkedin') {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
      }
    };

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold font-mono text-sm">KG</span>
                </div>
                <h1 className="text-xl font-bold">Kushal's Blog</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="w-9 h-9 p-0"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/blog" className="inline-flex items-center">
                    Back to Blog
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a 
                    href="https://thisiskushal31.github.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    Portfolio
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Article Header */}
          <article>
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
              
              {post.subtitle && (
                <p className="text-xl text-muted-foreground mb-6">{post.subtitle}</p>
              )}

              {/* Author info and social buttons - improved mobile layout */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
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
                
                {/* Social Share */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="p-2"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="p-2"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="p-2"
                  >
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {post.coverImage && (
                <div className="relative w-full mb-8">
                  <ImageWithFallback 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full rounded-lg shadow-lg"
                    loading="lazy"
                  />
                  {post.coverImageCredit && (
                    <div className="absolute left-0 bottom-2 w-full flex justify-end pr-4">
                      <span className="bg-background/80 text-xs italic text-muted-foreground px-2 py-1 rounded shadow-sm">
                        {post.coverImageCredit}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <MarkdownViewer content={post.content} postSlug={post.slug} />
            </div>
            {/* Conditionally render Load More */}
            {!hasHash && (
              <div className="mt-8 flex justify-center">
                {/* Load More button or feature here */}
                <Button variant="outline" size="lg">Load More</Button>
              </div>
            )}
          </article>
        </main>

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
