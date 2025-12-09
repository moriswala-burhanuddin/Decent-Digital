import { useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import {
  Target, Globe, Sparkles,
  ArrowRight, CheckCircle2, Linkedin, Twitter,
  ChevronDown, Heart
} from 'lucide-react';

const FloatingElement = ({ delay, duration, x, y }: { delay: number; duration: number; x: [number, number]; y: [number, number] }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40"
    animate={{ x, y }}
    transition={{ delay, duration, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// --- Components ---

const SectionHeading = ({ subtitle, title, align = "center" }: { subtitle: string, title: React.ReactNode, align?: "left" | "center" }) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100 dark:border-blue-800 ${align === "center" ? "mx-auto" : ""}`}
    >
      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
      {subtitle}
    </motion.div>
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const Counter = ({ value, label, suffix = "" }: { value: string, label: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center group">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary mb-2 group-hover:scale-110 transition-transform duration-300"
      >
        {value}{suffix}
      </motion.div>
      <div className="text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide text-sm">{label}</div>
    </div>
  );
};

const TeamMember = ({ name, role, image, delay }: { name: string, role: string, image: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -10 }}
    className="group relative"
  >
    <div className="relative h-[400px] rounded-[2rem] overflow-hidden mb-6 shadow-xl">
      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-500 z-10" />
      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-8">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <a href="#" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-400 transition-colors"><Twitter size={18} /></a>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          <p className="text-blue-400 font-medium">{role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ year, title, desc, index }: { year: string, title: string, desc: string, index: number }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center justify-between w-full mb-12 ${isEven ? 'flex-row-reverse' : ''}`}
    >
      <div className="w-5/12" />
      <div className="z-20 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 border-4 border-white dark:border-slate-950">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
      <div className={`w-5/12 ${isEven ? 'text-right' : 'text-left'}`}>
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-3xl font-black text-blue-600/20 dark:text-blue-400/20 block mb-2">{year}</span>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function AboutUsPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden font-sans">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]"
          />

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <FloatingElement
              key={i}
              delay={i * 0.2}
              duration={10 + Math.random() * 5}
              x={[Math.random() * 100 - 50, Math.random() * 100 - 50]}
              y={[Math.random() * -200, Math.random() * 200]}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 mb-8 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Redefining Digital Excellence</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
              We Don't Just <br /> Build Brands. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient bg-300%">
                We Build Empires.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Decent Digital is where innovation meets execution. We partner with visionaries to engineer digital growth that defies expectations.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>


            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <Counter value="5" label="Years Experience" suffix="+" />
            <Counter value="100" label="Projects Delivered" suffix="+" />
            <Counter value="50" label="Global Clients" suffix="+" />
            <Counter value="15" label="Awards Won" suffix="" />
          </div>
        </div>
      </section>

      {/* 3. Our Story - Interactive Timeline */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            subtitle="Our Journey"
            title={<>From Humble Beginnings to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Global Impact</span></>}
          />

          <div className="relative mt-20">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-0">
              {[
                { year: '2019', title: 'The Inception', desc: 'Founded in a small garage with a laptop and a vision to redefine digital standards.' },
                { year: '2021', title: 'Rapid Expansion', desc: 'Grew to a team of 20+, serving clients across 5 countries and launching our first major SaaS product.' },
                { year: '2023', title: 'Industry Recognition', desc: 'Awarded "Top Digital Agency" for innovation and growth. Partnered with Fortune 500 companies.' },
                { year: '2024', title: 'Global Powerhouse', desc: 'Empowering 100+ brands with cutting-edge digital ecosystems and AI-driven strategies.' }
              ].map((item, idx) => (
                <TimelineItem key={idx} index={idx} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-32 px-6 bg-slate-100 dark:bg-slate-900/50 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading subtitle="Our DNA" title="Driven by Purpose, Fueled by Passion" />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Mission', desc: 'To drive digital growth through creative technology and strategic innovation.' },
              { icon: Globe, title: 'Vision', desc: 'To become the most trusted global partner for ambitious brands seeking transformation.' },
              { icon: Heart, title: 'Values', desc: 'Innovation, Transparency, Performance, and Unwavering Client Success.' }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-700 group hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <card.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Meet the Team */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="The Squad" title="Meet the Minds Behind the Magic" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="James Anderson"
              role="Founder & CEO"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
              delay={0}
            />
            <TeamMember
              name="Sarah Chen"
              role="Creative Director"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              delay={0.1}
            />
            <TeamMember
              name="Michael Ross"
              role="Tech Lead"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
              delay={0.2}
            />
            <TeamMember
              name="Emily Davis"
              role="Growth Strategist"
              image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold uppercase tracking-wider mb-6 border border-blue-500/30">
                Why Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                We Deliver Results, <br /> Not Just Promises.
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Our holistic approach combines data, design, and technology to create ecosystems that thrive. We don't just deliver projects; we deliver outcomes.
              </p>
              <ul className="space-y-6">
                {[
                  'Data-Driven Strategies that eliminate guesswork',
                  'Conversion-Focused Design that turns visitors into customers',
                  'Brand-First Approach that tells your unique story',
                  'Performance Optimization for lightning-fast experiences'
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 text-lg font-medium text-slate-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-slate-800 rounded-[2rem] p-8 border border-slate-700 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Strategy', val: '100%' },
                    { label: 'Creativity', val: '100%' },
                    { label: 'Technology', val: '100%' },
                    { label: 'Passion', val: '100%' }
                  ].map((box, idx) => (
                    <div key={idx} className="aspect-square bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center border border-slate-700">
                      <span className="text-4xl font-bold text-blue-400 mb-2">{box.val}</span>
                      <span className="text-slate-400 font-medium">{box.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-20 px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-primary to-secondary p-12 md:p-24 text-center text-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Your Brand Deserves <br /> More Than Just a Website.
              </h2>
              <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
                Ready to build a digital presence that commands attention and drives real growth? Let's make it happen.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
              >
                Let's Build Your Digital Presence
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
