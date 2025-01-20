import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrendingStocks: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/stock/all');
  };

  const trendingStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '182.63', change: '+1.25%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: '238.45', change: '+2.8%' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '485.09', change: '+3.2%' },
    { symbol: 'META', name: 'Meta Platforms', price: '326.49', change: '+1.7%' }
  ];

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl ">
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-gray-900 tracking-[0.25em] font-semibold">
              TRENDING NOW
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 text-gray-700" />
          </motion.button>
        </div>

        {/* Stock List */}
        <div className="p-6 space-y-4">
          {trendingStocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="text-gray-900 font-medium">{stock.symbol}</div>
                <div className="text-sm text-gray-500">{stock.name}</div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-gray-900 font-medium">₹{stock.price}</div>
                <div className={`text-sm ${stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className="w-full flex items-center justify-between p-6 rounded-b-3xl border-t border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-300"
        >
          <span className="text-sm text-gray-700 font-medium tracking-wide">VIEW ALL STOCKS</span>
          <ArrowRight className="w-4 h-4 text-gray-700" />
        </motion.button>
      </div>
    </div>
  );
};

export default TrendingStocks;