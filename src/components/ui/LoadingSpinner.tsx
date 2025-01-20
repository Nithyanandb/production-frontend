import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="mt-20 relative z-10 text-center space-y-8"
  >
    {/* Outer Container */}
    <div className="relative mx-auto w-24 h-24">
      {/* Outer Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-t-2 border-gray"
      />
      {/* Middle Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-full border-t-2 border-black"
      />
      {/* Inner Dot */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-100 rounded-full bg-black"
      />
    </div>
   
  </motion.div>
);

export default LoadingSpinner;