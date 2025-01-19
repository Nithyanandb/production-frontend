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
      <div className="h-full flex items-center justify-center text-white/60">
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
        className="flex flex-col h-full bg-[#111111]/90 backdrop-blur-xl p-6 lg:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-light text-white mb-1">{stock.name}</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-white/60">{stock.symbol}</span>
              <span className="text-white/20">•</span>
              <span className="text-white/60 font-light">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-5xl font-light text-white">
            ₹{stock.currentPrice?.toFixed(2) || 'N/A'}
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
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-black/40 rounded-2xl backdrop-blur-sm mb-8 overflow-hidden">
          <div className="h-full p-4">
            <StockChart stock={stock} timeFrame={timeFrame} />
          </div>
        </div>

        <div className="bg-black/40 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-light text-white mb-6">Market Analysis</h3>
          {trendsLoading ? (
            <div className="flex justify-center items-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full"
              />
            </div>
          ) : recommendationTrends.length > 0 ? (
            <div className="space-y-6">
              {recommendationTrends.map((trend, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6">
                  <p className="text-sm text-white/60 mb-4 font-light">{trend.period}</p>
                  <div className="grid grid-cols-5 gap-4">
                    {[
                      { label: 'Strong Buy', value: trend.strongBuy, color: trendColors.strongBuy },
                      { label: 'Buy', value: trend.buy, color: trendColors.buy },
                      { label: 'Hold', value: trend.hold, color: trendColors.hold },
                      { label: 'Sell', value: trend.sell, color: trendColors.sell },
                      { label: 'Strong Sell', value: trend.strongSell, color: trendColors.strongSell },
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <p className="text-xs text-white/40 mb-2 font-light">{item.label}</p>
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
              <span className="text-white/40 font-light">No market analysis available</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StockDetail;