import React, { useState, useEffect } from 'react';
import { Stock } from './stockApi';
import { ArrowUp, ArrowDown, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StockChart } from './StockChart';

const API_KEY = "ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g"; // Replace with your API key

interface StockDetailProps {
  stock: Stock | null;
  onBuyClick: (stock: Stock) => void;
  loading?: boolean;
}

export const StockDetail: React.FC<StockDetailProps> = ({ stock, onBuyClick, loading }) => {
  const [timeFrame, setTimeFrame] = useState<string>('1D');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recommendationTrends, setRecommendationTrends] = useState<any[]>([]);
  const [trendsLoading, setTrendsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility

  // Fetch recommendation trends when stock changes
  useEffect(() => {
    const fetchRecommendationTrends = async () => {
      if (stock?.symbol) {
        setTrendsLoading(true);
        try {
          const response = await fetch(
            `https://finnhub.io/api/v1/stock/recommendation?symbol=${stock.symbol}&token=${API_KEY}`
          );
          const data = await response.json();
          setRecommendationTrends(data);
        } catch (error) {
          console.error('Failed to fetch recommendation trends:', error);
        } finally {
          setTrendsLoading(false);
        }
      }
    };

    fetchRecommendationTrends();
  }, [stock?.symbol]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // If stock is not defined, return null or a fallback UI
  if (loading || !stock) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600">
        <div className="text-center">
          <Globe size={48} className="mx-auto mb-4 opacity-60" />
          <p className="text-xl">Select a stock to view details</p>
        </div>
      </div>
    );
  }

  const timeFrames = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  // Color scheme for recommendation trends
  const trendColors = {
    strongBuy: '#16a34a', // Bright green
    buy: '#4ade80',      // Light green
    hold: '#facc15',     // Yellow
    sell: '#f87171',     // Light red
    strongSell: '#dc2626', // Bright red
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex -mt-6 flex-col h-full bg-white backdrop-blur-xl p-4 lg:p-4"
      >
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold text-black">{stock.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">{stock.symbol}</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Compact Price Section */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl font-medium text-black">
          ₹{stock.price?.toFixed(2) ?? 'N/A'} {/* Use optional chaining */}
          </span>
          <motion.span
            animate={{
              color: (stock.change || 0) >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
            }}
            className="flex items-center text-lg"
          >
            {(stock.change || 0) >= 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            {Math.abs(stock.change || 0).toFixed(2)}%
          </motion.span>
        </div>

        {/* Compact Time Frame Selector */}
        <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                timeFrame === tf
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="flex-1 bg-gray-100 rounded-xl mt-12 backdrop-blur-sm">
          <div className="h-full">
            <StockChart stock={stock} timeFrame={timeFrame} />
          </div>
        </div>

        {/* Recommendation Trends Section */}
        <div
          className="rounded-xl p-4 backdrop-blur-sm cursor-pointer"
          onClick={openModal} // Open modal on click
        >
          <h3 className="text-lg font-semibold text-black mb-4">Recommendation Trends</h3>
          {trendsLoading ? (
            <div className="flex justify-center items-center py-4">
              <span className="text-gray-600">Loading trends...</span>
            </div>
          ) : recommendationTrends.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-xs text-gray-600 text-left">Period</th>
                    <th className="px-4 py-2 text-xs text-gray-600 text-center">Strong Buy</th>
                    <th className="px-4 py-2 text-xs text-gray-600 text-center">Buy</th>
                    <th className="px-4 py-2 text-xs text-gray-600 text-center">Hold</th>
                    <th className="px-4 py-2 text-xs text-gray-600 text-center">Sell</th>
                    <th className="px-4 py-2 text-xs text-gray-600 text-center">Strong Sell</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendationTrends.slice(0, 1).map((trend, index) => ( // Show only the first row in the preview
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-600">{trend.period}</td>
                      <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.strongBuy }}>
                        {trend.strongBuy}
                      </td>
                      <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.buy }}>
                        {trend.buy}
                      </td>
                      <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.hold }}>
                        {trend.hold}
                      </td>
                      <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.sell }}>
                        {trend.sell}
                      </td>
                      <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.strongSell }}>
                        {trend.strongSell}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center py-4">
              <span className="text-gray-600">No recommendation trends available.</span>
            </div>
          )}
        </div>

        {/* Modal for Recommendation Trends */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={closeModal} // Close modal when clicking outside
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: -20 }}
                className="bg-white rounded-xl w-full max-w-2xl p-6 relative"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 text-gray-600 hover:text-black"
                >
                  <X size={20} />
                </button>
                <h3 className="text-lg font-semibold text-black mb-4">Recommendation Trends</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-xl shadow-sm">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-xs text-gray-600 text-left">Period</th>
                        <th className="px-4 py-2 text-xs text-gray-600 text-center">Strong Buy</th>
                        <th className="px-4 py-2 text-xs text-gray-600 text-center">Buy</th>
                        <th className="px-4 py-2 text-xs text-gray-600 text-center">Hold</th>
                        <th className="px-4 py-2 text-xs text-gray-600 text-center">Sell</th>
                        <th className="px-4 py-2 text-xs text-gray-600 text-center">Strong Sell</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recommendationTrends.map((trend, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="px-4 py-3 text-sm text-gray-600">{trend.period}</td>
                          <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.strongBuy }}>
                            {trend.strongBuy}
                          </td>
                          <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.buy }}>
                            {trend.buy}
                          </td>
                          <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.hold }}>
                            {trend.hold}
                          </td>
                          <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.sell }}>
                            {trend.sell}
                          </td>
                          <td className="px-4 py-3 text-lg font-medium text-center" style={{ color: trendColors.strongSell }}>
                            {trend.strongSell}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};