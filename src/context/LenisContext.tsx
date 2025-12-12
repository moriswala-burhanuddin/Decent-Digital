import { createContext, useContext, useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
    lenis: Lenis | null;
    isPaused: boolean;
    stopLenis: () => void;
    startLenis: () => void;
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export function LenisProvider({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const reqIdRef = useRef<number | null>(null);

    useEffect(() => {
        const newLenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        setLenis(newLenis);

        function raf(time: number) {
            newLenis.raf(time);
            reqIdRef.current = requestAnimationFrame(raf);
        }

        reqIdRef.current = requestAnimationFrame(raf);

        return () => {
            newLenis.destroy();
            if (reqIdRef.current) {
                cancelAnimationFrame(reqIdRef.current);
            }
        };
    }, []);

    const stopLenis = () => {
        lenis?.stop();
        setIsPaused(true);
    };

    const startLenis = () => {
        lenis?.start();
        setIsPaused(false);
    };

    return (
        <LenisContext.Provider value={{ lenis, isPaused, stopLenis, startLenis }}>
            {children}
        </LenisContext.Provider>
    );
}

export function useLenis() {
    const context = useContext(LenisContext);
    if (context === undefined) {
        throw new Error('useLenis must be used within a LenisProvider');
    }
    return context;
}
