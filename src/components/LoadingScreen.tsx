import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useLayoutEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Slightly longer for the animation to play out

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 dark:bg-slate-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Outer Ring */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border-2 border-slate-200 dark:border-slate-800"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Spinning Gradient Ring */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border-2 border-transparent border-t-blue-500 border-r-purple-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner Pulsing Circle */}
            <motion.div
              className="w-20 h-20 bg-white dark:bg-slate-900 rounded-full shadow-xl flex items-center justify-center relative z-10"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 0 10px rgba(59, 130, 246, 0.1)",
                  "0 0 0 20px rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.img
                src="/logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>

            {/* Text Animation */}
            <div className="mt-12 overflow-hidden h-8">
              <motion.div
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="flex items-center gap-2"
              >
                <span className="text-lg font-bold text-slate-900 dark:text-white tracking-widest uppercase">
                  Decent
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-lg font-light text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                  Digital
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}