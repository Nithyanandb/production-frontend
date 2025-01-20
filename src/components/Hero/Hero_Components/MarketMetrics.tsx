import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart2 } from 'lucide-react';

const MarketMetrics: React.FC = () => {
  const metrics = [
    {
      label: 'Market Cap',
      value: '$2.84T',
      change: '+2.4%',
      icon: DollarSign,
      positive: true
    },
    {
      label: 'Volume',
      value: '127.8M',
      change: '-1.2%',
      icon: Activity,
      positive: false
    },
    {
      label: 'Volatility',
      value: '14.2',
      change: '+0.8%',
      icon: BarChart2,
      positive: true
    }
  ];

  return (
    <div className="bg-white rounded-3xl  p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <metric.icon className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700 font-medium">{metric.label}</span>
              </div>
              <div className={`flex items-center gap-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.positive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm">{metric.change}</span>
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900">{metric.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarketMetrics;