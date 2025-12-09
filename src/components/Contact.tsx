import { MapPin, Phone, Mail, Send, Check, Sparkles, Zap, Shield, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsApi } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const toastId = toast.loading('Sending message...');

    try {
      await projectsApi.submitContact(formData);
      toast.success("Message sent successfully!", { id: toastId });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setErrors({});

    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 98257 54652',
      href: 'tel:+919825754652',
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@decentdigital.in',
      href: 'mailto:info@decentdigital.in',
      gradient: 'from-cyan-500 to-teal-500',
      iconBg: 'bg-gradient-to-br from-cyan-500/10 to-teal-500/10'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'FF-12, Amber Complex, Ajwa Road, Vadodara-19',
      href: null,
      gradient: 'from-teal-500 to-emerald-500',
      iconBg: 'bg-gradient-to-br from-teal-500/10 to-emerald-500/10'
    }
  ];

  const features = [
    { icon: Sparkles, text: 'Free Initial Consultation' },
    { icon: Zap, text: 'Fast Turnaround Time' },
    // { icon: Shield, text: '100% Money Back Guarantee' },
    { icon: Clock, text: '24/7 Priority Support' }
  ];

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <section id="contact" className="relative py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500">

        {/* Advanced Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 via-secondary/20 to-cyan-500/20 rounded-full blur-[40px] animate-blob will-change-transform" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-secondary/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-[40px] animate-blob animation-delay-2000 will-change-transform" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-[40px] animate-blob animation-delay-4000 will-change-transform" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_2px),linear-gradient(to_bottom,#80808012_1px,transparent_2px)] bg-[size:84px_84px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header */}
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-full border border-primary/20 dark:border-primary/30 mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-primary dark:text-primary-light" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Get In Touch
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Ready to{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-secondary to-cyan-500 bg-clip-text text-transparent">
                  Transform
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 to-secondary/30 -z-10 blur-sm"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>{' '}
              Your Business?
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Let's create something extraordinary together. Our team is ready to bring your vision to life with cutting-edge solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

            {/* Left Column - Contact Info & Features */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-white dark:bg-dark-card backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                    <div className="relative flex items-start gap-4">
                      <div className={`${info.iconBg} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className={`w-6 h-6 ${info.gradient} `} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
                          {info.title}
                        </h4>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300 text-sm leading-relaxed"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Special Offer Card */}
              <motion.div
                className="relative bg-gradient-to-br from-primary via-secondary to-cyan-500 rounded-2xl p-8 text-white shadow-2xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {/* Animated background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">Launch Offer</h3>
                  </div>

                  <p className="text-white/90 mb-6 leading-relaxed">
                    Get started with our exclusive package featuring premium services at unbeatable prices.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 text-white/95"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="bg-white/20 p-1 rounded-full">
                          <feature.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    className="w-full py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Claim Your Offer
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="relative bg-white dark:bg-dark-card backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-200 dark:border-white/10 shadow-2xl space-y-6">

                {/* Form decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl -z-10" />

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${focusedField === 'name'
                        ? 'text-primary dark:text-primary-light'
                        : 'text-gray-900 dark:text-white'
                        }`}
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                        placeholder="John Doe"
                      />
                      <AnimatePresence>
                        {formData.name && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <Check className="w-5 h-5 text-green-500" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${focusedField === 'email'
                        ? 'text-primary dark:text-primary-light'
                        : 'text-gray-900 dark:text-white'
                        }`}
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                      <AnimatePresence>
                        {formData.email.includes('@') && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <Check className="w-5 h-5 text-green-500" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${focusedField === 'phone'
                        ? 'text-primary dark:text-primary-light'
                        : 'text-gray-900 dark:text-white'
                        }`}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                      placeholder="+91 98257 54652"
                    />
                  </div>

                  {/* Service Field */}
                  <div className="relative">
                    <label
                      htmlFor="service"
                      className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${focusedField === 'service'
                        ? 'text-primary dark:text-primary-light'
                        : 'text-gray-900 dark:text-white'
                        }`}
                    >
                      Service Interested In *
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-white dark:bg-dark text-gray-500">Select a service</option>
                        <option value="brand-identity" className="bg-white dark:bg-dark text-gray-900 dark:text-white">Brand Identity</option>
                        <option value="web-development" className="bg-white dark:bg-dark text-gray-900 dark:text-white">Web Development</option>
                        <option value="digital-marketing" className="bg-white dark:bg-dark text-gray-900 dark:text-white">Digital Marketing</option>
                        <option value="social-media" className="bg-white dark:bg-dark text-gray-900 dark:text-white">Social Media Management</option>
                        <option value="custom-solution" className="bg-white dark:bg-dark text-gray-900 dark:text-white">Custom Solution</option>
                        <option value="business-growth" className="bg-white dark:bg-dark text-gray-900 dark:text-white">Business Growth</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${focusedField === 'message'
                      ? 'text-primary dark:text-primary-light'
                      : 'text-gray-900 dark:text-white'
                      }`}
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project and how we can help you achieve your goals..."
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {formData.message.length} characters
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-4 bg-gradient-to-r from-primary via-secondary to-cyan-500 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-200 animate-gradient" />

                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </motion.button>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-4">
                  <Shield className="w-4 h-4" />
                  <span>Your information is secure and will never be shared</span>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
