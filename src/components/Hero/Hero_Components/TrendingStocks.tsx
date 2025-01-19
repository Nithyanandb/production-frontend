import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../../config/API_CONFIG';
import { useNavigate } from 'react-router-dom';

const TrendingStocks: React.FC = () => {
  const { data: trending, refetch, isRefetching, isLoading } = useQuery({
    queryKey: ['trending-stocks'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('TRENDING')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClick = () => {
    navigate('/stock/all'); // Redirect to the /stock/all route
  };
  const trendingStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '182.63', change: '+1.25%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: '238.45', change: '+2.8%' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '485.09', change: '+3.2%' },
    { symbol: 'META', name: 'Meta Platforms', price: '326.49', change: '+1.7%' }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Premium Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/50 to-black/80 backdrop-blur-2xl" />
      
      <div className="relative">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h2 className="text-white tracking-[0.25em] font-light">
              TRENDING NOW
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 text-white ${isRefetching ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Enhanced Stock List */}
        <div className="p-6 space-y-4">
          {trendingStocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-lg transition-all duration-300"
            >
              <div className="space-y-1">
                <div className="text-white font-light tracking-wider">{stock.symbol}</div>
                <div className="text-sm text-gray-400">{stock.name}</div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-white font-light">${stock.price}</div>
                <div className="text-green-400 text-sm">{stock.change}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
      whileHover={{ x: 4 }} // Add a subtle hover animation
      whileTap={{ scale: 0.98 }} // Add a subtle tap animation
      onClick={handleClick} // Trigger the redirection on click
      className="w-full flex items-center justify-between p-6 rounded-lg border border-gray-200 bg-blue-200 shadow-sm hover:shadow-md transition-all duration-300"
      style={{
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      <span className="text-sm text-gray-800 font-medium tracking-wide">VIEW ALL STOCKS</span>
      <ArrowRight className="w-4 h-4 text-gray-800 transform group-hover:translate-x-1 transition-transform" />
    </motion.button>
      </div>
    </div>
  );
};

export default TrendingStocks;