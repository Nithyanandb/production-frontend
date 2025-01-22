import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { finnhubApi } from './finnhubApi'; // Import the API utility

interface StockChartProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
  };
  timeFrame: string;
  currentPrice: number;
  onTimeframeChange?: (timeframe: string) => void;
}

interface DataPoint {
  date: string;
  price: number;
}

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;

// Generate random walk data for initial chart rendering
const generateRandomWalk = (basePrice: number, steps: number, volatility: number = 0.002) => {
  let prices = [basePrice];
  for (let i = 1; i < steps; i++) {
    const change = prices[i - 1] * volatility * (Math.random() - 0.5);
    const smoothedChange = change * 0.5 + (prices[i - 1] - (i > 1 ? prices[i - 2] : basePrice)) * 0.3;
    prices.push(prices[i - 1] + smoothedChange);
  }
  return prices;
};

// Generate initial data for the chart
const generateInitialData = (timeframe: string, basePrice: number = 100) => {
  const dataPoints: DataPoint[] = [];
  const periods = {
    '1D': 78,    // 5-minute intervals for a trading day
    '1W': 168,   // Hourly for a week
    '1M': 30,    // Daily for a month
    '3M': 90,    // Daily for 3 months
    '1Y': 252,   // Trading days in a year
    'ALL': 1260  // 5 years of trading days
  }[timeframe] || 78;

  const prices = generateRandomWalk(basePrice, periods);
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

    dataPoints.unshift({
      date: date.toISOString(),
      price: Number(prices[i].toFixed(2))
    });
  }

  return dataPoints;
};

export const StockChart: React.FC<StockChartProps> = ({ 
  stock, 
  timeFrame,
  currentPrice,
  change,
  onTimeframeChange 
}) => {
  const [stockData, setStockData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch historical data with caching
  const fetchHistoricalData = useCallback(async () => {
    const cacheKey = `historical_${stock.symbol}_${timeFrame}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
    const now = Date.now();

    if (cachedData && cacheTimestamp && now - Number(cacheTimestamp) < CACHE_DURATION) {
      setStockData(JSON.parse(cachedData));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Fetch historical data using finnhubApi (if available)
      const data = generateInitialData(timeFrame, currentPrice); // Use random data for now
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(`${cacheKey}_timestamp`, now.toString());
      setStockData(data);
    } catch (error) {
      console.error('Failed to fetch historical data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [stock.symbol, timeFrame, currentPrice]);

  // Fetch historical data on component mount or when timeFrame changes
  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  // Update price for real-time data (only for 1D timeFrame)
  const updatePrice = useCallback(() => {
    if (stockData.length === 0 || timeFrame !== '1D') return;

    const lastPrice = stockData[stockData.length - 1].price;
    const volatility = 0.0001;
    const trend = stock.changePercent / 100;
    const change = lastPrice * volatility * (Math.random() - 0.5 + trend * 0.3);
    const newPrice = Number((lastPrice + change).toFixed(2));

    const newDataPoint = {
      date: new Date().toISOString(),
      price: newPrice
    };

    setStockData((prevData) => {
      const newData = [...prevData.slice(1), newDataPoint];
      return newData;
    });
  }, [stockData, stock.changePercent, timeFrame]);

  // Set up a timer to update prices for 1D timeFrame
  useEffect(() => {
    if (isLoading || timeFrame !== '1D') return;

    const interval = setInterval(() => {
      updatePrice();
    }, 5000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isLoading, updatePrice, timeFrame]);

  const priceChange = stockData.length > 0 
    ? stockData[stockData.length - 1].price - stockData[0].price 
    : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const price = payload[0].value;

      return (
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-lg p-4 shadow-xl">
          <p className="text-gray-600 text-sm mb-1">
            {timeFrame === '1D' 
              ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
          </p>
          <p className="text-black text-lg font-medium">
            ₹{price.toFixed(2)} {/* Display price in rupees */}
          </p>
          <p className="text-xs flex items-center gap-1">
            {(stock.change !== undefined) && (
              <>
                {(stock.change >= 0) ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {Math.abs(stock.change).toFixed(2)}%
              </>
            )}
          </p>
        </div>
      );
    }
    return null;
  };

  // Get the latest price from stockData
  const latestPrice = stockData.length > 0 ? stockData[stockData.length - 1].price : currentPrice;

  return (
    <div className="h-full relative bg-white">
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-gray-200 border-t-gray-400 rounded-full"
            />
            <span className="text-gray-400 text-sm font-medium">Loading chart...</span>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="95%" height="100%">
          <AreaChart 
            data={stockData}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="0%" 
                  stopColor={priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'} 
                  stopOpacity={0.2}
                />
                <stop 
                  offset="99%" 
                  stopColor={priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'} 
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(0,0,0,0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                const d = new Date(date);
                if (timeFrame === '1D') {
                  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }
                return d.toLocaleDateString([], { day: 'numeric', month: 'short' });
              }}
              stroke="rgba(0,0,0,0.1)"
              tick={{ fill: 'rgba(0,0,0,0.6)', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={{ stroke: 'rgba(0,0,0,0.1)' }}
            />

            <YAxis
              domain={['auto', 'auto']}
              stroke="rgba(0,0,0,0.1)"
              tick={{ fill: 'rgba(0,0,0,0.6)', fontSize: 11 }}
              tickFormatter={(value) => `₹${value.toFixed(2)}`} 
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickCount={6}
              width={65}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: 'rgba(0,0,0,0.1)',
                strokeWidth: 1,
                strokeDasharray: '4 4'
              }}
            />

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
      )}

    
    </div>
  );
};

export default StockChart;