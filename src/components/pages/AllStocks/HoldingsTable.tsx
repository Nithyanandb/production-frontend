import React, { useEffect, useState, startTransition } from 'react';
import { Search } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { symbols } from './symbols'; // Import the symbols array

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
  onStockSelect: (stock: StockHolding) => void;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({ holdings, onStockSelect }) => {
  const [updatedHoldings, setUpdatedHoldings] = useState<StockHolding[]>(holdings);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const API_KEY = 'ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g'; // Replace with your Finnhub API key
  const navigate = useNavigate();

  // Cache duration in milliseconds (30 minutes)
  const CACHE_DURATION = 30 * 60 * 1000;

  // Fetch stock data for all holdings at once
  useEffect(() => {
    const fetchAllStockData = async () => {
      setLoading(true);
      try {
        const updated = await Promise.all(
          holdings.map(async (holding) => {
            // Check if data is already cached and not expired
            const cachedData = localStorage.getItem(`stockData_${holding.symbol}`);
            const cacheTimestamp = localStorage.getItem(`cacheTimestamp_${holding.symbol}`);
            const now = Date.now();

            if (cachedData && cacheTimestamp && now - Number(cacheTimestamp) < CACHE_DURATION) {
              return JSON.parse(cachedData); // Use cached data if it's still valid
            }

            try {
              const quoteResponse = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${holding.symbol}&token=${API_KEY}`
              );
              const quoteData = await quoteResponse.json();

              if (!quoteData || !quoteData.c) {
                return {
                  ...holding,
                  currentPrice: 0,
                  change: 0,
                  changePercent: 0,
                  highPrice: 0,
                  lowPrice: 0,
                  openPrice: 0,
                  previousClose: 0,
                };
              }

              const updatedHolding = {
                ...holding,
                currentPrice: quoteData.c,
                change: quoteData.d,
                changePercent: quoteData.dp,
                highPrice: quoteData.h,
                lowPrice: quoteData.l,
                openPrice: quoteData.o,
                previousClose: quoteData.pc,
              };

              // Cache the fetched data with a timestamp
              localStorage.setItem(`stockData_${holding.symbol}`, JSON.stringify(updatedHolding));
              localStorage.setItem(`cacheTimestamp_${holding.symbol}`, now.toString());

              return updatedHolding;
            } catch (err) {
              console.error(`Failed to fetch data for ${holding.symbol}:`, err);
              return {
                ...holding,
                currentPrice: 0,
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

        startTransition(() => {
          setUpdatedHoldings(updated);
        });
      } catch (err) {
        startTransition(() => {
          setError('Failed to fetch stock data. Please try again later.');
        });
      } finally {
        startTransition(() => {
          setLoading(false);
        });
      }
    };

    if (holdings.length > 0) {
      fetchAllStockData();
    }
  }, [holdings]);

  // Filter holdings based on search term
  const filteredHoldings = updatedHoldings.filter(
    (holding) =>
      holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (holding.name && holding.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Paginate filtered holdings
  const paginatedHoldings = filteredHoldings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStockSelect = (stock: StockHolding) => {
    onStockSelect(stock);
    navigate('/stock/buy', { state: { selectedStock: stock } });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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
    <div className="overflow-x-auto w-full custom-scrollbar">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search holdings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[500px] bg-white rounded-xl pl-12 pr-4 py-3 text-black"
        />
      </div>

      {/* Holdings Table */}
      <table className="min-w-full bg-white text-black">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Symbol</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Current Price</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Change</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Change %</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">High Price</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Low Price</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Open Price</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Previous Close</th>
          </tr>
        </thead>
        <tbody>
          {paginatedHoldings.map((holding) => (
            <motion.tr
              key={holding.symbol}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleStockSelect(holding)}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <td className="px-5 py-4 font-medium">{holding.symbol}</td>
              <td className="px-5 py-4 text-gray-700">{holding.name ?? 'N/A'}</td>
              <td className="px-5 py-4">{holding.quantity}</td>
              <td className="px-5 py-4">₹{holding.currentPrice?.toFixed(2) ?? '0.00'}</td>
              <td className={`px-5 py-4 ${(holding.change ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${holding.change?.toFixed(2) ?? '0.00'}
              </td>
              <td className={`px-5 py-4 ${(holding.changePercent ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {holding.changePercent?.toFixed(2) ?? '0.00'}%
              </td>
              <td className="px-5 py-4">₹{holding.highPrice?.toFixed(2) ?? '0.00'}</td>
              <td className="px-5 py-4">₹{holding.lowPrice?.toFixed(2) ?? '0.00'}</td>
              <td className="px-5 py-4">₹{holding.openPrice?.toFixed(2) ?? '0.00'}</td>
              <td className="px-5 py-4">₹{holding.previousClose?.toFixed(2) ?? '0.00'}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredHoldings.length}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};