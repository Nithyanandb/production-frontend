import React, { useState, useEffect, useTransition } from 'react';
import { Search, ArrowUp, ArrowDown, Globe, DollarSign, Check } from 'lucide-react';
import BuyModal from './BuyModal';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header/Header';
import { StockDetail } from './StockDetail';
import { symbols } from '../AllStocks/symbols';
import LoadingSpinner from '../../ui/LoadingSpinner';
import emailjs from 'emailjs-com';
import useAuth from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { Stock } from './types';

export const BuyStocks: React.FC = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = useState<Stock[]>(
    symbols.map((stock) => ({
      ...stock,
      price: 0, // Default value for `price`
      changePercent: 0, // Default value for `changePercent`
    }))
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [selectedStockDetail, setSelectedStockDetail] = useState<Stock | null>(null);
  const [, setPriceChanges] = useState<Record<string, number>>({});
  const [stockDetailLoading, setStockDetailLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [, setEmail] = useState(user?.email || '');
  const location = useLocation();
  const [, startTransition] = useTransition();

  // Set user email on component mount or when user changes
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
  }, [user]);

  // Handle selected stock from navigation state
  useEffect(() => {
    if (location.state?.selectedStock) {
      startTransition(() => {
        setSelectedStock(location.state.selectedStock);
        setSelectedStockDetail(location.state.selectedStock);
      });
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
      startTransition(() => {
        setStocks(
          symbols.map((stock) => ({
            ...stock,
            price: 0, // Default value for `price`
            changePercent: 0, // Default value for `changePercent`
          }))
        );
        setLoading(false);
      });
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      startTransition(() => {
        setStocks((prevStocks) =>
          prevStocks.map((stock) => {
            const change = (Math.random() - 0.5) * 2;
            const newPrice = stock.price ? stock.price + change : 0; // Handle undefined price

            setPriceChanges((prev) => ({
              ...prev,
              [stock.symbol]: change,
            }));

            return {
              ...stock,
              price: newPrice,
              change,
              changePercent: stock.price ? (change / stock.price) * 100 : 0, // Handle undefined price
            };
          })
        );
      });
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // Handle stock selection
  const handleStockSelect = async (stock: Stock) => {
    setStockDetailLoading(true);
    startTransition(() => {
      setSelectedStockDetail(stock);
    });

    try {
      const detailedStock = { ...stock };
      startTransition(() => {
        setSelectedStockDetail(detailedStock);
      });
    } catch (error) {
      console.error('Failed to load stock details:', error);
      setError('Failed to load stock details');
    } finally {
      setStockDetailLoading(false);
    }
  };

  // Handle successful transaction
  const handleTransactionSuccess = async (stock: Stock, quantity: number, totalPrice: number) => {
    // Validate totalPrice
    if (typeof totalPrice !== 'number' || isNaN(totalPrice)) {
      console.error('Invalid totalPrice:', totalPrice);
      return;
    }

    // Show success popup
    startTransition(() => {
      setShowSuccessPopup(true);
    });
    setTimeout(() => {
      startTransition(() => {
        setShowSuccessPopup(false);
      });
    }, 3000);

    // Send email notification
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

  // Filter stocks based on search term
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white">
      <Header />
      <div>
        <div className="mt-32 absolute flex z-20 px-8 justify-end w-full">
          {selectedStockDetail && (
            <button
              onClick={() => setSelectedStock(selectedStockDetail)}
              className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all flex items-center gap-2"
            >
              <DollarSign size={20} />
              Buy {selectedStockDetail.symbol}
            </button>
          )}
        </div>
      </div>

      <div className="flex h-screen pt-20">
        <div className="w-98 bg-black/30 border-r border-white/10 overflow-hidden">
          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>

            <div className="space-y-4 overflow-y-auto w-[400px] h-[calc(100vh-200px)]">
              {loading ? (
                <LoadingSpinner />
              ) : (
                filteredStocks.map((stock) => (
                  <motion.div
                    key={stock.symbol}
                    layout
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedStockDetail?.symbol === stock.symbol
                        ? 'bg-white/10'
                        : 'bg-black/20 hover:bg-white/5'
                    }`}
                    onClick={() => handleStockSelect(stock)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{stock.symbol}</h3>
                        <p className="text-sm text-white/60">{stock.name}</p>
                      </div>
                      <motion.div
                        animate={{
                          color: (stock.changePercent || 0) >= 0
                            ? '#16a34a' // Green for positive change
                            : '#dc2626', // Red for negative change
                        }}
                        className="text-right"
                      >
                        <p className="font-medium">₹{stock.price?.toFixed(2) ?? 'N/A'}</p>
                        <p className="text-sm flex items-center gap-1">
                          {(stock.changePercent !== undefined) && (
                            <>
                              {(stock.changePercent >= 0) ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                              {Math.abs(stock.changePercent).toFixed(2)}%
                            </>
                          )}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {stockDetailLoading ? (
            <LoadingSpinner />
          ) : selectedStockDetail ? (
            <StockDetail
              stock={selectedStockDetail}
              onBuyClick={setSelectedStock}
              loading={loading}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-white/60">
              <div className="text-center">
                <Globe size={48} className="mx-auto mb-4 opacity-60" />
                <p className="text-xl">Select a stock to view details</p>
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
              className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-white/20"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="bg-green-500/10 rounded-full p-3">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Success!</h2>
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

      {selectedStock && (
        <BuyModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
          onSuccess={(quantity, totalPrice) =>
            handleTransactionSuccess(selectedStock, quantity, totalPrice)
          }
        />
      )}
    </div>
  );
};

export default BuyStocks;