import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-50"
      initial={{ width: '0%' }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ transformOrigin: 'left' }}
    />
  );
}
