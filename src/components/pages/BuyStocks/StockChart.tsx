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
  onTimeframeChange 
}) => {
  const [stockData, setStockData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredData, setHoveredData] = useState<DataPoint | null>(null);
  
  const updatePrice = useCallback(() => {
    if (stockData.length === 0) return;
    
    const lastPrice = stockData[stockData.length - 1].price;
    const volatility = 0.0001;
    const trend = stock.changePercent / 100;
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
    
    const loadDelay = setTimeout(() => {
      const initialData = generateInitialData(timeFrame, stock.price);
      setStockData(initialData);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(loadDelay);
  }, [timeFrame, stock.price]);

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
            ${price.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

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
              tickFormatter={(value) => `$${value.toFixed(2)}`}
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

      {/* Floating Price Display */}
      {hoveredData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-lg p-4"
        >
          <p className="text-gray-600 text-sm">Current Price</p>
          <p className="text-black text-2xl font-medium">
            ${hoveredData.price.toFixed(2)}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StockChart;