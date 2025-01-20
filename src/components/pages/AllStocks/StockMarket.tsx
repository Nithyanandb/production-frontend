import React, { useState, useEffect, useRef } from 'react';
import { Clock, LineChart } from 'lucide-react';
import { SegmentSelector } from './SegmentSelector';
import { HoldingsTable } from './HoldingsTable';
import Header from '@/components/Header/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { symbols } from './symbols';

const segments = ['ALL', 'TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'ENERGY', 'CONSUMER'];
const API_KEY = "ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g"; // Replace with your API key

const StockMarket: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('ALL');
  const [trades, setTrades] = useState<Array<{ symbol: string; price: number; timestamp: number; volume: number }>>([]);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // Function to establish WebSocket connection
  const connectWebSocket = () => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

    socket.addEventListener('open', () => {
      console.log('WebSocket connection opened');
      setError(null);

      // Subscribe to predefined symbols
      const symbolsToSubscribe = ['AAPL', 'BINANCE:BTCUSDT', 'IC MARKETS:1'];
      symbolsToSubscribe.forEach((symbol) => {
        socket.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    });

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      // Handle trade messages
      if (message.type === 'trade') {
        const newTrades = message.data.map((trade: any) => ({
          symbol: trade.s,
          price: trade.p,
          timestamp: trade.t,
          volume: trade.v,
        }));

        // Filter out duplicate trades based on timestamp and symbol
        setTrades((prevTrades) => {
          const uniqueTrades = newTrades.filter(
            (newTrade: any) =>
              !prevTrades.some(
                (prevTrade) =>
                  prevTrade.symbol === newTrade.symbol && prevTrade.timestamp === newTrade.timestamp
              )
          );

          // Combine new unique trades with previous trades and limit to 5
          const updatedTrades = [...prevTrades, ...uniqueTrades].slice(-5);
          return updatedTrades;
        });
      }
    });

    socket.addEventListener('error', (event) => {
      console.error('WebSocket error:', event);
      setError('WebSocket error. Please refresh the page.');
    });

 

    socketRef.current = socket;
  };

  // Initialize WebSocket connection on component mount
  useEffect(() => {
    connectWebSocket();

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />

      <div className="flex h-screen pt-20">
  {/* Sidebar for Trades */}
<div className="p-4 ml-2 overflow-y-auto w-[400px] h-full border-r border-gray-200 bg-white">
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
     Trades - Last Price Updates
    </h2>
    {error ? (
      <div className="flex justify-center items-center py-4">
        <span className="text-red-500">{error}</span>
      </div>
    ) : (
      <div className="space-y-3 mt-8">
        {trades.length > 0 ? (
          trades.map((trade, index) => (
            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-900">{trade.symbol}</span>
                  <span className="text-xs text-gray-500">{trade.symbol.toUpperCase()}</span>
                </div>
                <span className="text-sm text-gray-900">${trade.price.toLocaleString()}</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Volume:</span>
                  <span className="text-gray-900">{trade.volume.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Time:</span>
                  <span className="text-gray-900">{new Date(trade.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">No trades available yet.</p>
        )}
      </div>
    )}
  </div>
</div>
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-8 py-12">
            {/* Header */}
            <div className="flex flex-col gap-6 mb-12">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-black">Market Holdings</h1>
                <div className="flex items-center gap-4">
                  <Clock size={20} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Market {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Segment Selector */}
            <SegmentSelector
              segments={segments}
              selectedSegment={selectedSegment}
              onSegmentChange={setSelectedSegment}
            />

            {/* Holdings Table */}
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {symbols && (
                  <HoldingsTable
                    holdings={symbols}
                    onStockSelect={() => {}}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMarket;