import { useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import {
  Target, Globe, Sparkles,
  ArrowRight, CheckCircle2, Linkedin, Twitter,
  ChevronDown, Heart, User, Code2, Rocket, ShieldCheck
} from 'lucide-react';
import SEO from '../components/SEO';

const SectionHeading = ({ subtitle, title, align = "center" }: { subtitle: string, title: React.ReactNode, align?: "left" | "center" }) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100 dark:border-indigo-800 ${align === "center" ? "mx-auto" : ""}`}
    >
      <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
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
    <div ref={ref} className="text-center group p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 transition-colors">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2"
      >
        {value}{suffix}
      </motion.div>
      <div className="text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide text-sm">{label}</div>
    </div>
  );
};

const TeamMember = ({ name, role, icon: Icon, delay }: { name: string, role: string, icon: any, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -10 }}
    className="group relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/30 transition-all duration-300"
  >
    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
      <Icon size={40} strokeWidth={1.5} />
    </div>

    <div className="text-center">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{name}</h3>
      <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-6">{role}</p>

      <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
        <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors">
          <Linkedin size={18} />
        </button>
        <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors">
          <Twitter size={18} />
        </button>
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
      <div className="z-20 flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/30 border-4 border-white dark:border-slate-950">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
      <div className={`w-5/12 ${isEven ? 'text-right' : 'text-left'}`}>
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all group hover:border-indigo-500/20">
          <span className="text-3xl font-black text-indigo-600/20 dark:text-indigo-400/20 block mb-2">{year}</span>
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
      <SEO
        title="About Us"
        description="Learn about Decent Digital, a team of visionary creators and developers dedicated to transforming businesses through innovative digital solutions in Vadodara."
        keywords="About Decent Digital, Web Design Team, Digital Agency Vadodara, Hatim Moriswala, Burhanuddin Moriswala"
        schema={{
          '@type': 'LocalBusiness',
          name: 'Decent Digital',
          description: 'Digital Agency in Vadodara offering web development and branding services.',
          url: window.location.href,
          telephone: '+919825754652',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'FF-12, Amber Complex, Ajwa Road',
            addressLocality: 'Vadodara',
            postalCode: '390019',
            addressCountry: 'IN'
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '09:00',
              closes: '19:00'
            }
          ]
        }}
      />
      {/* Progress Bar - Matched to Theme (Indigo/Purple) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* 1. Cinematic Hero Section - Clean, No Dots */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20">
        {/* Ambient Background - No dots */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]" />
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
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Decent Digital Agency</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
              Crafting Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient bg-300%">
                Excellence.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              We are a team of visionary creators and developers dedicated to transforming businesses through innovative digital solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
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
      <section className="py-20 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <Counter value="5" label="Years of Innovation" suffix="+" />
            <Counter value="100" label="Successful Projects" suffix="+" />
            <Counter value="50" label="Happy Clients" suffix="+" />
            <Counter value="24" label="Hour Support" suffix="/7" />
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-32 px-6 bg-slate-50 dark:bg-slate-950 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading subtitle="Our Philosophy" title="Built on Trust & Quality" />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: 'Innovation First', desc: 'We assume nothing. We explore everything. We constantly push the boundaries of what’s possible on the web.' },
              { icon: ShieldCheck, title: 'Uncompromising Quality', desc: 'Every line of code, every pixel, every interaction is crafted with obsessive attention to detail.' },
              { icon: Heart, title: 'Client-Centric', desc: 'Your success is our success. We build lasting partnerships, not just vendor relationships.' }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-lg border border-slate-200 dark:border-slate-800 group hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mb-8 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                  <card.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Meet the Team - Updated & Realistic */}
      <section className="py-32 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Leadership" title="Meet Our Team" />

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <TeamMember
              name="Hatim Moriswala"
              role="Founder"
              icon={User}
              delay={0}
            />
            <TeamMember
              name="Burhanuddin Moriswala"
              role="Web Developer"
              icon={Code2}
              delay={0.1}
            />
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
            className="relative overflow-hidden rounded-[3rem] bg-slate-900 dark:bg-indigo-950 p-12 md:p-24 text-center text-white shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Ready to Elevate <br /> Your Brand?
              </h2>
              <p className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto">
                Let's discuss how Decent Digital can help you achieve your business goals with cutting-edge web and marketing solutions.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
              >
                Start a Conversation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
