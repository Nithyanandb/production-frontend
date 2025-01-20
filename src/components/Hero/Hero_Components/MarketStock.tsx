import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface StockData {
  name?: string;
  company?: string;
  index?: string;
  price: string;
  change: string;
  percentGain?: string;
  percentLoss?: string;
  percentChange?: string;
  value?: string;
  chartData?: number[];
  icon?: JSX.Element;
  symbol?: string;
  marketCap?: number;
  volume?: number;
  trendIcon?: JSX.Element;
}

interface MarketStockProps {
  title: string;
  data: StockData[];
}

const MarketStock: React.FC<MarketStockProps> = ({ title, data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const controls = useAnimation();

  // Function to handle auto-scroll with motion animation
  useEffect(() => {
    if (!autoScroll || !containerRef.current) return;

    const containerWidth = containerRef.current.scrollWidth;
    const duration = containerWidth / 50; // Adjust speed by changing the divisor

    controls.start({
      x: -containerWidth,
      transition: {
        duration: duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [autoScroll, controls]);

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
      <div className="relative">
        <div
          className="overflow-x-hidden hide-scrollbar"
          ref={containerRef}
          onMouseEnter={() => {
            setAutoScroll(false);
            controls.stop(); // Pause animation on hover
          }}
          onMouseLeave={() => {
            setAutoScroll(true);
            // Restart the animation with the same definition
            const containerWidth = containerRef.current?.scrollWidth || 0;
            const duration = containerWidth / 100;
            controls.start({
              x: -containerWidth,
              transition: {
                duration: duration,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
              },
            });
          }}
        >
          <motion.div
            className="flex gap-4"
            animate={controls}
            style={{ width: 'max-content' }}
          >
            {/* Duplicate the data to create a seamless loop */}
            {[...data, ...data].map((item, index) => (
              <div
                key={index}
                className="stock-card w-[400px] h-[150px] flex-shrink-0 p-4 bg-white rounded-lg transition-all duration-300 flex flex-col items-start gap-2 cursor-pointer hover:shadow-lg"
                style={{ borderBottom: 'none' }}
              >
                {/* Name and Change in a single row */}
                <div className="flex items-center gap-2">
                  {item.icon && <span>{item.icon}</span>}
                  <p className="text-xs text-gray-900 truncate">
                    {item.name || item.company || item.index}
                  </p>
                  <p
                    className={`text-xs ${
                      item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.change}{' '}
                    {item.percentGain && `(${item.percentGain})`}
                    {item.percentLoss && `(${item.percentLoss})`}
                    {item.value && `(${item.value})`}
                  </p>
                </div>
                {/* Price in a separate row */}
                <p className="text-xs font-medium text-gray-900 truncate">{item.price}</p>
                {/* Additional Details */}
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{item.marketCap?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Volume:</span>
                    <span className="text-gray-900">₹{item.volume?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={item.change.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {item.trendIcon} {item.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarketStock;