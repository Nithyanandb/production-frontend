import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Area, ComposedChart, Bar
} from 'recharts';
import { Globe, Activity } from 'lucide-react';

interface MarketGraphProps {
  symbol: string;
  showGlobalComparison?: boolean;
  onTimeframeChange?: (timeframe: string) => void;
}

const generateRandomPrice = (basePrice: number, volatility: number = 0.02) => {
  const change = basePrice * volatility * (Math.random() - 0.5);
  return basePrice + change;
};

const generateMarketData = (timeframe: string, basePrice: number = 100) => {
  const dataPoints: { date: string; close: number; volume: number; marketIndex: number }[] = [];
  const periods = {
    '1D': 24,
    '1W': 7 * 24,
    '1M': 30,
    '3M': 90,
    '1Y': 252,
    '5Y': 1260
  }[timeframe] || 24;

  let currentPrice = basePrice;
  let currentMarketIndex = basePrice;
  const now = new Date();

  for (let i = 0; i < periods; i++) {
    const date = new Date(now);
    
    if (timeframe === '1D') {
      date.setHours(date.getHours() - i);
    } else if (timeframe === '1W') {
      date.setHours(date.getHours() - i);
    } else {
      date.setDate(date.getDate() - i);
    }

    currentPrice = generateRandomPrice(currentPrice);
    currentMarketIndex = generateRandomPrice(currentMarketIndex, 0.01);

    dataPoints.unshift({
      date: date.toISOString(),
      close: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
      marketIndex: Number(currentMarketIndex.toFixed(2))
    });
  }

  return dataPoints;
};

export const MarketGraph: React.FC<MarketGraphProps> = ({ 
  symbol, 
  showGlobalComparison = true,
  onTimeframeChange 
}) => {
  const [timeframe, setTimeframe] = useState('1D');
  const [showVolume, setShowVolume] = useState(true);
  const [currentData, setCurrentData] = useState(generateMarketData('1D'));
  const [nextData, setNextData] = useState<typeof currentData | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [animatedPrice, setAnimatedPrice] = useState(currentData[currentData.length - 1].close);
  const [loading, setLoading] = useState(true);
  const animationRef = useRef<number | null>(null);

  // Generate data based on symbol
  const basePrice = {
    'AAPL': 150,
    'MSFT': 380,
    'GOOGL': 140,
    'TSLA': 250,
    'NVDA': 800
  }[symbol] || 100;

  useEffect(() => {
    // Simulate loading delay
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    // Fetch new data in the background when timeframe changes
    setIsFetching(true);
    const newData = generateMarketData(timeframe, basePrice);
    setNextData(newData);
    setIsFetching(false);
  }, [timeframe, basePrice]);

  useEffect(() => {
    // Swap currentData with nextData once nextData is ready
    if (nextData && !isFetching) {
      setCurrentData(nextData);
      setNextData(null);
    }
  }, [nextData, isFetching]);

  useEffect(() => {
    // Animate the price change
    const targetPrice = currentData[currentData.length - 1].close;
    const startPrice = animatedPrice;
    const duration = 1000; // 1 second for smooth transition

    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const newPrice = startPrice + (targetPrice - startPrice) * progress;
      setAnimatedPrice(newPrice);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentData]);

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    onTimeframeChange?.(tf);
  };

  const priceChange = animatedPrice - currentData[0].close;
  const priceChangePercent = ((priceChange / currentData[0].close) * 100).toFixed(2);

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[400px] bg-white rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Market Graph for {symbol}</h2>
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={symbol}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[400px] bg-white rounded-2xl p-6"
    >
      {/* Header with price change */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-xl font-medium text-gray-900">{symbol}</h3>
            <div className={`text-sm ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
            </div>
          </div>
          {showGlobalComparison && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600">Global Market</span>
            </div>
          )}
        </div>
        
        {/* Timeframe selector */}
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                timeframe === tf 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={currentData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#eee"
            vertical={false}
          />
          
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            stroke="#999"
            tick={{ fill: '#666', fontSize: 12 }}
          />
          
          <YAxis
            yAxisId="price"
            domain={['auto', 'auto']}
            stroke="#999"
            tick={{ fill: '#666', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          
          {showVolume && (
            <YAxis
              yAxisId="volume"
              orientation="right"
              stroke="#ccc"
              tick={{ fill: '#999', fontSize: 12 }}
            />
          )}
          
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              border: '1px solid #ddd',
              backdropFilter: 'blur(10px)',
              padding: '12px',
              borderRadius: '8px'
            }}
            labelFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          
          <Area
            yAxisId="price"
            type="monotone"
            dataKey="close"
            stroke="#3B82F6"
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
          
          {showVolume && (
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="rgba(0, 0, 0, 0.1)"
              radius={[4, 4, 0, 0]}
            />
          )}
          
          {showGlobalComparison && (
            <Line
              yAxisId="price"
              type="monotone"
              dataKey="marketIndex"
              stroke="#10B981"
              strokeWidth={1.5}
              dot={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-600">{symbol}</span>
        </div>
        {showGlobalComparison && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-sm text-gray-600">Market Index</span>
          </div>
        )}
        <button
          onClick={() => setShowVolume(!showVolume)}
          className={`flex items-center gap-2 text-sm ${
            showVolume ? 'text-gray-600' : 'text-gray-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          Volume
        </button>
      </div>
    </motion.div>
  );
};

export default MarketGraph;