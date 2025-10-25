// GitHubBlog.tsx
// GitHub-style blog listing page with clean, minimal design
// Maintains all functionality while providing GitHub's aesthetic

import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User,
  Github,
  ExternalLink
} from 'lucide-react';
import { blogPosts } from '@/content/blogPostIndex';
import GitHubLayout from '@/components/layout/GitHubLayout';
import { BLOG_BASE_PATH, AUTHOR } from '@/config/config';

const GitHubBlog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const POSTS_PER_PAGE = 9;

  // Compute all unique search categories
  const categories = useMemo(() => {
    const cats = blogPosts.reduce((acc, post) => {
      post.searchCategories.forEach((cat) => acc.add(cat));
      return acc;
    }, new Set<string>());
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter posts by selected category and search query
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) =>
        post.searchCategories.includes(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.searchCategories.some(cat => 
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Get featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchQuery]);

  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  }, [filteredPosts, page]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <GitHubLayout variant="blog">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Tech Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Practical guides, insights, and tutorials for developers, engineers, and tech professionals.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>

          {/* Filter Chips */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category === 'all' ? 'All Posts' : category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Featured Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {searchQuery ? `Search Results` : `All Posts`}
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredPosts.length} posts
            </span>
          </div>

          {paginatedPosts.length > 0 ? (
            <div className="space-y-4">
              {paginatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchQuery 
                  ? `No posts match your search for "${searchQuery}"`
                  : 'No posts available in this category'
                }
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400 px-4">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </GitHubLayout>
  );
};

// Featured Post Card Component
const FeaturedPostCard: React.FC<{ post: any }> = ({ post }) => {
  const postAuthor = post.author || AUTHOR;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex items-start space-x-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">
              Featured
            </Badge>
            {post.searchCategories.slice(0, 2).map((category: string) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{post.publishDate}</span>
              </span>
              {post.readTime && (
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </span>
              )}
            </div>
            <Button asChild size="sm" variant="outline">
              <Link to={`${BLOG_BASE_PATH}/${post.slug}`}>
                Read
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Post Card Component
const PostCard: React.FC<{ post: any }> = ({ post }) => {
  const postAuthor = post.author || AUTHOR;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex items-start space-x-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            {post.searchCategories.slice(0, 3).map((category: string) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{postAuthor.name}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{post.publishDate}</span>
              </span>
              {post.readTime && (
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild size="sm" variant="outline">
                <Link to={`${BLOG_BASE_PATH}/${post.slug}`}>
                  Read
                </Link>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <a 
                  href={`https://github.com/thisiskushal31/blog/blob/main/src/content/blog/markdown/${post.slug}.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubBlog;
