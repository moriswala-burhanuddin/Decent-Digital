import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleServiceClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    navigate(`/service/${id}`);
    window.scrollTo(0, 0);
  };

  const services = [
    { name: 'Brand Identity', id: 'brand-identity' },
    { name: 'Web Development', id: 'web-development' },
    { name: 'Digital Marketing', id: 'digital-marketing' },
    { name: 'Social Media', id: 'social-media' },
    { name: 'Custom Solutions', id: 'custom-solutions' },
    { name: 'Business Growth', id: 'business-growth' }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-dark-lighter pt-16 pb-8 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/logo.png" alt="Decent Digital" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white transition-colors duration-300">Decent Digital</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Grow Digitally With Us</p>
              </div>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
              Transform your business with cutting-edge digital solutions. We create stunning websites,
              powerful brands, and effective marketing strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-secondary transition-all duration-300 group shadow-sm hover:shadow-lg">
                <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-secondary transition-all duration-300 group shadow-sm hover:shadow-lg">
                <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-secondary transition-all duration-300 group shadow-sm hover:shadow-lg">
                <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-primary hover:to-secondary transition-all duration-300 group shadow-sm hover:shadow-lg">
                <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`/service/${service.id}`}
                    onClick={(e) => handleServiceClick(e, service.id)}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300 flex items-center space-x-2 group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Work', path: '/projects' },
                { name: 'Testimonials', path: '/#testimonials' },
                { name: 'Blog', path: '/blog' },
                { name: 'Careers', path: '/careers' }
              ].map((link) => (
                <li key={link.name}>
                  {link.path.startsWith('/#') ? (
                    <a href={link.path} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300 flex items-center space-x-2 group">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>{link.name}</span>
                    </a>
                  ) : (
                    <Link to={link.path} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300 flex items-center space-x-2 group">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+919825754652" className="hover:text-primary dark:hover:text-primary-light transition-colors duration-300">
                  +91 98257 54652
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:info@decentdigital.in" className="hover:text-primary dark:hover:text-primary-light transition-colors duration-300">
                  info@decentdigital.in
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  FF-12, Amber Complex<br />
                  Ajwa Road, Vadodara-19
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-8 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left transition-colors duration-300">
              © {currentYear} Decent Digital. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
