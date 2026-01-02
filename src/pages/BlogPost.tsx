import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2, BookOpen } from 'lucide-react';
import MarkdownViewer from '@/components/common/MarkdownViewer';
import ScrollToTop from '@/components/common/ScrollToTop';
import DynamicNavbar from '@/components/DynamicNavbar';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import { useNavbarVisibility } from '@/hooks/useNavbarVisibility';
import { blogPosts } from '@/content/index';
import { BLOG_POST_CONFIG } from '@/config/config';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Navbar visibility and theme management
  const { showNavbar, isDark, toggleTheme, toggleNavbar } = useNavbarVisibility();

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      
      // Update document title and meta tags for SEO
      const cleanUrl = `https://thisiskushal31.github.io/blog/${slug}`;
      document.title = `${foundPost.title} | Kushal Gupta Tech Blog`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', foundPost.excerpt || foundPost.title);
      
      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', cleanUrl);
      
      // Update Open Graph tags
      const updateOGTag = (property: string, content: string) => {
        let ogTag = document.querySelector(`meta[property="${property}"]`);
        if (!ogTag) {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          document.head.appendChild(ogTag);
        }
        ogTag.setAttribute('content', content);
      };
      
      updateOGTag('og:title', foundPost.title);
      updateOGTag('og:description', foundPost.excerpt || foundPost.title);
      updateOGTag('og:url', cleanUrl);
      updateOGTag('og:type', 'article');
      if (foundPost.coverImage) {
        updateOGTag('og:image', foundPost.coverImage.startsWith('http') 
          ? foundPost.coverImage 
          : `https://thisiskushal31.github.io/blog${foundPost.coverImage}`);
      }
      
      // Add structured data (JSON-LD) for better SEO
      let structuredData = document.querySelector('script[type="application/ld+json"][data-blog-post]');
      if (structuredData) {
        structuredData.remove();
      }
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      structuredData.setAttribute('data-blog-post', 'true');
      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": foundPost.title,
        "description": foundPost.excerpt || foundPost.title,
        "url": cleanUrl,
        "datePublished": foundPost.publishDate,
        "author": {
          "@type": "Person",
          "name": "Kushal Gupta",
          "url": "https://thisiskushal31.github.io"
        },
        "publisher": {
          "@type": "Person",
          "name": "Kushal Gupta"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": cleanUrl
        }
      });
      document.head.appendChild(structuredData);
    }
    setIsLoading(false);
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Article not found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="btn-primary inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Navbar */}
      <DynamicNavbar isVisible={showNavbar} onClose={toggleNavbar} />
      
      {/* Floating Action Buttons */}
      <FloatingActionButtons
        showNavbar={showNavbar}
        onToggleNavbar={toggleNavbar}
      />
      {/* Cover Image - Full width at top */}
      {post.coverImage && (
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden -mt-16 pt-16">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {BLOG_POST_CONFIG.enableCoverImageCredit && post.coverImageCredit && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded backdrop-blur-sm">
              {post.coverImageCredit}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <header className={`py-12 px-4 hero-gradient ${!post.coverImage ? '-mt-16 pt-16' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Blog
          </Link>

          <div className="space-y-6">
            {/* Tags */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="tag"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime || calculateReadTime(post.content)}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <MarkdownViewer content={post.content} />
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            More Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              // Get posts excluding current and featured posts
              const availablePosts = blogPosts.filter(p => p.slug !== post.slug && !p.featured);
              
              // Get current post's categories/tags
              const currentCategories = post.categories || [];
              
              // First, find posts with matching tags/categories
              const relatedByTags = availablePosts
                .map(p => ({
                  post: p,
                  matchingTags: (p.categories || []).filter(cat => currentCategories.includes(cat)).length
                }))
                .filter(item => item.matchingTags > 0) // Only posts with matching tags
                .sort((a, b) => b.matchingTags - a.matchingTags) // More matches first
                .map(item => item.post);
              
              // Get posts without matching tags (for random selection)
              const unrelatedPosts = availablePosts
                .filter(p => !relatedByTags.includes(p))
                .sort(() => Math.random() - 0.5); // Randomize
              
              // Combine: related posts first, then fill with random posts
              const finalPosts = [
                ...relatedByTags.slice(0, 3), // Up to 3 related posts
                ...unrelatedPosts.slice(0, Math.max(0, 3 - relatedByTags.length)) // Fill remaining slots
              ];
              
              return finalPosts.slice(0, 3); // Ensure we only return 3 posts
            })().map((relatedPost, index) => (
                <div
                  key={relatedPost.slug}
                  className="blog-card fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    {relatedPost.categories && relatedPost.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {relatedPost.categories.slice(0, 2).map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="tag text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-200 line-clamp-2">
                      <Link to={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatDate(relatedPost.publishDate)}</span>
                      {relatedPost.readTime && <span>{relatedPost.readTime}</span>}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default BlogPost;
