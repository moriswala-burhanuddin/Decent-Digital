import { useState, useEffect } from 'react';
import { Search, ArrowRight, Command, Menu, X, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { scrollY } = useScroll();

  // Subtle scroll animations
  const headerY = useTransform(scrollY, [0, 50], [0, -10]);
  const headerBorderOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard Shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    // { label: 'AI Editor', path: '/ai-editor' },
    // { label: 'Novaworks AI', path: '/novaworks-ai' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 group"
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden">
                  <img src="/logo.png" alt="Decent Digital" className="w-full h-full object-contain" />
                </div>
                <span className={`text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-90'}`}>
                  Decent Digital
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.path)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="text-xs font-medium hidden xl:inline">Search</span>
                <div className="hidden xl:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/10 text-[10px] font-medium ml-1">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="hidden md:flex px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium text-sm items-center gap-2 hover:opacity-90 transition-opacity shadow-md hover:shadow-lg transform active:scale-95 duration-200"
              >
                Let's Talk
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Professional Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[320px] bg-white dark:bg-slate-950 z-50 shadow-2xl flex flex-col lg:hidden border-l border-slate-200 dark:border-slate-800"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-lg text-slate-900 dark:text-white">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="flex flex-col px-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.path)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left transition-all duration-200 ${isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                          }`}
                      >
                        <span className="text-base">{item.label}</span>
                        {isActive && <ChevronRight className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-6 px-8">
                  <div className="h-px bg-slate-100 dark:bg-slate-800 w-full mb-6" />
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Appearance</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Menu Footer */}
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <button
                  onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/20 transition-colors flex items-center justify-center gap-2"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  © 2024 Decent Digital
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
