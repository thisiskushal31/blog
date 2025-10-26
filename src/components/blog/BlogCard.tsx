// BlogCard.tsx
// Blog post card component with SEO-friendly structured data
// Features: Cover images, tags, read time, publish date, responsive design

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  publishDate: string;
  categories: string[];
  searchCategories: string[];
  featured?: boolean;
  coverImage: string;
  coverImageCredit?: string;
  author?: {
    name: string;
    avatar: string;
  };
  readTime?: string;
}

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
}

/**
 * BlogCard Component
 * Displays a blog post card with cover image, metadata, and structured data for SEO
 */
const BlogCard: React.FC<BlogCardProps> = ({ post, delay = 0 }) => {
  /**
   * Format date string to readable format
   * @param dateString - ISO date string
   * @returns Formatted date string
   */
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <article 
      className="blog-card group fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      {/* Image */}
      {post.coverImage && (
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="space-y-4">
        {/* Tags - Show both searchCategories and categories for SEO */}
        {(post.searchCategories?.length > 0 || post.categories?.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {/* Search Categories (for filtering) */}
            {post.searchCategories?.slice(0, 2).map((tag, index) => (
              <span
                key={`search-${index}`}
                className="tag text-xs bg-primary/10 text-primary border border-primary/20"
                data-category-type="search"
                data-category={tag.toLowerCase().replace(/\s+/g, '-')}
                title={`Search category: ${tag}`}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {/* SEO Categories (for SEO and display) */}
            {post.categories?.slice(0, 3).map((tag, index) => (
              <span
                key={`seo-${index}`}
                className="tag text-xs"
                data-category-type="seo"
                data-category={tag.toLowerCase().replace(/\s+/g, '-')}
                title={`SEO category: ${tag}`}
                itemProp="keywords"
                content={tag}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 
          className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2"
          itemProp="headline"
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p 
          className="text-muted-foreground line-clamp-3 leading-relaxed"
          itemProp="description"
        >
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <time 
                dateTime={post.publishDate}
                itemProp="datePublished"
              >
                {formatDate(post.publishDate)}
              </time>
            </div>
            {post.readTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span itemProp="timeRequired">{post.readTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Read More */}
        <div className="pt-2">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary hover:text-accent transition-colors duration-200 group/link"
            itemProp="url"
          >
            <span className="font-medium">Read more</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Hidden SEO Meta Data */}
        <div className="sr-only" aria-hidden="true">
          <meta itemProp="author" content={post.author?.name || "Kushal Gupta"} />
          <meta itemProp="publisher" content="Kushal Gupta Tech Blog" />
          <meta itemProp="mainEntityOfPage" content={`https://thisiskushal31.github.io/blog/#/blog/${post.slug}`} />
          {post.categories && (
            <meta itemProp="keywords" content={post.categories.join(', ')} />
          )}
          {post.searchCategories && (
            <meta itemProp="articleSection" content={post.searchCategories.join(', ')} />
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;