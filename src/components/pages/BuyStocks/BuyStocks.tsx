import React, { useState, useEffect, useMemo } from 'react';
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

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const BuyStocks: React.FC = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = useState(symbols);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<typeof symbols[0] | null>(null);
  const [selectedStockDetail, setSelectedStockDetail] = useState<typeof symbols[0] | null>(null);
  const [priceChanges, setPriceChanges] = useState<Record<string, number>>({});
  const [stockDetailLoading, setStockDetailLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false); // State for BuyModal visibility
  const [email, setEmail] = useState(user?.email || '');
  const location = useLocation();

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Set user email on component mount or when user changes
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
  }, [user]);

  // Handle selected stock from navigation state
  useEffect(() => {
    if (location.state?.selectedStock) {
      setSelectedStock(location.state.selectedStock);
      setSelectedStockDetail(location.state.selectedStock);
    }
  }, [location.state]);

  // Initialize EmailJS
  useEffect(() => {
    try {
      emailjs.init('eyK87ZsxW822cQvyN'); // Replace with your EmailJS User ID
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }, []);

  // Simulate loading stocks
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setStocks(symbols);
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const change = (Math.random() - 0.5) * 2;
          const newPrice = (stock.price || 100) + change;

          setPriceChanges((prev) => ({
            ...prev,
            [stock.symbol]: change,
          }));

          return {
            ...stock,
            price: newPrice,
            change,
            changePercent: (change / (stock.price || 100)) * 100,
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

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

    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
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

  // Filter stocks based on debounced search term
  const filteredStocks = useMemo(() => {
    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm, stocks]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const stock = filteredStocks[index];
    const isSelected = selectedStockDetail?.symbol === stock.symbol;
  
    return (
      <motion.div
        style={{ ...style, marginBottom: '16px'}} // Add margin-bottom for spacing
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
              color: (stock.changePercent || 0) >= 0
                ? '#16a34a' // Green for positive change
                : '#dc2626', // Red for negative change
            }}
            className="text-right"
          >
            <p className="font-medium text-sm text-black">₹{(stock.price || 0).toFixed(2)}</p>
            <p className="text-xs flex items-center gap-1">
              {(stock.changePercent !== undefined) && (
                <>
                  {(stock.changePercent >= 0) ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                  {Math.abs(stock.changePercent).toFixed(2)}%
                </>
              )}
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen w-full  text-black">
      <Header />
      <div>
        <div className="mt-28 absolute flex z-20 px-8 justify-end w-full">
          {selectedStockDetail && (
            <button
              onClick={() => setIsBuyModalOpen(true)} // Open BuyModal on click
              className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-black/90 transition-all flex items-center gap-2"
            >
              <DollarSign size={16} />
              Buy {selectedStockDetail.symbol}
            </button>
          )}
        </div>
      </div>

      <div className="flex h-screen pt-20">
        <div className="w-98 bg-white border-r  border-gray-200 overflow-hidden">
          <div className="p-6 ">
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

        <div className="flex-1">
          {stockDetailLoading ? (
            <LoadingSpinner />
          ) : selectedStockDetail ? (
            <StockDetail
              stock={selectedStockDetail}
              onBuyClick={setSelectedStock}
              loading={loading}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600">
              <div className="text-center">
                <Globe size={32} className="mx-auto mb-4 opacity-60" />
                <p className="text-lg">Select a stock to view details</p>
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

      {/* Render BuyModal only when isBuyModalOpen is true */}
      <AnimatePresence>
        {isBuyModalOpen && selectedStockDetail && (
          <BuyModal
            stock={selectedStockDetail}
            onClose={() => setIsBuyModalOpen(false)} // Close BuyModal
            onSuccess={(quantity, totalPrice) =>
              handleTransactionSuccess(selectedStockDetail, quantity, totalPrice)
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyStocks;