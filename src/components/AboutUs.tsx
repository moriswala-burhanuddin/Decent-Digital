import { Users, Target, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutUs() {

  const values = [
    {
      icon: Target,
      title: 'Strategic Thinking',
      description: 'Aligning solutions with business objectives.',
      color: 'bg-blue-500',
      span: 'md:col-span-2'
    },
    {
      icon: Zap,
      title: 'Agile Execution',
      description: 'Fast, iterative delivery.',
      color: 'bg-orange-500',
      span: 'md:col-span-1'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous testing for excellence.',
      color: 'bg-emerald-500',
      span: 'md:col-span-1'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Extension of your team.',
      color: 'bg-amber-500',
      span: 'md:col-span-2'
    }
  ];

  return (
    <section id="about" className="relative py-32 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:84px_84px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                About Decent Digital
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Digital Futures</span>
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              A full-service agency transforming ideas into impactful digital realities through innovation and strategy.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {/* Main Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Story</h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              <p>
                Founded in 2019, we started with a simple mission: to bridge the gap between complex technology and human-centric design.
              </p>
              <p>
                Today, we are a diverse team of creators, engineers, and strategists working with clients across 12 countries. We don't just build products; we craft digital ecosystems that drive growth.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-500">Join our growing team</span>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900 dark:bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between"
          >
            <div>
              <Sparkles className="w-8 h-8 mb-6 text-yellow-400" />
              <h3 className="text-5xl font-bold mb-2">98%</h3>
              <p className="text-white/80">Client Satisfaction Rate</p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">View Case Studies</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Founder Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
              <Users className="w-16 h-16 text-slate-400" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Hatim Moriswala</h4>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-4">Founder & CEO</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              "We believe in the power of digital transformation to elevate businesses."
            </p>
          </motion.div>

          {/* Values Grid */}
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className={`${val.span} group bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors`}
            >
              <div className={`w-12 h-12 rounded-xl ${val.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <val.icon className={`w-6 h-6 ${val.color.replace('bg-', 'text-')}`} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{val.title}</h4>
              <p className="text-slate-600 dark:text-slate-400">{val.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[3rem] bg-gradient-to-r from-primary to-secondary p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform your digital presence?</h2>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              Let's Talk Business
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
