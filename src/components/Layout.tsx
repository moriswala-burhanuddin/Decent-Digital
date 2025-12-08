import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProgressBar from './ProgressBar';
import LoadingScreen from './LoadingScreen';
import ScrollToTop from './ScrollToTop';
import { useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import Chatbot from './Chatbot';

export default function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        // Immediate scroll reset
        window.scrollTo(0, 0);

        // Also try to reset via document element for broader browser support
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [pathname]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-white transition-colors duration-300 selection:bg-primary selection:text-white">
            <LoadingScreen />
            <ProgressBar />
            <ScrollToTop />
            <Chatbot />
            <Header />
            <main className="pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
