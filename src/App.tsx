import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Components
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';

// Pages
import Home from './pages/Home';
import ProjectsGrid from './pages/ProjectsGrid';
import ProjectsDetail from './pages/ProjectsDetail';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AiEditorPage from './pages/AiEditorPage';
import NovaworksAiPage from './pages/NovaworksAiPage';
import AgentPage from './pages/AgentPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Careers from './pages/Careers';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/services" element={<ServicesPage />} />
              <Route path="/service/:service" element={<ServiceDetail />} />

              <Route path="/projects" element={<ProjectsGrid />} />
              <Route path="/projects/:slug" element={<ProjectsDetail />} />

              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />

              <Route path="/careers" element={<Careers />} />

              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />

              {/* AI Tools */}
              <Route path="/ai-editor" element={<AiEditorPage />} />
              <Route path="/novaworks-ai" element={<NovaworksAiPage />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/agent" element={<AgentPage />} />
            </Routes>
            <Footer />
            <Chatbot />
          </div>
        )}
      </AnimatePresence >
    </>
  );
}

export default App;
