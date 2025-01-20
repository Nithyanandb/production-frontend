import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const SectorPerformance: React.FC = () => {
  const sectors = [
    { name: 'Dow Jones', performance: 0.82, change: '+0.82%' },
    { name: 'Nasdaq', performance: 1.75, change: '+1.75%' },
    { name: 'S&P 500', performance: 1.26, change: '+1.26%' },
    { name: 'Energy', performance: -0.45, change: '-0.45%' },
    { name: 'Technology', performance: 2.10, change: '+2.10%' },
    { name: 'Healthcare', performance: -0.30, change: '-0.30%' },
  ];

  const bestPerformingSector = sectors.reduce((prev, current) =>
    prev.performance > current.performance ? prev : current
  );
  const worstPerformingSector = sectors.reduce((prev, current) =>
    prev.performance < current.performance ? prev : current
  );
  const averagePerformance =
    sectors.reduce((sum, sector) => sum + sector.performance, 0) / sectors.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-gray-700">Performance: {payload[0].value}%</p>
          <p className="text-gray-700">Change: {payload[0].payload.change}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Sector Performance</h2>

      {/* Summary Section */}
      <div className="mb-12 text-gray-700">
        <h3 className="text-xl font-semibold mb-4">Market Summary</h3>
        <p>
          The best-performing sector is <strong>{bestPerformingSector.name}</strong> with a performance of{' '}
          <strong>{bestPerformingSector.performance}%</strong>.
        </p>
        <p>
          The worst-performing sector is <strong>{worstPerformingSector.name}</strong> with a performance of{' '}
          <strong>{worstPerformingSector.performance}%</strong>.
        </p>
        <p>
          The average performance across all sectors is <strong>{averagePerformance.toFixed(2)}%</strong>.
        </p>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sectors} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" tick={{ fill: '#666' }} axisLine={{ stroke: '#ddd' }} />
          <YAxis tick={{ fill: '#666' }} axisLine={{ stroke: '#ddd' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="performance" name="Performance (%)">
            {sectors.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.performance > 0 ? '#4CAF50' : '#F44336'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Detailed Table */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Detailed Sector Performance</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-2 text-left text-gray-700">Sector</th>
              <th className="p-2 text-left text-gray-700">Performance (%)</th>
              <th className="p-2 text-left text-gray-700">Change</th>
            </tr>
          </thead>
          <tbody>
            {sectors.map((sector, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-2 text-gray-900">{sector.name}</td>
                <td className="p-2 text-gray-900">{sector.performance}</td>
                <td className={`p-2 ${sector.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {sector.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SectorPerformance;