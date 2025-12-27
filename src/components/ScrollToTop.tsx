import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import { useLenis } from '../context/LenisContext';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  // Safely attempt to get lenis context, though it should be available
  let lenisContext;
  try {
    lenisContext = useLenis();
  } catch (e) {
    // Fallback if used outside provider (unlikely in this app structure)
    lenisContext = { lenis: null };
  }
  const { lenis } = lenisContext;

  useEffect(() => {
    // Disable native scroll restoration to let us control it
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Timeout to ensure this runs after any transition/animation start
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }, 50); // Reduced timeout since we disabled restoration
    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-2xl border border-white/20"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowUp className="w-6 h-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
