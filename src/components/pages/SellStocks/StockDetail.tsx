import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Clock, TrendingUp, BarChart2, Activity, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StockChart from './StockChart';
import { Portfolio } from '@/components/portfolio/PortfolioTable';

interface StockDetailProps {
  stock: Portfolio | null;
  onSellClick: (stock: Portfolio) => void;
  loading?: boolean;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock, onSellClick, loading }) => {
  const [timeFrame, setTimeFrame] = useState<string>('1D');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recommendationTrends, setRecommendationTrends] = useState<any[]>([]);
  const [trendsLoading, setTrendsLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading || !stock) {
    return (
      <div className="h-full flex items-center justify-center text-gray-600">
        <div className="text-center">
          <Globe size={48} className="mx-auto mb-4 opacity-60" />
          <p className="text-xl font-light">Select a stock to view details</p>
        </div>
      </div>
    );
  }

  const timeFrames = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  const trendColors = {
    strongBuy: '#22c55e',
    buy: '#4ade80',
    hold: '#facc15',
    sell: '#f87171',
    strongSell: '#ef4444',
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col h-full bg-white rounded-2xl p-6 lg:p-8 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-light text-black mb-1">{stock.name}</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600">{stock.symbol}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600 font-light">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-5xl font-light text-black">
            ${stock.currentPrice?.toFixed(2) || 'N/A'}
          </span>
          <motion.span
            animate={{
              color: (stock.totalReturn || 0) >= 0 ? "#22c55e" : "#ef4444"
            }}
            className="flex items-center text-lg font-light"
          >
            {(stock.totalReturn || 0) >= 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            {Math.abs(stock.totalReturn || 0).toFixed(2)}%
          </motion.span>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                timeFrame === tf
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-gray-100 rounded-2xl mb-8 overflow-hidden">
          <div className="h-full p-4">
            <StockChart stock={stock} timeFrame={timeFrame} />
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6">
          <h3 className="text-xl font-light text-black mb-6">Market Analysis</h3>
          {trendsLoading ? (
            <div className="flex justify-center items-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full"
              />
            </div>
          ) : recommendationTrends.length > 0 ? (
            <div className="space-y-6">
              {recommendationTrends.map((trend, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-600 mb-4 font-light">{trend.period}</p>
                  <div className="grid grid-cols-5 gap-4">
                    {[
                      { label: 'Strong Buy', value: trend.strongBuy, color: trendColors.strongBuy },
                      { label: 'Buy', value: trend.buy, color: trendColors.buy },
                      { label: 'Hold', value: trend.hold, color: trendColors.hold },
                      { label: 'Sell', value: trend.sell, color: trendColors.sell },
                      { label: 'Strong Sell', value: trend.strongSell, color: trendColors.strongSell },
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <p className="text-xs text-gray-500 mb-2 font-light">{item.label}</p>
                        <p className="text-lg font-light" style={{ color: item.color }}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-8">
              <span className="text-gray-500 font-light">No market analysis available</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StockDetail;