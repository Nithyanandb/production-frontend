import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../Header/Logo';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="relative mt-12 pb-12 xs:pl-4 md:pb-16 bg-white">
      {/* Mobile-only message with animation */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/90 py-2 px-4 text-center text-sm text-white/80 z-50"
          >
            For the best experience, please view this site on a desktop device.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16"
        >
          {/* Logo and Description */}
          <div className="space-y-4 md:space-y-6">
            <Logo />
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Elevate your experience with cutting-edge technology.
            </p>
          </div>

          {/* Platform Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 md:space-y-6"
          >
            <h4 className="text-xs md:text-sm uppercase tracking-wider text-gray-500">
              Platform
            </h4>
            <ul className="space-y-2 md:space-y-4">
              {["Trading system", "Investment tools", "Market research", "Portfolio analytics", "AI insights"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm md:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            <h4 className="text-xs md:text-sm uppercase tracking-wider text-gray-500">
              Company
            </h4>
            <ul className="space-y-2 md:space-y-4">
              {["About us", "Careers", "Newsroom", "Contact", "Support"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm md:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4 md:space-y-6"
          >
            <h4 className="text-xs md:text-sm uppercase tracking-wider text-gray-500">
              Legal
            </h4>
            <ul className="space-y-2 md:space-y-4">
              {["Privacy", "Terms", "Security", "Compliance", "Accessibility"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm md:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            {/* Copyright */}
            <p className="text-xs md:text-sm text-gray-500">
              © 2024 Capx. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 md:gap-8">
              {["Privacy", "Terms", "Cookies", "Sitemap"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs md:text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Country Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">IN</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;