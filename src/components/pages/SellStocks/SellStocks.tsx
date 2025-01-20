import React, { useState, useEffect, useTransition } from 'react';
import { Search, ArrowUp, ArrowDown, Globe, DollarSign, Check } from 'lucide-react';
import SellModal from './SellModal';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header/Header';
import LoadingSpinner from '../../ui/LoadingSpinner';
import useAuth from '@/components/hooks/useAuth';
import StockDetail from './StockDetail';
import { formatMoney, formatPercent, Portfolio } from '@/components/portfolio/Asserts/Portfolio';
import emailjs from 'emailjs-com';

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

        // Validate portfolio data
        if (Array.isArray(data)) {
          const validPortfolio = data.filter(
            (holding) => holding?.symbol && holding?.name
          );
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
        (holding) => holding?.symbol && holding?.name
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
        prevPortfolio.map((holding) => {
          if (holding.symbol === symbol) {
            const newQuantity = holding.quantity - quantity;
            return { ...holding, quantity: newQuantity };
          }
          return holding;
        }).filter((holding) => holding.quantity > 0) // Remove stocks with 0 quantity
      );

      handleTransactionSuccess(selectedStockDetail!, quantity, selectedStockDetail!.currentPrice * quantity);
    } catch (error) {
      console.error('Sell transaction failed:', error);
      setError('Failed to sell stock');
    }
  };

  // Filter portfolio based on search term
  const filteredPortfolio = (Array.isArray(portfolio) ? portfolio : []).filter(
    (holding) =>
      holding?.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holding?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <div>
        <div className="mt-32 absolute flex z-20 px-8 justify-end w-full">
          {selectedStockDetail && (
            <button
              onClick={() => setSelectedStock(selectedStockDetail)}
              className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-black/90 transition-all flex items-center gap-2"
            >
              <DollarSign size={20} />
              Sell {selectedStockDetail.symbol}
            </button>
          )}
        </div>
      </div>

      <div className="flex h-screen pt-20">
        {/* Sidebar */}
        <div className="w-98 border-r border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-2xl pl-12 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>

            {/* Portfolio List */}
            <div className="space-y-4 overflow-y-auto w-[400px] h-[calc(100vh-200px)]">
              {loading ? (
                <LoadingSpinner/>
              ) : (
                filteredPortfolio.map((holding) => (
                  <motion.div
                    key={holding.symbol}
                    layout
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedStockDetail?.symbol === holding.symbol
                        ? 'bg-gray-200'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                    onClick={() => handleStockSelect(holding)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{holding.symbol}</h3>
                        <p className="text-sm text-gray-600">{holding.name}</p>
                      </div>
                      <motion.div
                        animate={{
                          color: (holding.totalReturn || 0) >= 0 ? '#34D399' : '#EF4444',
                        }}
                        className="text-right"
                      >
                        <p className="font-medium">{formatMoney(holding.currentPrice)}</p>
                        <p className="text-sm flex items-center gap-1">
                          {(holding.totalReturn !== undefined) && (
                            <>
                              {(holding.totalReturn >= 0) ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                              {formatPercent(Math.abs(holding.totalReturn))}
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

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedStockDetail ? (
            <StockDetail
              stock={selectedStockDetail}
              onSellClick={setSelectedStock}
              loading={loading}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600">
              <div className="text-center">
                <Globe size={48} className="mx-auto mb-4 opacity-60" />
                <p className="text-xl">Select a stock to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-black/50 backdrop-blur-sm fixed inset-0" /> {/* Overlay */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white backdrop-blur-lg rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-gray-200"
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

      {/* Sell Modal */}
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