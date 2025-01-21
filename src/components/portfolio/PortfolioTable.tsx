import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Modal from './Asserts/Modal';

export interface Portfolio {
  quantity: number;
  id: number;
  symbol: string;
  name: string;
  shares: number;
  value: number;
  change: number;
  averagePrice: number;
  currentPrice: number;
  totalReturn: number;
  lastUpdated: string;
}

interface PortfolioTableProps {
  data: Portfolio[];
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({
  data = [],
}) => {
  const [updatedData, setUpdatedData] = useState<Portfolio[]>([]);
  const [selectedStock, setSelectedStock] = useState<Portfolio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updatedDataWithTimestamp = data.map((holding) => ({
      ...holding,
      lastUpdated: holding.lastUpdated || new Date().toLocaleString(),
    }));
    setUpdatedData(updatedDataWithTimestamp);
  }, [data]);

  const filteredData = updatedData.filter((holding) => {
    return (
      Number.isFinite(holding.averagePrice) &&
      Number.isFinite(holding.currentPrice) &&
      Number.isFinite(holding.value) &&
      Number.isFinite(holding.totalReturn)
    );
  });

  const handleRowClick = (holding: Portfolio) => {
    setSelectedStock(holding);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  const formatNumber = (value: number | undefined) => {
    if (value === undefined || !Number.isFinite(value)) {
      return 'N/A';
    }
    return value.toFixed(2);
  };

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg font-medium">No Valid Holdings found</p>
        <p className="text-gray-500 text-sm mt-2">Start your investment journey today</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-sm bg-white font-sans">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-4 px-6 text-sm font-medium text-gray-900 text-left uppercase tracking-wider">Instrument</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-900 text-right uppercase tracking-wider">Qty.</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-900 text-right uppercase tracking-wider">Avg. Price</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-900 text-right uppercase tracking-wider">Current Price</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-900 text-right uppercase tracking-wider">Current Value</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-900 text-right uppercase tracking-wider">P&L</th>
            <th className="py-4 px-6 text-sm font-medium text-gray-900 text-center uppercase tracking-wider">Last Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredData.map((holding) => (
            <tr
              key={holding.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleRowClick(holding)}
            >
              <td className="py-4 px-6">
                <div>
                  <div className="font-medium text-gray-900">{holding.symbol}</div>
                  <div className="text-sm text-gray-600">{holding.name}</div>
                </div>
              </td>
              <td className="py-4 px-6 text-right text-gray-900">
                {holding.shares}
              </td>
              <td className="py-4 px-6 text-right text-gray-900">
                ₹{formatNumber(holding.averagePrice)}
              </td>
              <td className="py-4 px-6 text-right text-gray-900">
                ₹{formatNumber(holding.currentPrice)}
              </td>
              <td className="py-4 px-6 text-right text-gray-900">
                ₹{formatNumber(holding.value)}
              </td>
              <td className="py-4 px-6 text-right">
                <div className={`flex items-center justify-end gap-1.5
                  ${(holding.totalReturn ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {(holding.totalReturn ?? 0) >= 0 ? <ArrowUp size={14} className="text-green-600" /> : <ArrowDown size={14} className="text-red-600" />}
                  <span>₹{formatNumber(Math.abs(holding.totalReturn ?? 0))}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-right text-gray-900">
                {holding.lastUpdated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedStock && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{selectedStock.name} ({selectedStock.symbol})</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="text-gray-900 font-medium">{selectedStock.shares}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Price:</span>
                <span className="text-gray-900 font-medium">₹{formatNumber(selectedStock.averagePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price:</span>
                <span className="text-gray-900 font-medium">₹{formatNumber(selectedStock.currentPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Value:</span>
                <span className="text-gray-900 font-medium">₹{formatNumber(selectedStock.value)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Return:</span>
                <span className={`font-medium ${(selectedStock.totalReturn ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{formatNumber(selectedStock.totalReturn)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-gray-900 font-medium">{selectedStock.lastUpdated}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PortfolioTable;