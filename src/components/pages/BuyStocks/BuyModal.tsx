import React, { useState } from 'react';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { useBuyStock } from './useBuyStock';
import useAuth from '../../hooks/useAuth';
import AuthModal from '../../Auth/AuthModal';

interface BuyModalProps {
  stock?: {
    symbol: string;
    name: string;
    price: number;
  };
  onClose: () => void;
  onSuccess: (quantity: number, totalPrice: number) => void;
}

const BuyModal: React.FC<BuyModalProps> = ({ stock, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isProcessing, error, handlePurchase } = useBuyStock({
    onSuccess: () => {
      if (!stock) return;
      const totalPrice = stock.price * quantity;
      onSuccess(quantity, totalPrice);
      onClose();
    },
  });

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (!stock) return;
    await handlePurchase(stock, quantity);
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
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white border border-white/10 transition-all"
                >
                  <PlusIcon size={20} />
                </button>
              </div>
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
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide"
              >
                {isProcessing ? 'Processing...' : 'Buy Now'}
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
          handlePurchase(stock, quantity);
        }}
      />
    </>
  );
};

export default BuyModal;