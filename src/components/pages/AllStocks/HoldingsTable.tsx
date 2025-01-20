import React, { useEffect, useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { motion, AnimatePresence } from 'framer-motion'; // For smooth animations

interface StockHolding {
  symbol: string;
  quantity: number;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  highPrice?: number;
  lowPrice?: number;
  openPrice?: number;
  previousClose?: number;
  name?: string;
}

interface HoldingsTableProps {
  holdings: StockHolding[];
  onStockSelect: (stock: StockHolding) => void; // Callback for stock selection
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings, onStockSelect }) => {
  const [updatedHoldings, setUpdatedHoldings] = useState<StockHolding[]>(holdings);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const API_KEY = 'ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g'; // Replace with your Finnhub API key
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const updated = await Promise.all(
          holdings.map(async (holding) => {
            try {
              const quoteResponse = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${holding.symbol}&token=${API_KEY}`
              );
              const quoteData = await quoteResponse.json();

              // If the API returns no data, generate fallback values
              if (!quoteData || !quoteData.c) {
                return {
                  ...holding,
                  currentPrice: 0, // Fallback value
                  change: 0,
                  changePercent: 0,
                  highPrice: 0,
                  lowPrice: 0,
                  openPrice: 0,
                  previousClose: 0,
                };
              }

              return {
                ...holding,
                currentPrice: quoteData.c,
                change: quoteData.d,
                changePercent: quoteData.dp,
                highPrice: quoteData.h,
                lowPrice: quoteData.l,
                openPrice: quoteData.o,
                previousClose: quoteData.pc,
              };
            } catch (err) {
              // If the API call fails, return fallback values for this holding
              console.error(`Failed to fetch data for ${holding.symbol}:`, err);
              return {
                ...holding,
                currentPrice: 0, // Fallback value
                change: 0,
                changePercent: 0,
                highPrice: 0,
                lowPrice: 0,
                openPrice: 0,
                previousClose: 0,
              };
            }
          })
        );
        setUpdatedHoldings(updated);
      } catch (err) {
        setError('Failed to fetch stock data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (holdings.length > 0) {
      fetchStockData();
    }
  }, [holdings]);

  const filteredHoldings = updatedHoldings.filter(
    (holding) =>
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (holding.name && holding.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleStockSelect = (stock: StockHolding) => {
    onStockSelect(stock); // Call the parent callback if needed
    navigate('/stock/buy', { state: { selectedStock: stock } }); // Navigate to /stock/buy with the selected stock
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  if (!updatedHoldings || updatedHoldings.length === 0) {
    return <div className="text-center py-4 text-gray-600">No holdings available.</div>;
  }

  return (
    <div className="overflow-x-auto custom-scrollbar">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search holdings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-100 border border-gray-300 rounded-2xl pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      {/* Holdings Table */}
      <table className="min-w-full bg-white text-black">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Current Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Change</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Change %</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">High Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Low Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Open Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Previous Close</th>
          </tr>
        </thead>
        <tbody>
          {filteredHoldings.map((holding) => (
            <motion.tr
              key={holding.symbol}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleStockSelect(holding)} // Trigger the callback with the selected stock
             
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <td className="px-6 py-4 font-medium">{holding.symbol}</td>
              <td className="px-6 py-4 text-gray-700">{holding.name ?? 'N/A'}</td>
              <td className="px-6 py-4">{holding.quantity}</td>
              <td className="px-6 py-4">₹{holding.currentPrice?.toFixed(2) ?? '0.00'}</td>
              <td className={`px-6 py-4 ${(holding.change ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${holding.change?.toFixed(2) ?? '0.00'}
              </td>
              <td className={`px-6 py-4 ${(holding.changePercent ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {holding.changePercent?.toFixed(2) ?? '0.00'}%
              </td>
              <td className="px-6 py-4">₹{holding.highPrice?.toFixed(2) ?? '0.00'}</td>
              <td className="px-6 py-4">₹{holding.lowPrice?.toFixed(2) ?? '0.00'}</td>
              <td className="px-6 py-4">₹{holding.openPrice?.toFixed(2) ?? '0.00'}</td>
              <td className="px-6 py-4">₹{holding.previousClose?.toFixed(2) ?? '0.00'}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};