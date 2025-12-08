import { ArrowLeft, ExternalLink, Calendar, Users, CheckCircle2, Target, Lightbulb, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const projectsData: Record<string, any> = {
  ecommerce: {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A modern e-commerce platform...',
    fullDescription: 'Built a comprehensive e-commerce platform that increased client sales by 250%.',
    client: 'Fashion Retailer',
    year: '2024',
    team: '4 developers, 1 designer',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    challenges: ['High traffic handling', 'Payment gateways'],
    solutions: ['Caching system', 'Secure payments'],
    results: ['250% sales boost', 'Cart drop 40%'],
    live_url: '#'
  },
  restaurant: {
    title: 'Restaurant Website',
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Restaurant platform...',
    fullDescription: 'Complete restaurant solution with ordering.',
    client: 'Fine Dining',
    year: '2024',
    team: '3 developers',
    tags: ['Vue', 'Stripe'],
    challenges: ['Menu logic'],
    solutions: ['UX flow'],
    results: ['180% orders'],
    live_url: '#'
  }
};

export default function ProjectsDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    console.log("Slug from URL:", slug);

    // ✅ Local fallback first
    if (projectsData[slug]) {
      setData(projectsData[slug]);
      return;
    }

    // ✅ Fetch from Django
    fetch(`http://127.0.0.1:8000/api/projects/${slug}/`)
      .then(res => {
        if (!res.ok) throw new Error("Not in Django");
        return res.json();
      })
      .then(django => {
        setData({
          title: django.title,
          category: django.category,
          description: django.description,
          fullDescription: django.full_description,
          client: django.client || 'Private Client',
          year: django.year || '2024',
          team: django.team || 'Internal Team',
          tags: django.tags || [],
          challenges: django.challenges || [],
          solutions: django.solutions || [],
          results: django.results || [],
          image: django.image?.startsWith("http")
            ? django.image
            : `http://127.0.0.1:8000${django.image}`,
          live_url: django.live_url || '#'
        });
      })
      .catch(err => {
        console.error("Django fetch failed:", err.message);
        // setData(projectsData['ecommerce']); // REMOVED: Don't show wrong data on error
        setData(null); // Keep as null to show loading or error
      });

  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 font-medium">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/projects')}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="px-4 py-1.5 rounded-full bg-blue-500 text-white text-sm font-bold uppercase tracking-wider">
                {data.category}
              </span>
              <span className="text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {data.year}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8 max-w-4xl"
            >
              {data.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              {data.live_url && data.live_url !== '#' && (
                <a
                  href={data.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" /> Visit Live Site
                </a>
              )}
              <button
                onClick={() => document.getElementById('case-study')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 backdrop-blur-sm transition-colors flex items-center gap-2"
              >
                Read Case Study <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <main id="case-study" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* CONTENT */}
          <div className="lg:col-span-8 space-y-20">

            <section>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Project Overview</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {data.fullDescription}
              </p>
            </section>

            <div className="grid gap-12">
              <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Challenge</h2>
                </div>
                <ul className="space-y-4">
                  {data.challenges.map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Solution</h2>
                </div>
                <ul className="space-y-4">
                  {data.solutions.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Key Results</h2>
                </div>
                <ul className="space-y-4">
                  {data.results.map((r: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-8">

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg sticky top-32">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Project Info</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Client</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" /> {data.client}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Year</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" /> {data.year}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Team</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" /> {data.team}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((t: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </aside>

        </div>
      </main>

    </div>
  );
}
