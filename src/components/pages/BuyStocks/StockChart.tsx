import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid
} from 'recharts';

interface StockChartProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
  };
  timeFrame: string;
  onTimeframeChange?: (timeframe: string) => void;
}

interface DataPoint {
  date: string;
  price: number;
}

const generateRandomWalk = (basePrice: number, steps: number, volatility: number = 0.002) => {
  let prices = [basePrice];
  for (let i = 1; i < steps; i++) {
    const change = prices[i - 1] * volatility * (Math.random() - 0.5);
    // Add trend bias based on stock's current trend
    const smoothedChange = change * 0.5 + (prices[i - 1] - (i > 1 ? prices[i - 2] : basePrice)) * 0.3;
    prices.push(prices[i - 1] + smoothedChange);
  }
  return prices;
};

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
      date.setMinutes(date.getMinutes() - (i * 5)); // 5-minute intervals
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
  onTimeframeChange 
}) => {
  const [stockData, setStockData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const updatePrice = useCallback(() => {
    if (stockData.length === 0) return;
    
    const lastPrice = stockData[stockData.length - 1].price;
    const volatility = 0.0001; // Very low volatility for smoother updates
    const trend = stock.changePercent / 100; // Use stock's trend for bias
    const change = lastPrice * volatility * (Math.random() - 0.5 + trend * 0.3);
    const newPrice = Number((lastPrice + change).toFixed(2));
    
    const newDataPoint = {
      date: new Date().toISOString(),
      price: newPrice
    };

    setStockData(prevData => {
      const newData = [...prevData.slice(1), newDataPoint];
      return newData;
    });
  }, [stockData, stock.changePercent]);

  useEffect(() => {
    setIsLoading(true);
    
    // Longer initial loading delay for Zerodha-like feel
    const loadDelay = setTimeout(() => {
      const initialData = generateInitialData(timeFrame, stock.price);
      setStockData(initialData);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(loadDelay);
  }, [timeFrame, stock.price]);

  useEffect(() => {
    if (isLoading || timeFrame !== '1D') return;

    // Slower updates (5-7 seconds) for more realistic market feel
    const interval = setInterval(() => {
      updatePrice();
    }, 5000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [isLoading, updatePrice, timeFrame]);

  const priceChange = stockData.length > 0 
    ? stockData[stockData.length - 1].price - stockData[0].price 
    : 0;

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="h-full flex items-center justify-center text-white/60">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            <span className="text-sm">Loading chart...</span>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="95%" height="100%">
          <AreaChart data={stockData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={priceChange >= 0 ? '#26a69a' : '#ef5350'} 
                  stopOpacity={0.08}
                />
                <stop 
                  offset="95%" 
                  stopColor={priceChange >= 0 ? '#26a69a' : '#ef5350'} 
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.05)"
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
              stroke="#363636"
              tick={{ fill: '#9b9b9b', fontSize: 11 }}
              axisLine={{ stroke: '#363636' }}
              tickLine={{ stroke: '#363636' }}
            />
            
            <YAxis
              domain={['auto', 'auto']}
              stroke="#363636"
              tick={{ fill: '#9b9b9b', fontSize: 11 }}
              tickFormatter={(value) => `₹${value.toFixed(2)}`}
              axisLine={{ stroke: '#363636' }}
              tickLine={{ stroke: '#363636' }}
              tickCount={6}
              width={65}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: '#1c1c1c',
                border: '1px solid #363636',
                borderRadius: '4px',
                padding: '8px 12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              labelStyle={{ color: '#9b9b9b', marginBottom: '4px' }}
              itemStyle={{ color: '#f8f8f8', padding: '2px 0' }}
              labelFormatter={(date) => {
                const d = new Date(date);
                return d.toLocaleString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  day: 'numeric',
                  month: 'short'
                });
              }}
              formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price']}
            />
            
            <Area
              type="monotone"
              dataKey="price"
              stroke={priceChange >= 0 ? '#26a69a' : '#ef5350'}
              strokeWidth={1.5}
              fill="url(#colorPrice)"
              animationDuration={750}
              dot={false}
              activeDot={{
                r: 4,
                fill: priceChange >= 0 ? '#26a69a' : '#ef5350',
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