import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { text } from 'stream/consumers';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-10xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-full bg-black border-t border-gray-700/50 shadow-2xl p-6"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-300 text-center md:text-left">
                We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="/privacy"
                  className="text-sm text-white hover:text-blue-300 transition-colors" style={{textDecoration:'underline', textUnderlineOffset:'10px', marginTop:'-10px'}}
                >
                  Learn More
                </a>
                <button
                  onClick={handleAccept}
                  className="text-sm font-medium bg-white text-black px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;