import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndexTable } from './IndexTable';
import { useWorldIndices } from './useWorldIndices';

export const WorldIndices: React.FC = () => {
  const { data: indexData } = useWorldIndices();

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-2xl bg-white/90 rounded-3xl overflow-hidden "
      >
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-black tracking-tight">
              World Market Indices
            </h2>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Live Updates
              </span>
              <span className="text-sm text-gray-500">
                Every 5s
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <div className="divide-y divide-gray-200">
            {Object.entries(indexData || {}).map(([region, indices]) => (
              <motion.section
                key={region}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  {region === 'asiaPacific' ? 'Asia-Pacific' : region}
                </h3>
                <IndexTable 
                  indices={indices} 
                  showMiniChart={true}
                />
              </motion.section>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};