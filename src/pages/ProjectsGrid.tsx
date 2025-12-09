import { Star, Sparkles, ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsApi } from '../services/api';

const STATIC_PROJECTS = [
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern e-commerce platform with seamless checkout experience and inventory management.',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Node.js', 'Stripe'],
    rating: 5.0
  },
  {
    id: 'branding',
    slug: 'branding',
    title: 'Brand Identity Design',
    category: 'Branding',
    description: 'Complete brand identity including logo, color palette, and brand guidelines for a tech startup.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Illustrator', 'Photoshop', 'Branding'],
    rating: 5.0
  },
  {
    id: 'social',
    slug: 'social',
    title: 'Social Media Campaign',
    category: 'Digital Marketing',
    description: 'Comprehensive social media campaign that increased engagement by 250% in 3 months.',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Instagram', 'Facebook', 'Strategy'],
    rating: 5.0
  },
  {
    id: 'restaurant',
    slug: 'restaurant',
    title: 'Restaurant Website',
    category: 'Web Development',
    description: 'Beautiful restaurant website with online ordering and reservation system.',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Vue.js', 'Design', 'UX'],
    rating: 5.0
  },
  {
    id: 'mobile',
    slug: 'mobile',
    title: 'Mobile App Design',
    category: 'UI/UX Design',
    description: 'Intuitive mobile app design for a fitness tracking application with modern interface.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Figma', 'Mobile', 'UI/UX'],
    rating: 5.0
  },
  {
    id: 'seo',
    slug: 'seo',
    title: 'SEO Optimization',
    category: 'Digital Marketing',
    description: 'Complete SEO overhaul resulting in 400% increase in organic traffic.',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['SEO', 'Analytics', 'Growth'],
    rating: 5.0
  }
];

const categories = ['All', 'Web Development', 'Branding', 'Digital Marketing', 'UI/UX Design'];

export default function ProjectsGrid() {
  const [projects, setProjects] = useState(STATIC_PROJECTS);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    projectsApi.getAllProjects()
      .then(data => {
        const list = Array.isArray(data) ? data : (data as any).results;

        if (!list) {
          console.error("Invalid API response:", data);
          return;
        }

        const djangoProjects = list.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          category: item.category,
          description: item.description,
          image: item.image,
          tags: item.tags || [],
          rating: 5
        }));

        setProjects([...STATIC_PROJECTS, ...djangoProjects]);
      })
      .catch(err => console.error("API error:", err));
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.08),transparent_50%)]" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-[60px] will-change-transform" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-[80px] will-change-transform" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-full border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-300/50 dark:hover:border-blue-500/50 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </motion.div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-full border border-blue-200/50 dark:border-blue-500/30 mb-6 shadow-lg shadow-blue-500/10"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              All Projects
            </span>
          </motion.div>

          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">
            Our Complete{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            Browse through our entire collection of successful projects showcasing our expertise across various industries.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${activeCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105'
                : 'bg-white/80 dark:bg-slate-800/60 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg hover:scale-105 hover:border-blue-300/50 dark:hover:border-blue-500/50'
                }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Count */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-slate-600 dark:text-slate-400">
            Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredProjects.length}</span> projects
          </span>
        </motion.div>

        <div className="space-y-32">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
            >
              {/* Project Image */}
              <motion.div
                className="w-full lg:w-[65%] relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/projects/${project.slug}`} className="block group">
                  <div className="relative h-[300px] sm:h-[400px] lg:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-500 z-10" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/20 backdrop-blur-[0.4px]">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                        <ArrowRight className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Project Details */}
              <div className={`w-full lg:w-[45%] relative z-20 mt-[-60px] lg:mt-0 ${index % 2 === 0 ? 'lg:-ml-24' : 'lg:-mr-24'}`}>
                <motion.div
                  className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-slate-200/50 dark:border-slate-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] will-change-transform"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{project.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex-1 group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    {(project as any).github && (
                      <a
                        href={(project as any).github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        title="View Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .perspective-container {
          perspective: 2000px;
        }
      `}</style>
    </section>
  );
}
