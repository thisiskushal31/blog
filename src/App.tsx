import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="blog-theme">
      <HashRouter>
        <div className="min-h-screen bg-background">
          <main>
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