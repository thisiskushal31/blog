
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BLOG_BASE_PATH } from '../config/config';

// NotFound.tsx - 404 Not Found page.
// This page is shown when a user navigates to a route that does not exist.
// It provides a friendly message and a link back to the blog home.
// If the NotFound page fails to render, an error is logged and a fallback UI is shown.
const NotFound = () => {
  try {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to={BLOG_BASE_PATH}>Go to Blog Home</Link>
            </Button>
            <Button asChild variant="outline">
              <a 
                href="https://thisiskushal31.github.io/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Back to Portfolio
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering NotFound page:", err);
    return (
      <div style={{ color: 'red', fontFamily: 'monospace', padding: '2rem' }}>
        An error occurred while loading the Not Found page. Please try refreshing the page.
      </div>
    );
  }
};

export default NotFound;
