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
      <div className="text-center py-12 ">
        <p className="text-gray-400 text-lg font-medium">No valid holdings found</p>
        <p className="text-gray-500 text-sm mt-2">Start your investment journey today</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden backdrop-blur-xl">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-left">Instrument</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">Qty.</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">Avg. Price</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">Current Price</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">Current Value</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-right">P&L</th>
            <th className="py-4 px-6 text-xs font-medium text-gray-400 text-center">Last Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {filteredData.map((holding) => (
            <tr
              key={holding.id}
              className="hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => handleRowClick(holding)}
            >
              <td className="py-4 px-6">
                <div>
                  <div className="font-medium text-white">{holding.symbol}</div>
                  <div className="text-xs text-gray-400">{holding.name}</div>
                </div>
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                {holding.shares}
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                ${formatNumber(holding.averagePrice)}
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                ${formatNumber(holding.currentPrice)}
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                ${formatNumber(holding.value)}
              </td>
              <td className="py-4 px-6 text-right">
                <div className={`flex items-center justify-end gap-1.5 font-mono
                  ${(holding.totalReturn ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {(holding.totalReturn ?? 0) >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span>₹{formatNumber(Math.abs(holding.totalReturn ?? 0))}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-right font-mono text-white">
                {holding.lastUpdated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedStock && (
          <div>
            <h2 className="text-xl font-bold text-white">{selectedStock.name} ({selectedStock.symbol})</h2>
            <div className="mt-4 space-y-2">
              <p className="text-gray-400">Quantity: {selectedStock.shares}</p>
              <p className="text-gray-400">Average Price: ${formatNumber(selectedStock.averagePrice)}</p>
              <p className="text-gray-400">Current Price: ${formatNumber(selectedStock.currentPrice)}</p>
              <p className="text-gray-400">Current Value: ${formatNumber(selectedStock.value)}</p>
              <p className="text-gray-400">Total Return: ${formatNumber(selectedStock.totalReturn)}</p>
              <p className="text-gray-400">Last Updated: {selectedStock.lastUpdated}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PortfolioTable;