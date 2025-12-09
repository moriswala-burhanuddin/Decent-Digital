import { ArrowRight, Play, Target, Star, Award, Zap, TrendingUp, Sparkles, ChevronDown, Shield, Clock, Headphones, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const FloatingElement = ({ delay, duration, x, y }: { delay: number; duration: number; x: [number, number]; y: [number, number] }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary/40 to-secondary/40"
    animate={{ x, y }}
    transition={{ delay, duration, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { value: '500+', label: 'Projects Delivered', icon: Target, color: 'text-primary-light', bg: 'bg-primary/10' },
    { value: '100%', label: 'Client Satisfaction', icon: Star, color: 'text-secondary', bg: 'bg-secondary/10' },
    { value: '5+', label: 'Years Experience', icon: Award, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
  ];

  const features = [
    { icon: Zap, label: 'Performance', desc: 'Blazing fast load times' },
    { icon: TrendingUp, label: 'Growth', desc: 'Data-driven results' },
    { icon: Sparkles, label: 'Design', desc: 'Award-winning aesthetics' },
  ];

  const featureContent = [
    [
      { text: 'Sub-second page load optimization', icon: CheckCircle2 },
      { text: 'Advanced caching & CDN integration', icon: CheckCircle2 },
      { text: 'Core Web Vitals excellence', icon: CheckCircle2 },
    ],
    [
      { text: 'ROI-focused marketing strategies', icon: CheckCircle2 },
      { text: 'Real-time analytics & reporting', icon: CheckCircle2 },
      { text: 'Conversion rate optimization', icon: CheckCircle2 },
    ],
    [
      { text: 'Stunning visual experiences', icon: CheckCircle2 },
      { text: 'Intuitive user interfaces', icon: CheckCircle2 },
      { text: 'Brand-aligned design systems', icon: CheckCircle2 },
    ],
  ];

  const trustBadges = [
    { icon: Shield, text: 'Secure & Reliable' },
    { icon: Clock, text: 'On-time Delivery' },
    { icon: Headphones, text: '24/7 Support' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden bg-gray-50 dark:bg-dark transition-colors duration-300">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-dark dark:via-dark-lighter dark:to-primary/5 transition-colors duration-300" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.05]" style={{
        backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      {/* Advanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Particle Grid */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(15)].map((_, i) => (
            <FloatingElement
              key={i}
              delay={i * 0.15}
              duration={8 + Math.random() * 4}
              x={[Math.random() * 100 - 50, Math.random() * 100 - 50]}
              y={[Math.random() * -200, Math.random() * 200]}
            />
          ))}
        </div>

        {/* Animated Orbs with Enhanced Effects */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 md:w-[500px] h-80 md:h-[500px] bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.55, 0.35],
            x: [0, 30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 md:w-[500px] h-80 md:h-[500px] bg-gradient-to-tl from-secondary/20 to-primary/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.35, 0.55, 0.35],
            x: [0, -40, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Animated Badge */}
            <motion.div variants={itemVariants} className="inline-flex justify-center lg:justify-start w-full">
              <motion.div
                className="group relative flex items-center gap-2.5 bg-white/50 dark:bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.15)' }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                </span>
                <span className="relative text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-white transition-colors">
                  Trusted by 500+ businesses worldwide
                </span>
              </motion.div>
            </motion.div>

            {/* Enhanced Headline */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="space-y-4">
                <h1 className="font-heading text-5xl sm:text-6xl md:text-6xl lg:text-[4.5rem] font-bold myfont leading-[1.05] tracking-tight">
                  <span className="block text-gray-900 dark:text-white mb-2 transition-colors duration-300">We Build</span>
                  <motion.span
                    className="relative inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="relative z-10 text-gradient">
                      Digital Excellence
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-3.5 bg-gradient-to-r from-primary/20 to-secondary/20 -z-10 rounded-full blur-sm"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </motion.span>
                  <span className="block text-gray-900 dark:text-white mt-2 transition-colors duration-300">That Performs</span>
                </h1>

                {/* Animated Underline */}
                <motion.div
                  className="flex gap-1 justify-center lg:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                      animate={{ scaleX: [0, 1, 0] }}
                      transition={{
                        delay: 1.2 + i * 0.15,
                        duration: 0.6,
                        repeat: Infinity,
                        repeatDelay: 1.8
                      }}
                      style={{ width: `${20 + i * 8}px` }}
                    />
                  ))}
                </motion.div>
              </div>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Transform your vision into powerful digital experiences. We craft
                <span className="text-gray-900 dark:text-white font-semibold transition-colors duration-300"> stunning websites</span>,
                <span className="text-gray-900 dark:text-white font-semibold transition-colors duration-300"> memorable brands</span>, and
                <span className="text-gray-900 dark:text-white font-semibold transition-colors duration-300"> growth strategies</span> that deliver results.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg shadow-primary/30 overflow-hidden"
                whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Start Your Project
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-white/50 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl font-semibold border border-gray-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-white/20 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Play className="w-3.5 h-3.5 text-gray-900 dark:text-white group-hover:text-primary transition-colors" />
                  </span>
                  View Our Work
                </span>
              </motion.button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div className="grid grid-cols-3 gap-4 sm:gap-5 pt-6" variants={itemVariants}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white/50 dark:bg-white/5 rounded-2xl p-4 sm:p-5 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ y: -6, scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 rounded-2xl transition-all duration-300" />
                  <div className="relative flex flex-col items-center gap-2 sm:gap-3">
                    <motion.div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bg} rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300`}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ delay: 1 + index * 0.2, duration: 3, repeat: Infinity }}
                    >
                      <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                    </motion.div>
                    <div className="text-center">
                      <motion.span
                        className="block text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        {stat.value}
                      </motion.span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium line-clamp-2 transition-colors duration-300">{stat.label}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Premium Card */}
          <motion.div className="relative order-1 lg:order-2" variants={itemVariants}>
            {/* Card Glow with Animation */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent-purple/30 rounded-[2.5rem] blur-3xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Main Card */}
            <motion.div
              className="relative bg-white/80 dark:bg-dark-card backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-colors duration-300"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Card Header Gradient - Animated */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent-purple"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="p-6 sm:p-7 md:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                        Premium Solutions
                      </h3>
                      <motion.span
                        className="px-2.5 py-0.5 bg-gradient-to-r from-primary to-secondary text-white rounded text-[10px] font-bold uppercase tracking-widest"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}
                      >
                        Popular
                      </motion.span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300">Complete digital transformation package</p>
                  </div>
                </div>

                {/* Feature Tabs */}
                <div className="space-y-5">
                  <div className="flex gap-2 p-1.5 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 transition-colors duration-300">
                    {features.map((feature, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTab === idx
                          ? 'bg-primary text-white shadow-lg shadow-primary/25'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <feature.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{feature.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 border border-gray-200 dark:border-white/5 transition-colors duration-300"
                  >
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">{features[activeTab].desc}</p>
                    <div className="space-y-3">
                      {featureContent[activeTab].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.3 }}
                          className="flex items-center gap-3 group"
                        >
                          <div className="p-0.5 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300">
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Pricing */}
                <div className="pt-6 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Starting from</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <motion.span
                          className="font-heading text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          ₹50K
                        </motion.span>
                        <span className="text-gray-500 font-medium text-sm">/month</span>
                      </div>
                    </div>
                    <motion.span
                      className="text-xs text-primary-light font-bold bg-primary/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-primary/20"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
                    >
                      Flexible
                    </motion.span>
                  </div>

                  <motion.button
                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-dark font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 shadow-lg group rounded-xl"
                    whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Schedule Consultation
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}>
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-5 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
                  {trustBadges.map((badge, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-1.5 text-xs text-gray-500 font-medium group"
                      whileHover={{ scale: 1.1 }}
                    >
                      <badge.icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{badge.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs text-gray-500 font-semibold tracking-widest uppercase">Scroll to Explore</span>
        <motion.div
          className="w-6 h-11 border-2 border-gray-300 dark:border-white/20 rounded-full flex justify-center pt-2 transition-colors duration-300"
          animate={{ borderColor: ['rgba(156, 163, 175, 0.5)', 'rgba(99,102,241,1)', 'rgba(156, 163, 175, 0.5)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
