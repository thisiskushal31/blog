
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Share2, Twitter, Linkedin, Link2, Sun, Moon } from 'lucide-react';
import { blogPosts } from '@/content/blogPostIndex';
import MarkdownViewer from '@/components/MarkdownViewer';
import ScrollToTop from '@/components/ScrollToTop';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/useTheme';
import ImageWithFallback from '@/components/ImageWithFallback';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  
  const post = blogPosts.find(p => p.slug === slug);

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

  const shareUrl = `${window.location.origin}/blog/#/${post.slug}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "The blog post link has been copied to your clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast({
        title: "Copy failed",
        description: "Unable to copy link to clipboard. Please try again.",
        variant: "destructive",
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
                <span className="text-white font-bold font-mono text-sm">B</span>
              </div>
              <h1 className="text-xl font-bold">DevOps Blog</h1>
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
              <ImageWithFallback 
                src={post.coverImage} 
                alt={post.title}
                className="w-full rounded-lg shadow-lg mb-8"
                loading="lazy"
              />
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <MarkdownViewer content={post.content} postSlug={post.slug} />
          </div>
        </article>
      </main>

      <ScrollToTop />
    </div>
  );
};

export default BlogPost;
