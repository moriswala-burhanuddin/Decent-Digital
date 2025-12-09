import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, FileText, Briefcase, Layers, Zap, Command, Hash } from 'lucide-react';
import { projectsApi } from '../services/api';
import { services } from './Services';
import { STATIC_PROJECTS } from './Projects';
import { blogPosts } from '../pages/Blog';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const [djangoProjects, setDjangoProjects] = useState<any[]>([]);

    // Fetch Django Projects
    useEffect(() => {
        projectsApi.getAllProjects()
            .then(data => {
                const list = Array.isArray(data) ? data : (data as any).results;
                setDjangoProjects(list || [])
            })
            .catch(err => console.error('Failed to fetch projects:', err));
    }, []);

    // Aggregate all searchable content
    const allContent = useMemo(() => {
        interface SearchItem {
            id: string;
            title: string;
            type: string;
            path: string;
            icon: any;
            description?: string;
        }

        const items: SearchItem[] = [
            // Pages
            { id: 'home', title: 'Home', type: 'Page', path: '/', icon: Zap, description: 'Main landing page' },
            { id: 'about', title: 'About Us', type: 'Page', path: '/about', icon: Zap, description: 'Learn about our company' },
            { id: 'services', title: 'Services', type: 'Page', path: '/#services', icon: Layers, description: 'Our services' },
            { id: 'projects', title: 'Projects', type: 'Page', path: '/projects', icon: Briefcase, description: 'Our portfolio' },
            { id: 'blog', title: 'Blog', type: 'Page', path: '/blog', icon: FileText, description: 'Latest news and articles' },
            { id: 'contact', title: 'Contact', type: 'Page', path: '/contact', icon: Zap, description: 'Get in touch' },

            // Services
            ...services.map(s => ({
                id: s.id,
                title: s.title,
                type: 'Service',
                path: `/service/${s.id}`,
                icon: s.icon,
                description: s.description
            })),

            // Projects (Static) - REMOVED as per request
            // ...STATIC_PROJECTS.map(p => ({ ... })),

            // Projects (Django) - REMOVED as per request
            // ...djangoProjects.filter(p => p.id).map(p => ({ ... })),

            // Blog Posts
            ...blogPosts.map(b => ({
                id: b.id.toString(),
                title: b.title,
                type: 'Article',
                path: `/blog/${b.id}`,
                icon: FileText,
                description: b.excerpt
            }))
        ];
        return items;
    }, [djangoProjects]);

    // Filter results
    const results = useMemo(() => {
        if (!query.trim()) return [];
        const lowerQuery = query.toLowerCase();
        return allContent.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description?.toLowerCase().includes(lowerQuery) ||
            item.type.toLowerCase().includes(lowerQuery)
        ).slice(0, 8); // Limit to 8 results
    }, [query, allContent]);

    // Keyboard Navigation
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % results.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (results[selectedIndex]) {
                    handleSelect(results[selectedIndex]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex]);

    const handleSelect = (item: any) => {
        if (item.path.startsWith('/#')) {
            const element = document.getElementById(item.path.substring(2));
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(item.path);
        }
        onClose();
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container - Centered */}
                    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="w-full max-w-2xl pointer-events-auto"
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[70vh]">

                                {/* Search Input */}
                                <div className="relative border-b border-slate-100 dark:border-slate-800">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Search pages, services, projects..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="w-full pl-12 pr-12 py-4 bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                                    />
                                    <button
                                        onClick={onClose}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                                    >
                                        <span className="text-xs font-medium border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">ESC</span>
                                    </button>
                                </div>

                                {/* Results */}
                                <div className="overflow-y-auto p-2">
                                    {results.length > 0 ? (
                                        <div className="space-y-1">
                                            {results.map((item, index) => (
                                                <button
                                                    key={`${item.type}-${item.id}`}
                                                    onClick={() => handleSelect(item)}
                                                    onMouseEnter={() => setSelectedIndex(index)}
                                                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left group ${index === selectedIndex
                                                        ? 'bg-blue-50 dark:bg-blue-500/10'
                                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                                        }`}
                                                >
                                                    <div className={`p-2 rounded-lg ${index === selectedIndex
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                                        }`}>
                                                        <item.icon className="w-5 h-5" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className={`font-semibold truncate ${index === selectedIndex ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'
                                                                }`}>
                                                                {item.title}
                                                            </span>
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                                                                {item.type}
                                                            </span>
                                                        </div>
                                                        {item.description && (
                                                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {index === selectedIndex && (
                                                        <ArrowRight className="w-4 h-4 text-blue-500" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    ) : query ? (
                                        <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                                            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                            <p className="text-lg font-medium">No results found for "{query}"</p>
                                            <p className="text-sm">Try searching for "Services", "Blog", or "Projects"</p>
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center">
                                            <div className="flex justify-center gap-4 mb-8">
                                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                                        <Command className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-xs">Commands</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                                        <Hash className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-xs">Tags</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                                        <Zap className="w-6 h-6" />
                                                    </div>
                                                    <span className="text-xs">Actions</span>
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm">
                                                Type to start searching...
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans">↑↓</kbd> to navigate
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-sans">↵</kbd> to select
                                        </span>
                                    </div>
                                    <span>Decent Digital Search</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
