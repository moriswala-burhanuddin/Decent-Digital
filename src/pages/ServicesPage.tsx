import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Zap,
  Globe,
  Cpu,
  BarChart3,
  Users,
  Sparkles
} from 'lucide-react';
import SEO from '../components/SEO';

const services = [
  {
    id: 'brand-identity',
    icon: Layers,
    title: 'Brand Identity',
    subtitle: 'Forge Your Legacy',
    description: 'We craft visual identities that transcend trends. From logo systems to comprehensive brand guidelines.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop',
    tags: ['Strategy', 'Visual Design']
  },
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    subtitle: 'Engineering Excellence',
    description: 'Building the web of tomorrow. High-performance, scalable applications using cutting-edge technologies.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2400&auto=format&fit=crop',
    tags: ['React', 'Next.js', 'WebGL']
  },
  {
    id: 'digital-marketing',
    icon: BarChart3,
    title: 'Digital Marketing',
    subtitle: 'Data-Driven Growth',
    description: 'Amplify your reach with precision. Data-first approach ensuring your message reaches the right audience.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2400&auto=format&fit=crop',
    tags: ['SEO', 'Analytics', 'Growth']
  },
  {
    id: 'social-media',
    icon: Users,
    title: 'Social Media',
    subtitle: 'Community Architecture',
    description: 'Cultivate meaningful connections. We build and nurture communities that advocate for your brand.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2400&auto=format&fit=crop',
    tags: ['Content', 'Community', 'Viral']
  },
  {
    id: 'custom-solutions',
    icon: Cpu,
    title: 'Custom Solutions',
    subtitle: 'Tailored Innovation',
    description: 'Solving the impossible. We develop bespoke software solutions tailored to your unique challenges.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2400&auto=format&fit=crop',
    tags: ['SaaS', 'Automation', 'Cloud']
  },
  {
    id: 'business-growth',
    icon: Zap,
    title: 'Business Growth',
    subtitle: 'Scale Velocity',
    description: 'Accelerate your trajectory. Strategic consulting and optimization frameworks unlocked.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop',
    tags: ['Strategy', 'Scaling', 'Advisory']
  }
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="min-h-screen bg-background selection:bg-primary/30">
      <SEO
        title="Our Services"
        description="Explore our comprehensive digital services including brand identity, web development, digital marketing, and custom software solutions."
        keywords="Web Development Services, Branding Agency, Digital Marketing, Custom Software, Business Growth"
      />

      {/* Hero Section - Performance Optimized */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background/90 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" />
              <span>World Class Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
              Expertise Redefined
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              We architect digital experiences that define the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Using CSS Grid for performance */}
      <section className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden border-t border-border/50">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to transform your business?</h2>
          <button
            onClick={() => navigate('/contact')}
            className="group relative px-8 py-4 bg-foreground text-background rounded-full text-lg font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service, index, navigate }: { service: any, index: number, navigate: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => navigate(`/service/${service.id}`)}
      className="group relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-3xl cursor-pointer bg-muted"
    >
      {/* Background Image with Parallax-like Zoom */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Top Icon */}
        <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:rotate-12">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>

        <div className="transform transition-transform duration-500 group-hover:translate-y-[-10px]">
          <div className="flex items-center gap-3 mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <service.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">{service.subtitle}</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            {service.title}
          </h3>

          <p className="text-white/70 max-w-md line-clamp-2 mb-6 group-hover:text-white/90 transition-colors">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium text-white/80 border border-white/20 rounded-full bg-black/20 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
