import React, { useState } from 'react';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import AuthModal from '../../Auth/AuthModal';

interface SellModalProps {
  stock?: {
    symbol: string;
    name: string;
    price: number;
    quantity: number;
  };
  onClose: () => void;
  onSuccess: (quantity: number) => void;
}

const SellModal: React.FC<SellModalProps> = ({ stock, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSell = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (quantity <= 0) {
      setError('Quantity must be greater than 0.');
      return;
    }

    if (!stock || quantity > stock.quantity) {
      setError('Quantity exceeds available shares.');
      return;
    }

    setError(null);
    onSuccess(quantity);
    onClose();
  };

  if (!stock) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center">
        <div className="bg-[#111111] backdrop-blur-xl rounded-2xl p-8 w-full max-w-md mx-4 border border-white/10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-medium text-white">{stock.name}</h2>
              <p className="text-white/60 text-sm">{stock.symbol}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <XIcon size={24} />
            </button>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <span className="text-sm text-white/60">Quantity</span>
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white border border-white/10 transition-all"
                >
                  <MinusIcon size={20} />
                </button>
                <span className="text-4xl font-light text-white w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(stock.quantity, quantity + 1))}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white border border-white/10 transition-all"
                >
                  <PlusIcon size={20} />
                </button>
              </div>
              <p className="text-white/40 text-sm">
                Available: {stock.quantity} shares
              </p>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Price per share</span>
                <span className="text-white font-medium">₹{stock.price?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-white/80">Total Amount</span>
                <span className="text-white font-medium">₹{(stock.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-3 pt-4">
              <button
                onClick={handleSell}
                className="w-full py-4 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-all text-sm uppercase tracking-wide"
              >
                Sell Now
              </button>
              <button
                onClick={onClose}
                className="w-full py-4 text-white/60 font-medium hover:text-white transition-colors text-sm uppercase tracking-wide"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          if (!stock) return;
          handleSell();
        }}
      />
    </>
  );
};

export default SellModal;