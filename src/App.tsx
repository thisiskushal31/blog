import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import Navigation from '@/components/navigation/Navigation';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="blog-theme">
      <HashRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Blog />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;