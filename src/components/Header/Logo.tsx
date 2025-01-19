import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export const Logo = () => (
  <motion.a
    href="/"
    className="flex items-center gap-2 group"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.div
      className="relative"
      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
      transition={{ duration: 0.5 }}
    >
      <TrendingUp className="h-6 w-6 text-black dark:text-white" /> {/* Icon color adjusts for light/dark mode */}
      <div className="absolute inset-0 bg-blue-500/10 blur-lg" /> {/* Subtle blur effect */}
    </motion.div>
    <div className="ml-2 flex flex-col">
      <span className="text-xl font-semibold tracking-tight text-black dark:text-white">
        CapX
      </span>
      <span className="text-[10px] text-gray-500 dark:text-gray-400 tracking-wider mt-0">
        Your Gateway to the Market
      </span>
    </div>
  </motion.a>
);