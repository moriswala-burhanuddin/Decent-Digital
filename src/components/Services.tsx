import React from 'react';
import { Palette, Globe, TrendingUp, Megaphone, Code, Rocket, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const services = [
  {
    id: 'brand-identity',
    icon: Palette,
    title: 'Brand Identity',
    description: 'Create a unique and memorable brand identity that resonates with your target audience.',
    features: ['Logo Design', 'Visual Identity', 'Brand Guidelines'],
    gradient: 'from-pink-500 to-rose-500',
    color: '#ec4899', // pink-500
    textColor: 'text-rose-600 dark:text-rose-400',
    descColor: 'text-rose-950/80 dark:text-rose-100/90',
  },
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    description: 'Build modern, responsive, and high-performance websites that deliver exceptional experiences.',
    features: ['React & Next.js', '3D Interactions', 'Performance First'],
    gradient: 'from-violet-500 to-purple-500',
    color: '#8b5cf6', // violet-500
    textColor: 'text-purple-600 dark:text-purple-400',
    descColor: 'text-purple-950/80 dark:text-purple-100/90',
  },
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Drive growth with data-driven marketing strategies that increase visibility and conversions.',
    features: ['SEO Strategy', 'Analytics', 'ROI Tracking'],
    gradient: 'from-blue-500 to-cyan-500',
    color: '#3b82f6', // blue-500
    textColor: 'text-blue-600 dark:text-blue-400',
    descColor: 'text-blue-950/80 dark:text-blue-100/90',
  },
  {
    id: 'social-media',
    icon: Megaphone,
    title: 'Social Media',
    description: 'Build and engage your community with compelling social media strategies.',
    features: ['Content Creation', 'Community Growth', 'Viral Campaigns'],
    gradient: 'from-amber-500 to-orange-500',
    color: '#f59e0b', // amber-500
    textColor: 'text-orange-600 dark:text-orange-400',
    descColor: 'text-orange-950/80 dark:text-orange-100/90',
  },
  {
    id: 'custom-solutions',
    icon: Code,
    title: 'Custom Solutions',
    description: 'Develop tailored digital solutions that address your unique business challenges.',
    features: ['Web Apps', 'Automation', 'Cloud Architecture'],
    gradient: 'from-emerald-500 to-green-500',
    color: '#10b981', // emerald-500
    textColor: 'text-emerald-600 dark:text-emerald-400',
    descColor: 'text-emerald-950/80 dark:text-emerald-100/90',
  },
  {
    id: 'business-growth',
    icon: Rocket,
    title: 'Business Growth',
    description: 'Comprehensive growth strategies that scale your business and maximize potential.',
    features: ['Consulting', 'Scaling Strategy', 'Market Analysis'],
    gradient: 'from-indigo-500 to-blue-600',
    color: '#6366f1', // indigo-500
    textColor: 'text-indigo-600 dark:text-indigo-400',
    descColor: 'text-indigo-950/80 dark:text-indigo-100/90',
  }
];

function ServiceCard({ service, isActive }: { service: typeof services[0]; isActive: boolean }) {
  return (
    <motion.div
      className={`group relative h-full w-full overflow-hidden transition-all duration-700 ease-out ${isActive
        ? 'scale-[1.02] shadow-2xl dark:shadow-glow'
        : 'scale-100 opacity-60 hover:opacity-100'
        }`}
      style={{
        borderRadius: '2.5rem',
        transform: 'translateZ(0)',
      }}
    >
      {/* Card Background - Light: Clean Glass, Dark: Deep Glass */}
      <div className={`absolute inset-0 transition-colors duration-500
        bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl
        border border-white/40 dark:border-white/10
        ${isActive ? 'border-t-white/60 dark:border-t-white/20' : ''}
      `} />

      {/* Dynamic Gradient Tint */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-[0.03] dark:opacity-[0.15] group-hover:opacity-[0.08] dark:group-hover:opacity-[0.25] transition-opacity duration-500`} />

      <div className="relative h-full p-8 flex flex-col justify-end z-10">
        <service.icon className={`absolute top-8 right-8 w-40 h-40 opacity-[0.03] dark:opacity-[0.05] ${service.textColor} rotate-12 group-hover:rotate-0 transition-all duration-700 ease-out pointer-events-none`} />

        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/50 dark:border-white/10 transition-colors duration-500
          bg-gradient-to-br ${service.gradient}
        `}>
          <service.icon className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
          {service.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed max-w-[90%] font-medium">
          {service.description}
        </p>

        <div className="space-y-3 mb-8">
          {service.features.slice(0, 3).map((feature: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white/80`} />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200 tracking-wide">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 font-bold tracking-wider uppercase text-sm group-hover:gap-5 transition-all duration-300 text-slate-900 dark:text-white">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState(1);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => prev - 1);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentServiceIndex = (activeIndex % services.length + services.length) % services.length;
  const currentService = services[currentServiceIndex];

  return (
    <section
      id="services"
      className="pt-16 pb-24 relative overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-1000"
    >
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] opacity-20 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen"
            style={{ backgroundColor: currentService.color }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-slate-50/80 dark:bg-black/20 backdrop-blur-[1px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 backdrop-blur-xl rounded-full border border-slate-200 dark:border-white/10 mb-8 shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className={`w-4 h-4 ${currentService.textColor} transition-colors duration-500`} />
            <span className={`text-sm font-bold ${currentService.textColor} transition-colors duration-500`}>
              Our Expertise
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
            Digital Solutions for <br />
            <span className={`transition-colors duration-500 ${currentService.textColor} opacity-90`}>
              Modern Businesses
            </span>
          </h2>

          <p className="text-xl max-w-2xl mx-auto leading-relaxed font-medium text-slate-600 dark:text-slate-400">
            We combine creativity with technical excellence to deliver digital products that drive real business growth.
          </p>
        </motion.div>

        <div
          className="relative h-[600px] w-full flex items-center justify-center touch-pan-y"
          style={{ perspective: '2000px' }}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            (e.currentTarget as HTMLDivElement & { startX?: number }).startX = touch.clientX;
          }}
          onTouchEnd={(e) => {
            const touch = e.changedTouches[0];
            const startX = (e.currentTarget as HTMLDivElement & { startX?: number }).startX || 0;
            const diff = touch.clientX - startX;
            if (Math.abs(diff) > 50) {
              if (diff > 0) setActiveIndex(prev => prev - 1);
              else setActiveIndex(prev => prev + 1);
            }
          }}
        >
          {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
            const index = activeIndex + offset;
            const serviceIndex = (index % services.length + services.length) % services.length;
            const service = services[serviceIndex];

            const ANGLE_STEP = 18;
            const RADIUS = 800; // Adjusted for better screen fit

            const angleRad = (offset * ANGLE_STEP * Math.PI) / 180;
            const x = RADIUS * Math.sin(angleRad);
            const z = RADIUS * Math.cos(angleRad) - RADIUS;
            const rotateY = -offset * ANGLE_STEP;

            const isCenter = offset === 0;

            const scale = isCenter ? 1 : 0.9;
            const opacity = isCenter ? 1 : Math.max(0.4 - Math.abs(offset) * 0.1, 0.1);
            const zIndex = 100 - Math.abs(offset);

            return (
              <motion.div
                key={`${index}-${service.id}`}
                className="absolute top-1/2 left-1/2 w-[320px] md:w-[400px] h-[520px] md:h-[580px]"
                initial={false}
                animate={{
                  x: `calc(-50% + ${x}px)`,
                  y: '-50%',
                  z: isCenter ? 100 : z,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => {
                  if (isCenter) navigate(`/service/${service.id}`);
                  else setActiveIndex(index);
                }}
              >
                <div className="h-full w-full">
                  <ServiceCard service={service} isActive={isCenter} />
                </div>
              </motion.div>
            );
          })}

          <button
            onClick={() => setActiveIndex(prev => prev - 1)}
            className="cursor-pointer absolute left-[2%] md:left-[10%] top-1/2 -translate-y-1/2 z-[100] p-3 md:p-4 rounded-full bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/20 backdrop-blur-md border border-slate-200 dark:border-white/10 transition-all hover:scale-110 active:scale-95 group shadow-lg"
          >
            <ArrowRight className="w-6 h-6 rotate-180 text-slate-800 dark:text-white" />
          </button>

          <button
            onClick={() => setActiveIndex(prev => prev + 1)}
            className="cursor-pointer absolute right-[2%] md:right-[10%] top-1/2 -translate-y-1/2 z-[100] p-3 md:p-4 rounded-full bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/20 backdrop-blur-md border border-slate-200 dark:border-white/10 transition-all hover:scale-110 active:scale-95 group shadow-lg"
          >
            <ArrowRight className="w-6 h-6 text-slate-800 dark:text-white" />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-8 relative z-[100] pointer-events-auto">
          {services.map((_, idx) => {
            const currentActive = (activeIndex % services.length + services.length) % services.length;
            const isActive = currentActive === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  const distance = idx - currentActive;
                  setActiveIndex(prev => prev + distance);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${isActive
                  ? 'bg-slate-900 dark:bg-white w-8'
                  : 'bg-slate-300 dark:bg-white/20 w-1.5 hover:bg-slate-400 dark:hover:bg-white/40'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-slate-900 dark:bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <span className="relative text-white dark:text-slate-900 group-hover:text-white dark:group-hover:text-slate-900 transition-colors">
              Start Your Project
            </span>
            <ArrowRight className="relative w-5 h-5 ml-2 text-white dark:text-slate-900 group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
