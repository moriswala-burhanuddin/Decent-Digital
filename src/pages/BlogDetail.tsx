import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "../pages/Blog"; // Import directly from Blog.tsx since data is there
import { Clock, User, ArrowLeft, Calendar, Share2, Bookmark } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === Number(id));

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <button onClick={() => navigate('/blog')} className="text-blue-500 hover:underline">Back to Blog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6">
          <div className="max-w-4xl mx-auto w-full">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                {post.category}
              </span>
              <span className="text-slate-300 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
              <span className="text-slate-300 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                <User className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{post.author}</p>
                <p className="text-slate-400 text-sm">Senior Editor</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-10 leading-relaxed">
            {post.excerpt}
          </p>

          <p>
            In today's rapidly evolving digital landscape, staying ahead of the curve is not just an advantage—it's a necessity. Whether you're a business owner, a designer, or a developer, understanding the nuances of {post.category.toLowerCase()} can significantly impact your success.
          </p>

          <h3>The Evolution of {post.category}</h3>
          <p>
            Over the past few years, we've seen a paradigm shift in how users interact with digital products. The focus has moved from purely functional designs to emotionally engaging experiences. This transition is driven by a deeper understanding of user psychology and the increasing capabilities of modern web technologies.
          </p>

          <div className="my-10 p-8 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl">
            <p className="text-lg font-medium text-blue-900 dark:text-blue-100 italic m-0">
              "Good design is not just about how it looks, but how it works and how it makes the user feel."
            </p>
          </div>

          <h3>Key Strategies for Success</h3>
          <p>
            To truly excel in this area, consider implementing the following strategies:
          </p>
          <ul>
            <li><strong>User-Centric Approach:</strong> Always prioritize the needs and preferences of your target audience.</li>
            <li><strong>Consistency is Key:</strong> Maintain a cohesive visual language across all touchpoints.</li>
            <li><strong>Performance Matters:</strong> Ensure your digital assets are optimized for speed and accessibility.</li>
            <li><strong>Continuous Iteration:</strong> Use data and feedback to refine and improve your strategies over time.</li>
          </ul>

          <img
            src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Team working on digital project"
            className="w-full rounded-2xl shadow-xl my-10"
          />

          <h3>Looking Ahead</h3>
          <p>
            As we look towards the future, the integration of AI and machine learning will undoubtedly play a pivotal role in shaping the next generation of {post.category.toLowerCase()} tools and methodologies. Embracing these technologies early on can provide a significant competitive edge.
          </p>
          <p>
            Remember, the goal is not just to keep up with trends, but to set them. By fostering a culture of innovation and creativity, you can create digital experiences that truly resonate with your audience and stand the test of time.
          </p>
        </div>

        {/* Share & Tags */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Tags:</span>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-lg">#{post.category.replace(/\s+/g, '')}</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-lg">#DigitalTrends</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-lg">#Innovation</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-20 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map(relatedPost => (
              <div
                key={relatedPost.id}
                onClick={() => navigate(`/blog/${relatedPost.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs text-blue-500 font-semibold mb-2">{relatedPost.category}</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2">
                  {relatedPost.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
