import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { LenisProvider } from './context/LenisContext';
import { HelmetProvider } from 'react-helmet-async';

// Create QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LenisProvider>
            <Router>
              <App />
            </Router>
          </LenisProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
