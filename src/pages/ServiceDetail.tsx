import { Check, Star, Users, Award, ArrowRight, Shield } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const servicesData: Record<string, any> = {
  'brand-identity': {
    title: 'Brand Identity Design',
    subtitle: 'Create Your Unique Brand Presence',
    icon: '🎨',
    description: 'We craft distinctive brand identities that resonate with your target audience and set you apart from competitors.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      { title: 'Logo Design', description: 'Custom, memorable logos that represent your brand essence' },
      { title: 'Brand Guidelines', description: 'Comprehensive guidelines for consistent brand application' },
      { title: 'Color Palette', description: 'Strategic color systems that evoke the right emotions' },
      { title: 'Typography', description: 'Carefully selected typefaces that reflect your brand' },
      { title: 'Visual Elements', description: 'Icons, patterns, and imagery that strengthen your identity' },
      { title: 'Brand Strategy', description: 'Positioning and messaging framework for your brand' }
    ],
    benefits: [
      'Stand out in competitive markets',
      'Build customer loyalty and recognition',
      'Communicate your values effectively',
      'Professional and cohesive image',
      'Increased brand recall',
      'Market leadership positioning'
    ],
    portfolio: ['Tech Startup Logo', 'E-commerce Branding', 'SaaS Visual Identity', 'Retail Brand System'],
    price: 'Custom Quote',
    timeline: '4-6 weeks'
  },
  'web-development': {
    title: 'Modern Web Development',
    subtitle: 'Fast, Secure, and Scalable Websites',
    icon: '💻',
    description: 'Build powerful, responsive websites that deliver exceptional user experiences and drive real business results.',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      { title: 'Responsive Design', description: 'Perfect experience on all devices and screen sizes' },
      { title: 'SEO Optimized', description: 'Built for search engines to maximize visibility' },
      { title: 'Fast Loading', description: 'Optimized performance for better user engagement' },
      { title: 'Secure', description: 'Enterprise-grade security and data protection' },
      { title: 'Scalable', description: 'Architecture that grows with your business' },
      { title: 'Modern Stack', description: 'Latest technologies and best practices' }
    ],
    benefits: [
      'Increased conversions and sales',
      'Better search engine rankings',
      'Lower bounce rates',
      'Professional online presence',
      'Mobile-first experience',
      'Future-proof technology'
    ],
    portfolio: ['E-commerce Platforms', 'SaaS Applications', 'Corporate Websites', 'Landing Pages'],
    price: 'Custom Quote',
    timeline: '8-12 weeks'
  },
  'digital-marketing': {
    title: 'Digital Marketing Strategy',
    subtitle: 'Drive Growth with Data-Driven Marketing',
    icon: '📈',
    description: 'Comprehensive marketing strategies that increase visibility, engagement, and conversions.',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      { title: 'SEO Strategy', description: 'Organic search visibility and keyword optimization' },
      { title: 'Content Marketing', description: 'Engaging content that attracts and converts' },
      { title: 'Analytics', description: 'Data-driven insights and performance tracking' },
      { title: 'ROI Tracking', description: 'Transparent measurement of marketing effectiveness' },
      { title: 'Campaign Management', description: 'Coordinated multi-channel marketing campaigns' },
      { title: 'Growth Hacking', description: 'Rapid testing and scaling of successful tactics' }
    ],
    benefits: [
      'Increased website traffic',
      'Higher conversion rates',
      'Better customer insights',
      'Competitive advantage',
      'Measurable ROI',
      'Scalable growth'
    ],
    portfolio: ['B2B Lead Generation', 'E-commerce Growth', 'App User Acquisition', 'Brand Awareness'],
    price: 'Starting at ₹50,000/month',
    timeline: 'Ongoing'
  },
  'social-media': {
    title: 'Social Media Management',
    subtitle: 'Build and Engage Your Community',
    icon: '📱',
    description: 'Amplify your brand voice with compelling social media strategies that drive engagement and growth.',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: [
      { title: 'Content Creation', description: 'Professional, on-brand content for all platforms' },
      { title: 'Community Management', description: 'Active engagement and relationship building' },
      { title: 'Ad Campaigns', description: 'Targeted advertising for maximum reach and ROI' },
      { title: 'Analytics', description: 'Performance metrics and audience insights' },
      { title: 'Growth Strategy', description: 'Sustainable audience growth tactics' },
      { title: 'Influencer Collaboration', description: 'Strategic partnerships to amplify reach' }
    ],
    benefits: [
      'Increased brand awareness',
      'Community loyalty and advocacy',
      'Direct customer engagement',
      'Cost-effective advertising',
      'Real-time customer feedback',
      'Viral growth potential'
    ],
    portfolio: ['Fashion Brands', 'Tech Companies', 'F&B Businesses', 'Startups'],
    price: 'Starting at ₹30,000/month',
    timeline: 'Ongoing'
  }
};

export default function ServicesDetail() {
  const navigate = useNavigate();
  const { service } = useParams();
  const serviceKey = service || 'brand-identity';
  const data = servicesData[serviceKey] || servicesData['brand-identity'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/60 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <span className="text-2xl">{data.icon}</span>
              <span className="text-sm font-medium text-slate-300">Premium Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
              {data.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:scale-105"
              >
                Start Your Project
              </button>
              <button
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold backdrop-blur-sm transition-all"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div id="details" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">

            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Overview</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {data.description}
              </p>
            </section>

            {/* Features Grid */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {data.features.map((feature: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors shadow-sm"
                  >
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8">Key Benefits</h2>
                <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                  {data.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-slate-300 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">

              {/* Quick Stats Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Project Details</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pricing</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{data.price}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Timeline</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{data.timeline}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Availability</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">Open for new projects</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trust Card */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-slate-400" />
                  <h4 className="font-semibold text-slate-900 dark:text-white">Our Guarantee</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  We are committed to delivering excellence. All our services come with dedicated support and satisfaction guarantee.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
