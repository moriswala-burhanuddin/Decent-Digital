import { ArrowRight, Sparkles, Palette, Code2, Layers, Megaphone, Briefcase, Globe, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FigmaFrame } from "./FigmaFrame";
import { VSCodeFrame } from "./VSCodeFrame";
import { BrandingFrame } from "./BrandingFrame";
import { LogoFrame } from "./LogoFrame";
import { MarketingFrame } from "./MarketingFrame";
import { BusinessFrame } from "./BusinessFrame";

const services = [
  { icon: Palette, title: "Brand Identity", gradient: "from-blue-500 to-cyan-400" },
  { icon: Layers, title: "UI/UX Design", gradient: "from-cyan-400 to-purple-500" },
  { icon: Code2, title: "Web Development", gradient: "from-purple-500 to-pink-500" },
  { icon: Megaphone, title: "Digital Marketing", gradient: "from-pink-500 to-orange-500" },
  { icon: Briefcase, title: "Business Strategy", gradient: "from-orange-500 to-blue-500" },
  { icon: Globe, title: "SEO Optimization", gradient: "from-blue-500 to-green-400" },
  { icon: Zap, title: "Performance", gradient: "from-green-400 to-cyan-400" },
];

export function HomeSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);



  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background selection:bg-primary/20"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Geometric Shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-[10%] w-20 h-20 border-2 border-primary/20 rounded-2xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 right-[10%] w-32 h-32 border border-secondary/20 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[20%] w-4 h-4 bg-accent-purple/40 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-[15%] w-6 h-6 bg-primary/30 rotate-45 blur-sm"
        />

        <motion.div
          style={{ y }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[80px] mix-blend-screen animate-blob will-change-transform"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
          className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[80px] mix-blend-screen animate-blob animation-delay-2000 will-change-transform"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]) }}
          className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[80px] mix-blend-screen animate-blob animation-delay-4000 will-change-transform"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">

        {/* Hero Content */}
        <div className="text-center max-w-6xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default shadow-lg shadow-primary/5"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Redefining Digital Excellence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold leading-[0.9] mb-8 tracking-tight"
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/40">
              We Craft
            </span>
            <br />
            <span className="relative inline-block">
              <span className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accent-purple opacity-20 blur-2xl rounded-full" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent-purple animate-gradient bg-[length:200%_auto]">
                Digital Reality
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            Elevate your brand with precision-engineered digital solutions.
            From <span className="text-foreground font-medium">vision</span> to <span className="text-foreground font-medium">victory</span>,
            we build the future of your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="group relative px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 overflow-hidden bg-foreground text-background">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <a href="#services" className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 font-bold text-lg hover:bg-white/10 hover:border-primary/30 transition-all hover:scale-105 text-foreground">
              Explore Services
            </a>
          </motion.div>
        </div>

        {/* Services Slider (Marquee) */}
        <div className="mb-32 relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0  bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex gap-6 px-6 will-change-transform"
              animate={{ x: "-50%" }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            >
              {[...services, ...services, ...services].map((srv, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 hover:border-primary/40 transition-all group min-w-[240px]"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${srv.gradient} shadow-lg dark:shadow-none`}>
                    <srv.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg text-foreground/80 group-hover:text-foreground transition-colors">
                    {srv.title}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* FigmaFrame */}
        <div className="mb-24 animate-slide-up">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3">Design Process</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">How We Build Your Digital Presence</h2>
          </div>
          <FigmaFrame />
        </div>

        {/* VSCodeFrame */}
        <div className="mb-24 animate-slide-up">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-secondary bg-secondary/10 rounded-full mb-3">Development</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold">Clean, Maintainable Code</h2>
          </div>
          <VSCodeFrame />
        </div>

        {/* Detailed Services Grid */}
        <div id="services" className="mb-32">
          <div className="text-center mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Expertise</span>
            <h2 className="text-4xl sm:text-6xl font-heading font-bold mb-6">Comprehensive Digital Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We provide end-to-end solutions to help your business thrive in the digital age.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div whileHover={{ y: -5 }} className="group">
              <BrandingFrame />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="group">
              <LogoFrame />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="group">
              <MarketingFrame />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="group">
              <BusinessFrame />
            </motion.div>
          </div>
        </div>



      </div>
    </section>
  );
}
