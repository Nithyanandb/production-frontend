import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MarketWatch from './Hero_Components/MarketWatch';
import HeroContent from './Hero_Components/HeroContent';
import MarketMetrics from './Hero_Components/MarketMetrics';
import MarketDashboard from './SideBar/MarketDashboard';
import { WorldIndices } from './WorldIndices/WorldIndices';
import MarketGraph from './Hero_Components/MarketGraph';
import { symbols } from '../pages/AllStocks/symbols';
import EarningsSurprise from './Hero_Components/EarningsSurprise';
import SectorPerformance from './Hero_Components/SectorPerformance';


const Hero: React.FC = () => {
  const [currentSymbol, setCurrentSymbol] = useState(symbols[0].symbol);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSymbol((prevSymbol) => {
        const currentIndex = symbols.findIndex((s) => s.symbol === prevSymbol);
        const nextIndex = (currentIndex + 1) % symbols.length;
        return symbols[nextIndex].symbol;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden -mt-4">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        <div className="container px-0 sm:px-0 lg:px-0 mx-auto">
          <div className="flex justify-center items-center ">
            <div className="w-full max-w-full">
              <HeroContent />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 mt-8">
            <div className="lg:col-span-8 space-y-4 lg:space-y-8">
              {/* MarketWatch */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:pl-6 overflow-hidden transition-all duration-500"
              >
                <MarketWatch />
              </motion.div>

              {/* MarketMetrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:p-6 overflow-hidden transition-all duration-500"
              >
                <MarketMetrics />
              </motion.div>

              {/* MarketGraph */}
              <motion.div
                key={currentSymbol}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="hidden sm:block"
              >
                <div className="lg:p-2 mb-24" style={{ height: '500px' }}> {/* Fixed height */}
                  <MarketGraph symbol={currentSymbol} />
                </div>
              </motion.div>

              {/* EarningsSurprise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:p-6 overflow-hidden transition-all duration-500 hidden sm:block"
              >
                <EarningsSurprise symbol={currentSymbol} limit={50} />
              </motion.div>

              {/* SectorPerformance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="lg:p-6 overflow-hidden transition-all duration-500 hidden sm:block"
              >
                <SectorPerformance />
              </motion.div>

              {/* WorldIndices */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:p-6 overflow-hidden transition-all duration-500 hidden sm:block"
              >
                <WorldIndices />
              </motion.div>
            </div>

            {/* MarketDashboard */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-4 lg:space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="overflow-hidden transition-all duration-500"
                >
                  <MarketDashboard />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;