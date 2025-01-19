import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StockChart } from './StockChart';
import { Stock } from './types';

const API_KEY = "ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g";

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
      <div className="flex items-center justify-center h-full text-white/60">
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
    buy: '#4ade80', // Light green
    hold: '#facc15', // Yellow
    sell: '#f87171', // Light red
    strongSell: '#dc2626', // Bright red
  };

  const handleTimeframeChange = (tf: string) => {
    setTimeFrame(tf);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col h-full bg-black/10 backdrop-blur-lg p-6 lg:p-8 rounded-2xl border border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{stock.name}</h1>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>{stock.symbol}</span>
              <span>•</span>
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
          <button
            onClick={() => onBuyClick(stock)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Buy {stock.symbol}
          </button>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl font-bold text-white">
            ${stock.price?.toFixed(2) ?? 'N/A'}
          </span>
          <motion.span
            animate={{
              color: (stock.change || 0) >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
            }}
            className="flex items-center text-xl font-medium"
          >
            {(stock.change || 0) >= 0 ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
            {Math.abs(stock.change || 0).toFixed(2)}%
          </motion.span>
        </div>

        {/* Time Frame Selector */}
        <div className="flex gap-2 mb-6">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeFrame === tf
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="flex-1 bg-black/20 rounded-xl p-4 backdrop-blur-sm mb-6">
          <div className="h-full">
            <StockChart symbol={stock.symbol} />
          </div>
        </div>

        {/* Recommendation Trends Section */}
        <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6">Recommendation Trends</h3>
          {trendsLoading ? (
            <div className="flex justify-center items-center py-4">
              <span className="text-white/60">Loading trends...</span>
            </div>
          ) : recommendationTrends.length > 0 ? (
            <div className="space-y-4">
              {recommendationTrends.map((trend, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4">
                  <p className="text-sm text-white/60 mb-4">Period: {trend.period}</p>
                  <div className="grid grid-cols-5 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-white/60">Strong Buy</p>
                      <p className="text-lg font-bold" style={{ color: trendColors.strongBuy }}>
                        {trend.strongBuy}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Buy</p>
                      <p className="text-lg font-bold" style={{ color: trendColors.buy }}>
                        {trend.buy}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Hold</p>
                      <p className="text-lg font-bold" style={{ color: trendColors.hold }}>
                        {trend.hold}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Sell</p>
                      <p className="text-lg font-bold" style={{ color: trendColors.sell }}>
                        {trend.sell}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/60">Strong Sell</p>
                      <p className="text-lg font-bold" style={{ color: trendColors.strongSell }}>
                        {trend.strongSell}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-4">
              <span className="text-white/60">No recommendation trends available.</span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};