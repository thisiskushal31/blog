
import { BLOG_BASE_PATH } from '../config/config';

// NotFound.tsx - 404 Not Found page.
// This page is shown when a user navigates to a route that does not exist.
// It provides a friendly message and a link back to the blog home.
// If the NotFound page fails to render, an error is logged and a fallback UI is shown.
const NotFound = () => {
  try {
    return (
      <div className="bg-background flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            <p className="text-muted-foreground text-sm">
              Use the navigation links in the footer below to get back on track.
            </p>
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
