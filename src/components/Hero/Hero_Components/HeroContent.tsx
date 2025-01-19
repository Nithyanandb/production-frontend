import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AuthModal from '../../Auth/AuthModal';

const HeroContent: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Market watch data
  const marketData = [
    { name: 'NIFTY 50', price: '₹22,147.00', change: '+0.55%' },
    { name: 'SENSEX', price: '₹72,831.94', change: '-0.12%' },
    { name: 'BANKNIFTY', price: '₹46,591.25', change: '+0.32%' },
    { name: 'RELIANCE', price: '₹2,931.75', change: '+1.24%' },
    { name: 'TCS', price: '₹4,012.85', change: '-0.45%' },
  ];

  // Global Markets Data
  const globalMarkets = [
    { index: 'Nasdaq Jan 17', price: '19,630.20', change: '+291.91', percentChange: '+1.51%' },
    { index: 'FTSE Jan 17', price: '8,505.22', change: '+113.32', percentChange: '+1.35%' },
  ];

  // Most Active Stocks (NSE)
  const mostActive = [
    { company: 'Reliance', price: '1,302.35', change: '+35.90', value: '3,824.52' },
    { company: 'Axis Bank', price: '991.05', change: '-46.95', value: '3,352.88' },
    { company: 'Infosys', price: '1,815.45', change: '-113.00', value: '2,979.14' },
    { company: 'HDFC Bank', price: '1,636.75', change: '-15.30', value: '1,891.43' },
    { company: 'ICICI Bank', price: '1,225.45', change: '-23.65', value: '1,199.78' },
  ];

  // Top Gainers (Nifty)
  const topGainers = [
    { company: 'Reliance', price: '1,302.35', change: '+35.90', percentGain: '+2.83%' },
    { company: 'BPCL', price: '273.60', change: '+6.70', percentGain: '+2.51%' },
    { company: 'Hindalco', price: '617.00', change: '+14.40', percentGain: '+2.39%' },
    { company: 'Coal India', price: '387.65', change: '+8.80', percentGain: '+2.32%' },
    { company: 'Nestle', price: '2,217.20', change: '+47.90', percentGain: '+2.21%' },
  ];

  // Top Losers (Nifty)
  const topLosers = [
    { company: 'Infosys', price: '1,815.45', change: '-113.00', percentLoss: '-5.86%' },
    { company: 'Axis Bank', price: '991.05', change: '-46.95', percentLoss: '-4.52%' },
    { company: 'Shriram Finance', price: '526.50', change: '-20.30', percentLoss: '-3.71%' },
    { company: 'Kotak Mahindra', price: '1,758.60', change: '-46.95', percentLoss: '-2.60%' },
    { company: 'M&M', price: '2,917.35', change: '-63.25', percentLoss: '-2.12%' },
  ];

  return (
    <div className="relative w-full h-[700px] z-50 flex flex-col items-start justify-start min-h-[calc(100vh-80px)] px-8 sm:px-12 lg:px-16 mt-10 bg-black sm:bg-white">
      {/* Gradient Overlay */}
    

      {/* Main Content - Flex Container */}
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left Column - Title, Description, and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="flex-1"
        >
          {/* Title Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white sm:text-black tracking-tight leading-[1.1] mt-20 mb-8"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
            }}
          >
            <span className="inline-block transition-colors duration-300">T</span>
            <span className="inline-block transition-colors duration-300">r</span>
            <span className="inline-block transition-colors duration-300">a</span>
            <span className="inline-block transition-colors duration-300">d</span>
            <span className="inline-block transition-colors duration-300">e</span>
            &nbsp;
            <span className="inline-block transition-colors duration-300">S</span>
            <span className="inline-block transition-colors duration-300">m</span>
            <span className="inline-block transition-colors duration-300">a</span>
            <span className="inline-block transition-colors duration-300">r</span>
            <span className="inline-block transition-colors duration-300">t</span>
            <span className="inline-block transition-colors duration-300">e</span>
            <span className="inline-block transition-colors duration-300">r</span>
            &nbsp;
            <span className="inline-block py-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              AI intelligence
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 sm:text-gray-600 mb-8 sm:mb-10 max-w-[540px] leading-relaxed"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
            }}
          >
            Experience the future of trading with real-time AI insights. Make data-driven decisions with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start justify-start gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-3 bg-white sm:bg-black z-20 rounded-[28px] text-black sm:text-white text-sm font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300 w-full max-w-[280px] sm:w-auto sm:max-w-none"
              style={{
                boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
              }}
            >
              Start Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-black sm:bg-white z-20 rounded-[28px] text-white sm:text-black text-sm font-medium tracking-wide border border-gray-200 hover:bg-gray-50 transition-all duration-300 w-full max-w-[280px] sm:w-auto sm:max-w-none"
              style={{
                boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
              }}
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 sm:mt-12 flex flex-wrap items-start justify-start gap-4 sm:gap-8 text-gray-400 sm:text-gray-600 text-xs sm:text-sm"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
            }}
          >
            <span>Real-time analysis</span>
            <span>•</span>
            <span>AI predictions</span>
            <span>•</span>
            <span>Smart alerts</span>
          </motion.div>
        </motion.div>

        {/* Right Column - Market Watch Section (Sidebar) */}
        {window.innerWidth >= 500 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full lg:w-[400px] lg:absolute lg:right-0 lg:mt-16 lg:h-screen lg:overflow-y-auto lg:px-8 lg:py-10"
          >
            {/* Top Gainers */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-white sm:text-black mb-2">Top Gainers</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 sm:text-gray-600">
                    <th className="text-left p-2">Company</th>
                    <th className="text-right p-2">Price</th>
                    <th className="text-right p-2">Change (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {topGainers.map((gainer, index) => (
                    <tr
                      key={index}
                      className="p-2 bg-gray-800 sm:bg-white rounded-sm border border-gray-700 sm:border-gray-200 transition-all duration-300"
                    >
                      <td className="text-xs text-white sm:text-black p-2">{gainer.company}</td>
                      <td className="text-xs font-medium text-white sm:text-black text-right p-2">{gainer.price}</td>
                      <td className="text-xs text-green-400 sm:text-green-600 text-right p-2">{gainer.change} ({gainer.percentGain})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top Losers */}
            <div className="mb-4 p-0">
              <h3 className="text-sm font-medium text-white sm:text-black mb-2">Top Losers</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 sm:text-gray-600">
                    <th className="text-left p-2">Company</th>
                    <th className="text-right p-2">Price</th>
                    <th className="text-right p-2">Change (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {topLosers.map((loser, index) => (
                    <tr
                      key={index}
                      className="p-1.5 bg-gray-800 sm:bg-white rounded-sm border border-gray-700 sm:border-gray-200 hover:bg-gray-700 sm:hover:bg-gray-50 transition-all duration-300"
                    >
                      <td className="text-xs text-white sm:text-black p-2">{loser.company}</td>
                      <td className="text-xs font-medium text-white sm:text-black text-right p-2">{loser.price}</td>
                      <td className="text-xs text-red-400 sm:text-red-600 text-right p-2">{loser.change} ({loser.percentLoss})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Global Markets and Most Active Sections */}
      {window.innerWidth >= 500 && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="w-[500px] mt-[360px] ml-[550px] absolute"
        >
          {/* Global Markets */}
          <div className="mb-4 w-[250px] ml-[250px] mt-[-130px] absolute">
            <h3 className="text-sm text-right font-medium text-white sm:text-black mb-2">Global Markets</h3>
            <div className="grid grid-cols-1 gap-2">
              {globalMarkets.map((market, index) => (
                <div
                  key={index}
                  className="p-2 text-white sm:text-black bg-gray-800 sm:bg-white rounded-sm border border-gray-700 sm:border-gray-200 transition-all duration-300"
                >
                  <div className="flex items-left justify-between">
                    <p className="text-xs text-white sm:text-black">{market.index}</p>
                    <p className="text-xs font-medium text-white sm:text-black text-right">{market.price}</p>
                    <p className="text-xs text-green-400 sm:text-green-600 text-right">{market.change} ({market.percentChange})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Active Stocks */}
          <div className="mb-4 w-[250px] ml-[250px]">
            <h3 className="text-sm font-medium text-white sm:text-black mb-2 text-right">Most Active (NSE)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2">
              {mostActive.map((stock, index) => (
                <div
                  key={index}
                  className="p-1.5 bg-gray-800 sm:bg-white rounded-sm border border-gray-700 sm:border-gray-200 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white sm:text-black">{stock.company}</p>
                    <p className="text-xs font-medium text-white sm:text-black">{stock.price}</p>
                    <p className={`text-xs ${stock.change.startsWith('+') ? 'text-green-400 sm:text-green-600' : 'text-red-400 sm:text-red-600'}`}>
                      {stock.change} (₹{stock.value} Cr.)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* AuthModal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default HeroContent;