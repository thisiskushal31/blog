
import { HashRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import ScrollToTop from "@/components/ScrollToTop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

// Create React Query client for data fetching
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="blog-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Main blog routes */}
              <Route path="/" element={<Blog />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop />
          </div>
        <HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
