// GitHubBlogPost.tsx
// GitHub-style blog post page with exact GitHub markdown rendering
// Clean architecture with proper separation of concerns

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar, 
  Share2, 
  ArrowLeft, 
  Github,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { blogPosts } from '@/content/blogPostIndex';
import GitHubMarkdownViewer from '@/components/markdown/GitHubMarkdownViewer';
import GitHubLayout from '@/components/layout/GitHubLayout';
import { BLOG_BASE_PATH, BASE_URL, AUTHOR } from '@/config/config';
import { toast } from 'sonner';

const GitHubBlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showFooter, setShowFooter] = useState(false);
  const [copied, setCopied] = useState(false);

  // Find the blog post by slug
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <GitHubLayout variant="post">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to={BLOG_BASE_PATH}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </GitHubLayout>
    );
  }

  // Construct the share URL
  const shareUrl = `${BASE_URL}#/blog/${post.slug}`;
  
  // Determine which author to use
  const postAuthor = post.author || AUTHOR;

  // Copy link handler
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast.error("Failed to copy link");
    }
  };

  return (
    <GitHubLayout variant="post">
      <div className="max-w-4xl mx-auto px-4 py-2">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Link 
            to={BLOG_BASE_PATH} 
            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">{post.title}</span>
        </nav>

        {/* Article Header */}
        <article className="mb-8">
          <header className="mb-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.searchCategories.map((category) => (
                <Badge 
                  key={category} 
                  variant="secondary" 
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {post.subtitle}
              </p>
            )}

            {/* Author and metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <img 
                  src={postAuthor.avatar}
                  alt={postAuthor.name}
                  className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {postAuthor.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {(postAuthor as any).title || "Author"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.publishDate}</span>
                </span>
                {post.readTime && (
                  <span className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyLink}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-8">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />
                {post.coverImageCredit && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                    {post.coverImageCredit}
                  </p>
                )}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <GitHubMarkdownViewer 
              content={post.content} 
              postSlug={post.slug} 
              onContentFullyLoaded={() => setShowFooter(true)}
            />
          </div>
        </article>

        {/* Article Footer */}
        {showFooter && (
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={postAuthor.avatar}
                  alt={postAuthor.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {postAuthor.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {(postAuthor as any).title || "Author"}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline" size="sm">
                  <Link to={BLOG_BASE_PATH}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a 
                    href={`https://github.com/thisiskushal31/blog/blob/main/src/content/blog/markdown/${post.slug}.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Source
                  </a>
                </Button>
              </div>
            </div>
          </footer>
        )}
      </div>
    </GitHubLayout>
  );
};

export default GitHubBlogPost;
