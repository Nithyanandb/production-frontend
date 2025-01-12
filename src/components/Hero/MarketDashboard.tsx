import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  RefreshCw,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart2,
  PieChart,
  ChevronRight,
  Clock,
  Activity,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchMarketData } from '../Service/marketApi';
import { MarketData } from '../types/markets';
import { Bitcoin, Coins, Circle, ArrowUp, ArrowDown } from 'lucide-react';
import { SiEthereum } from 'react-icons/si'; // Correct import for Ethereum icon

const MarketDashboard: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [isLoading, setLoading] = useState(true);

  const { isRefetching, refetch } = useQuery({
    queryKey: ['marketData'],
    queryFn: fetchMarketData,
    enabled: true,
    onSettled: (data: MarketData[] | undefined) => {
      if (data) {
        setMarketData(data);
      }
      setLoading(false);
    },
  });

  // Market Status
  const marketStatus = {
    isOpen: true,
    nextOpen: '2024-03-19 09:30:00',
    lastUpdate: '2 min ago',
  };

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  // Indices Data
  const indices = [
    { name: 'Dow Jones', value: '42,738.63', change: '+346.36 (0.82%)' },
    { name: 'Nasdaq', value: '19,619.17', change: '+338.38 (1.75%)' },
    { name: 'S&P 500', value: '5,942.47', change: '+73.92 (1.26%)' },
  ];

  // Sort indices by name
  const sortedIndices = indices.sort((a, b) => a.name.localeCompare(b.name));

  // Key Indicators Data
  const keyIndicators = [
    { name: 'Crude Oil', ltp: '70.26', change: '0.64', changePercent: '0.92%', icon: <Activity className="w-4 h-4" /> },
    { name: 'Gold', ltp: '2,620.56', change: '-12.49', changePercent: '-0.47%', icon: <DollarSign className="w-4 h-4" /> },
    { name: 'Brent Crude', ltp: '73.81', change: '0.55', changePercent: '0.75%', icon: <Activity className="w-4 h-4" /> },
    { name: 'DXY', ltp: '108.92', change: '-0.37', changePercent: '-0.33%', icon: <BarChart2 className="w-4 h-4" /> },
    { name: 'US 10Y', ltp: '4.600', change: '0.03', changePercent: '0.74%', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'YEN', ltp: '157.273', change: '-0.23', changePercent: '-0.14%', icon: <PieChart className="w-4 h-4" /> },
    { name: 'EURO', ltp: '1.031', change: '0.00', changePercent: '0.42%', icon: <PieChart className="w-4 h-4" /> },
  ];

  const cryptocurrencies = [
    {
      icon: <Bitcoin className="w-5 h-5" />, // Bitcoin icon
      name: "Bitcoin",
      symbol: "btc",
      price: 50000,
      change24h: "+2.5%",
      volume24h: 30000000000,
      marketCap: 950000000000,
      sparkline: "https://example.com/sparkline-bitcoin.png",
      trendIcon: <TrendingUp className="w-4 h-4 text-green-400" />,
    },
    {
      icon: <SiEthereum className="w-5 h-5" />, // Ethereum icon
      name: "Ethereum",
      symbol: "eth",
      price: 4000,
      change24h: "-1.2%",
      volume24h: 20000000000,
      marketCap: 450000000000,
      sparkline: "https://example.com/sparkline-ethereum.png",
      trendIcon: <TrendingDown className="w-4 h-4 text-rose-400" />,
    },
    // Add more cryptocurrencies here
  ];

  return (
    <div className="-ml-[20px] flex min-h-screen text-white">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Indices Table */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <BarChart2 className="w-5 h-5" /> Indices
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Value</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody>
                {sortedIndices.map((index, i) => (
                  <tr key={i} className="hover:bg-white/[0.05] transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      {index.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-white">{index.value}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">{index.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Indicators Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5" /> Key Indicators
            </h2>
          </div>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-2 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">LTP</th>
                  <th className="px-2 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Change</th>
                  <th className="px-2 py-2 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Change %</th>
                </tr>
              </thead>
              <tbody>
                {keyIndicators.map((indicator, i) => (
                  <tr key={i} className="hover:bg-white/[0.05] transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white flex items-center gap-2">
                      {indicator.icon}
                      {indicator.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{indicator.ltp}</td>
                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${
                      indicator.change.startsWith('-') ? 'text-rose-400' : 'text-green-400'
                    }`}>
                      {indicator.change}
                    </td>
                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${
                      indicator.changePercent.startsWith('-') ? 'text-rose-400' : 'text-green-400'
                    }`}>
                      <span>{indicator.changePercent}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="sm:hidden">
            <div className="grid grid-cols-2 gap-2">
              {keyIndicators.map((indicator, i) => (
                <div key={i} className="p-4 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white flex items-center gap-2">
                      {indicator.icon}
                      {indicator.name}
                    </span>
                    <span className="text-sm text-white">{indicator.ltp}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-sm ${
                      indicator.change.startsWith('-') ? 'text-rose-400' : 'text-green-400'
                    }`}>
                      {indicator.change}
                    </span>
                    <span className={`text-sm ${
                      indicator.changePercent.startsWith('-') ? 'text-rose-400' : 'text-green-400'
                    }`}>
                      {indicator.changePercent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cryptocurrency Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <LineChart className="w-5 h-5" /> Top Cryptocurrencies
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">#</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">24h Volume</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Market Cap</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Last 7 Days</th>
                </tr>
              </thead>
              <tbody>
                {cryptocurrencies.map((crypto, index) => (
                  <tr key={index} className="hover:bg-white/[0.05] transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{index + 1}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      <div className="flex items-center">
                        {crypto.icon}
                        <span>{crypto.name}</span>
                        <span className="text-gray-400 ml-2">{crypto.symbol.toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">${crypto.price.toLocaleString()}</td>
                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${
                      crypto.change24h.startsWith('-') ? 'text-rose-400' : 'text-green-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        {crypto.trendIcon}
                        {crypto.change24h}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">${crypto.volume24h.toLocaleString()}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">${crypto.marketCap.toLocaleString()}</td>
                 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;