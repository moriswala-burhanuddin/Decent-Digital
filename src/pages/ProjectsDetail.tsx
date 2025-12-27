import { ArrowLeft, ExternalLink, Calendar, Users, CheckCircle2, Target, Lightbulb, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { projectsApi } from '../services/api';

const projectsData: Record<string, any> = {
  ecommerce: {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A modern e-commerce platform with seamless checkout experience and inventory management.',
    fullDescription: 'Built a comprehensive e-commerce platform that increased client sales by 250% through optimized UX and fast checkout flows.',
    client: 'Fashion Retailer',
    year: '2024',
    team: '4 developers, 1 designer',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    challenges: ['High traffic handling', 'Payment gateways'],
    solutions: ['Caching system', 'Secure payments'],
    results: ['250% sales boost', 'Cart drop 40%'],
    live_url: '#'
  },
  branding: {
    title: 'Brand Identity Design',
    category: 'Branding',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Complete brand identity including logo, color palette, and brand guidelines.',
    fullDescription: 'Created a unique and memorable brand identity for a tech startup, setting them apart in a crowded market.',
    client: 'Tech Startup',
    year: '2023',
    team: '2 Designers',
    tags: ['Illustrator', 'Photoshop', 'Branding'],
    challenges: ['Market differentiation', 'Consistent application'],
    solutions: ['Distinctive color palette', 'Comprehensive guidelines'],
    results: ['Brand recognition up 60%', 'Successful launch'],
    live_url: '#'
  },
  social: {
    title: 'Social Media Campaign',
    category: 'Digital Marketing',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Comprehensive social media campaign that increased engagement by 250% in 3 months.',
    fullDescription: 'Designed and executed a multi-channel social media strategy that significantly boosted brand awareness and engagement.',
    client: 'Lifestyle Brand',
    year: '2024',
    team: '1 Strategist, 1 Content Creator',
    tags: ['Instagram', 'Facebook', 'Strategy'],
    challenges: ['Low engagement', 'Inconsistent posting'],
    solutions: ['Content calendar', 'Interactive posts'],
    results: ['250% engagement increase', '10k new followers'],
    live_url: '#'
  },
  restaurant: {
    title: 'Restaurant Website',
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Beautiful restaurant website with online ordering and reservation system.',
    fullDescription: 'Complete restaurant solution with ordering and table reservation capabilities.',
    client: 'Fine Dining',
    year: '2024',
    team: '3 developers',
    tags: ['Vue', 'Stripe'],
    challenges: ['Menu logic', 'Real-time reservations'],
    solutions: ['Custom CMS', 'Booking integration'],
    results: ['180% orders', 'Full bookings'],
    live_url: '#'
  },
  mobile: {
    title: 'Mobile App Design',
    category: 'UI/UX Design',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Intuitive mobile app design for a fitness tracking application with modern interface.',
    fullDescription: 'User-centric mobile app design focusing on ease of use and motivational elements for fitness enthusiasts.',
    client: 'HealthTech Company',
    year: '2023',
    team: '2 UI/UX Designers',
    tags: ['Figma', 'Mobile', 'UI/UX'],
    challenges: ['Complex data visualization', 'User retention'],
    solutions: ['Simplified graphs', 'Gamification'],
    results: ['4.8 App Store rating', 'High retention'],
    live_url: '#'
  },
  seo: {
    title: 'SEO Optimization',
    category: 'Digital Marketing',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Complete SEO overhaul resulting in 400% increase in organic traffic.',
    fullDescription: 'Implemented a technical and content-focused SEO strategy that drove massive organic growth.',
    client: 'E-commerce Store',
    year: '2024',
    team: '1 SEO Specialist',
    tags: ['SEO', 'Analytics', 'Growth'],
    challenges: ['Low organic ranking', 'Technical errors'],
    solutions: ['Site audit', 'Content optimization'],
    results: ['400% traffic increase', 'Top 3 rankings'],
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

    // ✅ Fetch from Django via Service
    projectsApi.getProjectById(slug)
      .then(django => {
        setData({
          title: django.title,
          category: django.category,
          description: django.description,
          fullDescription: (django as any).full_description,
          client: (django as any).client || 'Private Client',
          year: (django as any).year || '2024',
          team: (django as any).team || 'Internal Team',
          tags: django.tags || [],
          challenges: (django as any).challenges || [],
          solutions: (django as any).solutions || [],
          results: (django as any).results || [],
          image: django.image,
          live_url: (django as any).live_url || '#'
        });
      })
      .catch(err => {
        console.error("Django fetch failed:", err);
        setData(null);
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
      <SEO
        title={data.title}
        description={data.description}
        keywords={`${data.title}, ${data.tags?.join(', ')}, Case Study, Decent Digital Projects`}
        image={data.image}
        type="article"
        schema={{
          '@type': 'CreativeWork',
          name: data.title,
          author: {
            '@type': 'Organization',
            name: 'Decent Digital'
          },
          dateCreated: data.year,
          description: data.description,
          image: data.image
        }}
      />

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
