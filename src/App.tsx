// App.tsx - Root component for the blog application.
// This component sets up global providers (theme, query, tooltips, toasts), routing, and layout.
// It is the main entry point for all pages and global UI.
// If any provider fails to render, an error is logged and a fallback UI is shown.
import { HashRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import ScrollToTop from "@/components/ScrollToTop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import { BLOG_BASE_PATH } from "./config/config";

// Create React Query client for data fetching
const queryClient = new QueryClient();

let App: React.FC;
try {
  App = () => (
    // Provide React Query for data fetching and caching
    <QueryClientProvider client={queryClient}>
      {/* Provide theme context (light/dark/system) */}
      <ThemeProvider defaultTheme="light" storageKey="blog-theme">
        {/* Tooltip context for the whole app */}
        <TooltipProvider>
          {/* Toast notifications (Sonner only) */}
          <Sonner position="bottom-left" />
          {/* HashRouter for client-side routing (GitHub Pages friendly) */}
          <HashRouter>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Main blog routes */}
                <Route path="/" element={<Blog />} />
                <Route path={BLOG_BASE_PATH} element={<Blog />} />
                <Route path={`${BLOG_BASE_PATH}/:slug`} element={<BlogPost />} />
                {/* 404 fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* Floating scroll-to-top button */}
              <ScrollToTop />
            </div>
          </HashRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
} catch (err) {
  // Log the error and show a fallback UI
  // eslint-disable-next-line no-console
  console.error("Error rendering App component:", err);
  App = () => (
    <div style={{ color: 'red', fontFamily: 'monospace', padding: '2rem' }}>
      An error occurred while loading the application. Please try refreshing the page.
    </div>
  );
}

export default App;
