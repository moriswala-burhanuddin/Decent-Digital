import Contact from '../components/Contact';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import ParticlesBackground from '../components/ParticlesBackground';

export default function ContactPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
        >
            {/* Hero Section
            <section className="relative pt-32 pb-12 px-6 overflow-hidden">
                <ParticlesBackground />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        Have a project in mind? We'd love to hear from you. Let's build something amazing together.
                    </motion.p>
                </div>
            </section> */}

            <Contact />
        </motion.div>
    );
}
