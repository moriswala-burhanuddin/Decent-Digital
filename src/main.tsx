import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ServicesPage from './pages/ServicesPage.tsx';
import ServicesDetail from './pages/ServiceDetail.tsx';
import ProjectsDetail from './pages/ProjectsDetail.tsx';

import Blog from './pages/Blog.tsx';
import Careers from './pages/Careers.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BlogDetail from './pages/BlogDetail';
import AboutUsPage from './pages/AboutUsPage.tsx';
import ContactPage from './pages/ContactPage.tsx';

import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProjectsGrid from './pages/ProjectsGrid.tsx';



// Create QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: '12px',
                background: '#0f172a',
                color: '#fff',
              },
            }}
          />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<App />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/service/:service" element={<ServicesDetail />} />

              <Route path="/projects/:slug" element={<ProjectsDetail />} />
              <Route path="/projects" element={<ProjectsGrid />} />
              <Route path="/about" element={<AboutUsPage />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
