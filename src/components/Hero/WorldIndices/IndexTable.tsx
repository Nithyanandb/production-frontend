import React from 'react';
import { formatNumber, formatPercentage } from './formatters';
import { motion } from 'framer-motion';
import { MiniChart } from './MiniChart';

interface IndexTableProps {
  indices: any[];
  showMiniChart?: boolean;
}

export const IndexTable: React.FC<IndexTableProps> = ({ indices, showMiniChart = false }) => {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-white/5">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-black">Symbol</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-black">Name</th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-black">Price</th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-black">Change</th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-black">% Change</th>
            {showMiniChart && (
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-black">Trend</th>
            )}
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-black">High</th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-black">Low</th>
            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-black">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {indices.map((index) => (
            <motion.tr
              key={index.symbol}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hover:bg-white/5 transition-colors"
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-black">{index.symbol}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{index.name}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-black font-medium">
                {formatNumber(index.price)}
              </td>
              <td className={`whitespace-nowrap px-3 py-4 text-sm text-right font-medium
                ${index.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatNumber(index.change)}
              </td>
              <td className={`whitespace-nowrap px-3 py-4 text-sm text-right font-medium
                ${index.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercentage(index.changePercent)}
              </td>
              {showMiniChart && (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                  <div className="inline-block">
                    <MiniChart 
                      data={index.historicalData} 
                      isPositive={index.changePercent >= 0}
                      width={100}
                      height={32}
                    />
                  </div>
                </td>
              )}
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">{formatNumber(index.high)}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">{formatNumber(index.low)}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-400">
                {new Date(index.timestamp).toLocaleTimeString()}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};