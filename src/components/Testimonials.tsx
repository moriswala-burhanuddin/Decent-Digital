import { Star, Quote, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Rajesh Kumar',
        role: 'CEO, Tech Startup',
        company: 'InnovateTech',
        image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Decent Digital transformed our online presence completely. Their team delivered a stunning website that increased our conversions by 250%. Highly professional and results-driven!',
        rating: 5,
        category: 'Web Development'
    },
    {
        name: 'Priya Sharma',
        role: 'Founder, Fashion Brand',
        company: 'StyleElite',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'The brand identity they created for us is exceptional. From logo design to complete visual guidelines, everything reflects our vision perfectly. Truly creative team!',
        rating: 5,
        category: 'Branding'
    },
    {
        name: 'Amit Patel',
        role: 'Owner, Restaurant Chain',
        company: 'Flavors of India',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Our online ordering system went live smoothly. The website is user-friendly and our online orders have tripled! Great support throughout the project.',
        rating: 5,
        category: 'Web Development'
    },
    {
        name: 'Neha Gupta',
        role: 'Marketing Manager, E-Commerce',
        company: 'ShopHub',
        image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Their digital marketing strategy increased our organic traffic by 400%. Data-driven approach and transparent reporting made all the difference.',
        rating: 5,
        category: 'Digital Marketing'
    },
    {
        name: 'Vikram Singh',
        role: 'Startup Founder',
        company: 'FitTrack App',
        image: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'The mobile app design exceeded our expectations. UI/UX is intuitive and our users love it. Highly recommended for startups!',
        rating: 5,
        category: 'UI/UX Design'
    },
    {
        name: 'Anjali Mehta',
        role: 'Social Media Manager, Startup',
        company: 'BrandBox',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        text: 'Fantastic social media campaigns! Our engagement rates shot up and followers are growing steadily. Their team is creative and responsive.',
        rating: 5,
        category: 'Social Media'
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-32 relative bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)]" />
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.05),transparent_50%)]" />
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-full border border-blue-200/50 dark:border-blue-500/30 mb-8 shadow-lg shadow-blue-500/10"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Client Success Stories
                        </span>
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Innovators</span>
                    </h2>

                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Don't just take our word for it. Here's what our partners have to say about their journey with Decent Digital.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="absolute top-8 right-8 text-blue-100 dark:text-slate-800 group-hover:text-blue-50 dark:group-hover:text-slate-800 transition-colors">
                                <Quote className="w-12 h-12" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-8">
                                    "{testimonial.text}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                                    />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/50">
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                        {testimonial.category}
                                    </span>
                                </div>
                            </div>

                            {/* Hover Gradient Border Effect */}
                            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/10 transition-colors duration-300 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
