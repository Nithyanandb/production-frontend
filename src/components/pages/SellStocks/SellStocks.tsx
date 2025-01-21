import React, { useState, useEffect, useTransition, useMemo } from 'react';
import { Search, ArrowUp, ArrowDown, Globe, DollarSign, Check } from 'lucide-react';
import SellModal from './SellModal';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header/Header';
import LoadingSpinner from '../../ui/LoadingSpinner';
import useAuth from '@/components/hooks/useAuth';
import { formatMoney, formatPercent, Portfolio } from '@/components/portfolio/Asserts/Portfolio';
import emailjs from 'emailjs-com';
import { FixedSizeList as List } from 'react-window';
import { StockDetail } from './StockDetail';

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

export const SellStocks: React.FC = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Portfolio | null>(null);
  const [selectedStockDetail, setSelectedStockDetail] = useState<Portfolio | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [isPending, startTransition] = useTransition();

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Initialize EmailJS
  useEffect(() => {
    try {
      emailjs.init('eyK87ZsxW822cQvyN'); // Replace with your EmailJS User ID
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }, []);

  // Fetch portfolio data on component mount
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('https://production-backend-final.onrender.com/portfolio', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }

        const { data } = await response.json();
        console.log('Backend Response:', data); // Debugging

        // Validate portfolio data and filter out stocks with zero quantity
        if (Array.isArray(data)) {
          const validPortfolio = data
            .filter((holding) => {
              // Ensure all required fields are present and quantity is greater than zero
              return (
                holding?.symbol &&
                holding?.name &&
                holding.shares > 0 // Only include stocks with quantity > 0
              );
            })
            .map((holding) => ({
              ...holding,
              quantity: holding.shares, // Map `shares` to `quantity` if needed
              currentPrice: holding.value / holding.shares, // Calculate current price if needed
            }));

          setPortfolio(validPortfolio);
        } else {
          throw new Error('Invalid portfolio data format');
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setError('Failed to load portfolio');
        setPortfolio([]); // Reset portfolio to an empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [token]);

  // Handle successful transaction
  const handleTransactionSuccess = async (stock: Portfolio, quantity: number, totalPrice: number) => {
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

    // Re-fetch portfolio data
    try {
      const response = await fetch('https://production-backend-final.onrender.com/portfolio', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch portfolio');
      }

      const { data } = await response.json();
      console.log('Backend Response:', data); // Debugging

      // Validate portfolio data
      if (Array.isArray(data)) {
        const validPortfolio = data.filter(
          (holding) => holding?.symbol && holding?.name && holding.shares > 0 // Only include stocks with quantity > 0
        );
        setPortfolio(validPortfolio);
      } else {
        throw new Error('Invalid portfolio data format');
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError('Failed to load portfolio');
      setPortfolio([]); // Reset portfolio to an empty array in case of error
    }

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

  // Handle stock selection
  const handleStockSelect = (stock: Portfolio) => {
    setSelectedStockDetail(stock);
  };

  // Handle selling stock
  const handleSell = async (symbol: string, quantity: number) => {
    try {
      const response = await fetch('https://production-backend-final.onrender.com/transaction/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stockSymbol: symbol,
          quantity,
          price: selectedStockDetail?.currentPrice || 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process transaction');
      }

      // Update the portfolio after selling
      setPortfolio((prevPortfolio) =>
        prevPortfolio
          .map((holding) => {
            if (holding.symbol === symbol) {
              const newQuantity = holding.shares - quantity; // Use `shares` instead of `quantity`

              // Check if the new quantity is valid (finite and not NaN)
              if (!Number.isFinite(newQuantity) || Number.isNaN(newQuantity)) {
                console.error(`Invalid quantity for ${symbol}: ${newQuantity}`);
                return null; // Skip this holding
              }

              return { ...holding, shares: newQuantity }; // Update `shares`
            }
            return holding;
          })
          .filter((holding) => holding !== null && holding.shares > 0) // Remove invalid or zero-quantity stocks
      );

      // If the sold stock is the selected stock, clear the selection
      if (selectedStockDetail?.symbol === symbol) {
        setSelectedStockDetail(null);
        setSelectedStock(null);
      }

      handleTransactionSuccess(selectedStockDetail!, quantity, selectedStockDetail!.currentPrice * quantity);
    } catch (error) {
      console.error('Sell transaction failed:', error);
      setError('Failed to sell stock');
    }
  };

  // Filter portfolio based on debounced search term
  const filteredPortfolio = useMemo(() => {
    return (Array.isArray(portfolio) ? portfolio : []).filter(
      (holding) =>
        holding?.shares > 0 && // Only include stocks with quantity > 0
        (holding?.symbol?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          holding?.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    );
  }, [debouncedSearchTerm, portfolio]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const holding = filteredPortfolio[index];
    const isSelected = selectedStockDetail?.symbol === holding.symbol;

    return (
      <motion.div
        style={{ ...style, marginBottom: '16px' }}
        layout
        className={`p-4 w-98 ${
          isSelected ? 'bg-gray-200 rounded' : 'bg-white hover:bg-gray-50'
        } transition-colors duration-200 cursor-pointer`}
        onClick={() => handleStockSelect(holding)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm text-black">{holding.symbol}</h3>
            <p className="text-xs text-gray-600">{holding.name}</p>
          </div>
          <motion.div
            animate={{
              color: (holding.totalReturn || 0) >= 0 ? '#16a34a' : '#dc2626',
            }}
            className="text-right"
          >
            <p className="font-medium text-sm text-black">{formatMoney(holding.currentPrice)}</p>
            <p className="text-xs flex items-center gap-1">
              {(holding.change !== undefined) && (
                <>
                  {(holding.totalReturn >= 0) ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                  {formatPercent(Math.abs(holding.change))}
                </>
              )}
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen w-full text-black">
      <Header />
      <div>
        <div className="mt-28 absolute flex z-20 px-8 justify-end w-full">
          {selectedStockDetail && (
            <button
              onClick={() => setSelectedStock(selectedStockDetail)}
              className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-black/90 transition-all flex items-center gap-2"
            >
              <DollarSign size={16} />
              Sell {selectedStockDetail.symbol}
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
                  itemCount={filteredPortfolio.length}
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
          {selectedStockDetail ? (
            <StockDetail
              stock={selectedStockDetail}
              onSellClick={setSelectedStock}
              loading={loading}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
              <div className="text-center max-w-md px-4">
                {/* Icon with a subtle gradient */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl shadow-lg mb-6">
                  <Globe size={28} className="text-white" />
                </div>

                {/* Subtext */}
                <p className="text-lg text-gray-600 mb-6">
                  Select a stock to view details.
                </p>

                {/* Additional content */}
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

      {selectedStock && (
        <SellModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
          onSuccess={(quantity) => handleSell(selectedStock.symbol, quantity)}
        />
      )}
    </div>
  );
};

export default SellStocks;