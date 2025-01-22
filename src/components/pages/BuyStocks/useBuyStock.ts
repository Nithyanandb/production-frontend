import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

interface UseBuyStockProps {
  onSuccess: () => void;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change?: number;
  percentChange?: number;
  high?: number;
  low?: number;
  openPrice?: number;
  previousClose?: number;
}

export function useBuyStock({ onSuccess }: UseBuyStockProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user, isAuthenticated } = useAuth();

  const handlePurchase = async (stock: Stock, quantity: number) => {
    if (!isAuthenticated || !token) {
      setError('Please log in to continue.');
      return;
    }

    if (!stock || quantity <= 0) {
      setError('Invalid stock or quantity.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('https://production-backend-final.onrender.com/transaction/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stockSymbol: stock.symbol,
          stockName: stock.name,
          quantity,
          price: stock.price,
          change: stock.change || 0,
          percentChange: stock.percentChange || 0,
          high: stock.high || stock.price,
          low: stock.low || stock.price,
          openPrice: stock.openPrice || stock.price,
          previousClose: stock.previousClose || stock.price,
          userId: user?.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Transaction failed. Please try again.');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    handlePurchase,
  };
}