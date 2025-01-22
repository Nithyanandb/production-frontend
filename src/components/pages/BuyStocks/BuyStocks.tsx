import React, { useState, useEffect, useMemo, startTransition } from 'react';
import { Search, ArrowUp, ArrowDown, Globe, DollarSign, Check } from 'lucide-react';
import BuyModal from './BuyModal';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header/Header';
import { StockDetail } from './StockDetail';
import LoadingSpinner from '../../ui/LoadingSpinner';
import emailjs from 'emailjs-com';
import useAuth from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { symbols } from '../AllStocks/symbols';
import { FixedSizeList as List } from 'react-window';
import Footer from '@/components/Footer/Footer';
import { finnhubApi, FinnhubQuote } from './finnhubApi';

const API_KEY = "ctksb2pr01qn6d7jeekgctksb2pr01qn6d7jeel0";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

// Check if stock data is valid
const isDataValid = (stock) => {
  return stock.price > 0; // Example: Ensure price is non-zero
};

// Fetch stock data for all symbols
const fetchAllStockData = async () => {
  const updated = await Promise.all(
    symbols.map(async (stock) => {
      const cacheKey = `stockData_${stock.symbol}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      const now = Date.now();

      if (cachedData && cacheTimestamp && now - Number(cacheTimestamp) < CACHE_DURATION) {
        const cachedStock = JSON.parse(cachedData);
        if (isDataValid(cachedStock)) {
          return cachedStock; // Use cached data if valid
        }
      }

      try {
        const quote = await finnhubApi.getQuote(stock.symbol);
        const updatedStockData = {
          ...stock,
          price: quote.c || 0,
          change: quote.d || 0,
          changePercent: quote.dp || 0,
          highPrice: quote.h || 0,
          lowPrice: quote.l || 0,
          openPrice: quote.o || 0,
          previousClose: quote.pc || 0,
        };

        if (isDataValid(updatedStockData)) {
          localStorage.setItem(cacheKey, JSON.stringify(updatedStockData));
          localStorage.setItem(`${cacheKey}_timestamp`, now.toString());
          return updatedStockData;
        } else {
          // Refetch if data is invalid
          const refetchedQuote = await finnhubApi.getQuote(stock.symbol);
          const refetchedStockData = {
            ...stock,
            price: refetchedQuote.c || 0,
            change: refetchedQuote.d || 0,
            changePercent: refetchedQuote.dp || 0,
            highPrice: refetchedQuote.h || 0,
            lowPrice: refetchedQuote.l || 0,
            openPrice: refetchedQuote.o || 0,
            previousClose: refetchedQuote.pc || 0,
          };

          if (isDataValid(refetchedStockData)) {
            localStorage.setItem(cacheKey, JSON.stringify(refetchedStockData));
            localStorage.setItem(`${cacheKey}_timestamp`, now.toString());
            return refetchedStockData;
          } else {
            console.error(`Invalid data for ${stock.symbol} after refetch`);
            return {
              ...stock,
              price: 0,
              change: 0,
              changePercent: 0,
              highPrice: 0,
              lowPrice: 0,
              openPrice: 0,
              previousClose: 0,
            };
          }
        }
      } catch (error) {
        console.error(`Failed to fetch data for ${stock.symbol}:`, error);
        return {
          ...stock,
          price: 0,
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

  return updated.filter(isDataValid); // Filter out invalid data
};

export const BuyStocks: React.FC = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = useState(symbols);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<typeof symbols[0] | null>(null);
  const [selectedStockDetail, setSelectedStockDetail] = useState<typeof symbols[0] | null>(null);
  const [stockDetailLoading, setStockDetailLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const location = useLocation();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch stock data on component mount and periodically
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const updatedStocks = await fetchAllStockData();
        setStocks(updatedStocks);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
        setError('Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  // Set selected stock from navigation state or symbol
  useEffect(() => {
    if (location.state?.selectedStock) {
      setSelectedStock(location.state.selectedStock);
      setSelectedStockDetail(location.state.selectedStock);
    } else if (location.state?.symbol) {
      const stockFromSymbol = stocks.find(stock => stock.symbol === location.state.symbol);
      if (stockFromSymbol) {
        setSelectedStock(stockFromSymbol);
        setSelectedStockDetail(stockFromSymbol);
      }
    }
  }, [location.state, stocks]);

  // Filter stocks based on debounced search term
  const filteredStocks = useMemo(() => {
    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm, stocks]);

  // Handle stock selection
  const handleStockSelect = async (stock: typeof symbols[0]) => {
    setStockDetailLoading(true);
    setSelectedStockDetail(stock);

    try {
      const detailedStock = { ...stock };
      setSelectedStockDetail(detailedStock);
    } catch (error) {
      console.error('Failed to load stock details:', error);
      setError('Failed to load stock details');
    } finally {
      setStockDetailLoading(false);
    }
  };

  // Handle successful transaction
  const handleTransactionSuccess = async (stock: typeof symbols[0], quantity: number, totalPrice: number) => {
    if (typeof totalPrice !== 'number' || isNaN(totalPrice)) {
      console.error('Invalid totalPrice:', totalPrice);
      return;
    }

    startTransition(() => {
      setShowSuccessPopup(true);
    });

    setTimeout(() => {
      startTransition(() => {
        setShowSuccessPopup(false);
      });
    }, 3000);

    if (user?.email) {
      try {
        const templateParams = {
          to_email: user.email,
          stock_symbol: stock.symbol,
          stock_name: stock.name,
          quantity: quantity,
          total_price: totalPrice.toFixed(2),
        };

        await emailjs.send(
          'service_box535f', // Replace with your EmailJS Service ID
          'template_l4fugpk', // Replace with your EmailJS Template ID
          templateParams
        );

        console.log('Email notification sent successfully!');
      } catch (error) {
        console.error('Failed to send email notification:', error);
      }
    } else {
      console.error('User email not found.');
      alert('User email not found. Please update your email in settings.');
    }
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const stock = filteredStocks[index];
    const isSelected = selectedStockDetail?.symbol === stock.symbol;

    if (stock.price === 0) {
      return (
        <motion.div
          style={{ ...style, marginBottom: '16px' }}
          className="p-4 w-98 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="text-right">
              <div className="h-4 w-16 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        style={{ ...style, marginBottom: '16px' }}
        layout
        className={`p-4 w-98 ${
          isSelected ? 'bg-gray-200 rounded' : 'bg-white hover:bg-gray-50'
        } transition-colors duration-200 cursor-pointer`}
        onClick={() => handleStockSelect(stock)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm text-black">{stock.symbol}</h3>
            <p className="text-xs text-gray-600">{stock.name}</p>
          </div>
          
          <motion.div
            animate={{
              color: (stock.change || 0) >= 0 ? '#16a34a' : '#dc2626',
            }}
            className="text-right"
          >
            <p className="font-medium text-sm text-black">₹{(stock.price || 0).toFixed(2)}</p>
            <p className="text-xs flex items-center gap-1">
              {(stock.change !== undefined) && (
                <>
                  {(stock.change >= 0) ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                  {Math.abs(stock.change).toFixed(2)}%
                </>
              )}
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full text-black">
        <Header />
        <div>
          <div className="mt-28 absolute flex z-20 px-8 justify-end w-full">
            {selectedStockDetail && (
              <button
                onClick={() => setIsBuyModalOpen(true)}
                className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-black/90 transition-all flex items-center gap-2"
              >
                <DollarSign size={16} />
                Buy {selectedStockDetail.symbol}
              </button>
            )}
          </div>
        </div>

        <div className="flex h-screen pt-20">
          <div className="w-98 bg-white border-r border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>

              <div className="space-y-4 overflow-y-auto w-[400px] hide-scrollbar">
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <List
                    height={600}
                    itemCount={filteredStocks.length}
                    itemSize={80}
                    width={400}
                  >
                    {Row}
                  </List>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 ">
            {stockDetailLoading ? (
              <LoadingSpinner />
            ) : selectedStockDetail ? (
              <StockDetail
                stock={selectedStockDetail}
                onBuyClick={setSelectedStock}
                loading={loading}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center max-w-md px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl shadow-lg mb-6">
                    <Globe size={28} className="text-white" />
                  </div>
                  <p className="text-lg text-gray-600 mb-6">Select a stock to view details.</p>
                  <p className="text-sm text-gray-500 mt-6">
                    Dive into real-time data, charts, and insights to make informed decisions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-black/50 backdrop-blur-sm fixed inset-0" />
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-200"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="bg-green-500/10 rounded-full p-3">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Success!</h2>
                  <p className="text-gray-600">
                    Transaction completed successfully! A notification has been sent to your email.
                  </p>
                  <button
                    onClick={() => setShowSuccessPopup(false)}
                    className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isBuyModalOpen && selectedStockDetail && (
            <BuyModal
              stock={selectedStockDetail}
              onClose={() => setIsBuyModalOpen(false)}
              onSuccess={(quantity, totalPrice) =>
                handleTransactionSuccess(selectedStockDetail, quantity, totalPrice)
              }
            />
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </ErrorBoundary>
  );
};

export default BuyStocks;