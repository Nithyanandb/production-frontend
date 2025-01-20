import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon } from 'lucide-react';

const HeroSection: React.FC = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="relative h-screen flex flex-col items-center justify-center text-center bg-white"
  >
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover opacity-30"
        style={{ filter: 'grayscale(100%)' }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
    </div>

    <div className="relative z-10">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-center w-24 h-24">
          <TrendingUpIcon className="w-16 h-16 text-gray-900" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-8xl font-bold mb-6 -mt-36 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 leading-none"
      >
        CapX
      </motion.h1>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="text-3xl md:text-4xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
      >
        The next generation of
        <span className="block text-5xl md:text-6xl font-medium mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          AI-Powered Investment
        </span>
      </motion.p>
    </div>
  </motion.section>
);

export default HeroSection;