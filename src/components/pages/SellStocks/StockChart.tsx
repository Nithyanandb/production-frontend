import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid
} from 'recharts';

interface StockChartProps {
  symbol: string;
  onTimeframeChange?: (timeframe: string) => void;
  basePrice?: number;
}

interface StockDataPoint {
  date: string;
  price: number;
}

const generateRandomPrice = (basePrice: number, volatility: number = 0.005): number => {
  const change = basePrice * volatility * (Math.random() - 0.5);
  return basePrice + change;
};

const generateStockData = (timeframe: string, basePrice: number = 100): StockDataPoint[] => {
  const dataPoints: StockDataPoint[] = [];
  const periods = {
    '1D': 78,    // 5-minute intervals for a trading day
    '1W': 168,   // Hourly for a week
    '1M': 30,    // Daily for a month
    '3M': 90,    // Daily for 3 months
    '1Y': 252,   // Trading days in a year
    'ALL': 1260  // 5 years of trading days
  }[timeframe] || 78;

  let currentPrice = basePrice;
  const now = new Date();

  for (let i = 0; i < periods; i++) {
    const date = new Date(now);
    if (timeframe === '1D') {
      date.setMinutes(date.getMinutes() - (i * 5));
    } else if (timeframe === '1W') {
      date.setHours(date.getHours() - i);
    } else {
      date.setDate(date.getDate() - i);
    }

    currentPrice = generateRandomPrice(currentPrice);
    dataPoints.unshift({
      date: date.toISOString(),
      price: Number(currentPrice.toFixed(2))
    });
  }

  return dataPoints;
};

export const StockChart: React.FC<StockChartProps> = ({ 
  symbol, 
  onTimeframeChange,
  basePrice: initialBasePrice = 100
}) => {
  const [timeframe, setTimeframe] = useState('1D');
  const [stockData, setStockData] = useState<StockDataPoint[]>([]);
  const [hoveredData, setHoveredData] = useState<StockDataPoint | null>(null);

  const basePrice = {
    'AAPL': 150,
    'MSFT': 380,
    'GOOGL': 140,
    'TSLA': 250,
    'NVDA': 800
  }[symbol] || initialBasePrice;

  useEffect(() => {
    const data = generateStockData(timeframe, basePrice);
    setStockData(data);

    // Live updates for 1D timeframe
    if (timeframe === '1D') {
      const interval = setInterval(() => {
        const lastPrice = data[data.length - 1].price;
        const newPrice = generateRandomPrice(lastPrice, 0.001);
        const newData = [...data.slice(1), {
          date: new Date().toISOString(),
          price: newPrice
        }];
        setStockData(newData);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [timeframe, basePrice]);

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    onTimeframeChange?.(tf);
  };

  const priceChange = stockData.length > 0 ? stockData[stockData.length - 1].price - stockData[0].price : 0;
  const priceChangePercent = stockData.length > 0 ? ((priceChange / stockData[0].price) * 100).toFixed(2) : '0.00';

  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const price = payload[0].value;
      
      return (
        <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-xl">
          <p className="text-white/60 text-sm mb-1">
            {timeframe === '1D' 
              ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </p>
          <p className="text-white text-lg font-medium">
            ₹{price.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      key={symbol}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-full bg-black/40 backdrop-blur-xl rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-light text-white">{symbol}</h3>
          <div className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'} font-light`}>
            {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
          </div>
        </div>
        
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => handleTimeframeChange(tf)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                timeframe === tf 
                  ? 'bg-white text-black font-medium' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart 
          data={stockData}
          onMouseMove={(data: any) => {
            if (data.activePayload) {
              setHoveredData(data.activePayload[0].payload);
            }
          }}
          onMouseLeave={() => setHoveredData(null)}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="5%" 
                stopColor={priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'} 
                stopOpacity={0.2}
              />
              <stop 
                offset="95%" 
                stopColor={priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'} 
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.03)"
            vertical={false}
          />
          
          <XAxis
            dataKey="date"
            tickFormatter={(date) => {
              const d = new Date(date);
              if (timeframe === '1D') {
                return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              }
              return d.toLocaleDateString([], { day: 'numeric', month: 'short' });
            }}
            stroke="rgba(255,255,255,0.1)"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          
          <YAxis
            domain={['auto', 'auto']}
            stroke="rgba(255,255,255,0.1)"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            tickFormatter={(value) => `₹${value.toFixed(2)}`}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            width={65}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Area
            type="monotone"
            dataKey="price"
            stroke={priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'}
            strokeWidth={1.5}
            fill="url(#colorPrice)"
            animationDuration={750}
            dot={false}
            activeDot={{
              r: 4,
              fill: priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
              stroke: '#fff',
              strokeWidth: 1
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {hoveredData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg p-4"
        >
          <p className="text-white/60 text-sm">Current Price</p>
          <p className="text-white text-2xl font-medium">
            ₹{hoveredData.price.toFixed(2)}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StockChart;