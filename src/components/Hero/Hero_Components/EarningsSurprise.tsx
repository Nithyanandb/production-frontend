import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EarningsData {
  actual: number;
  estimate: number;
  period: string;
  quarter: number;
  surprise: number;
  surprisePercent: number;
  symbol: string;
  year: number;
}

interface EarningsSurpriseProps {
  symbol: string;
  limit?: number;
}

const EarningsSurprise: React.FC<EarningsSurpriseProps> = ({ symbol, limit = 4 }) => {
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = 'ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g'; // Replace with your Finnhub API key

  useEffect(() => {
    const fetchEarningsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&limit=${limit}&token=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch earnings data');
        }
        const data = await response.json();
        setEarningsData(data);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
        setError('Failed to load earnings data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, [symbol, limit]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl overflow-hidden transition-all duration-500 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Earnings Surprise for {symbol}</h2>
        <div className="space-y-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl overflow-hidden transition-all duration-500 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Earnings Surprise for {symbol}</h2>
        <div className="text-red-500 text-sm">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden transition-all duration-500 p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Earnings Surprise for {symbol}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surprise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surprise %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {earningsData.map((earning, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{earning.period}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{earning.actual}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{earning.estimate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{earning.surprise}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{earning.surprisePercent}%</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default EarningsSurprise;