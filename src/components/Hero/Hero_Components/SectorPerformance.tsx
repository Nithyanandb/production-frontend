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

  // Calculate summary statistics
  const bestPerformingSector = sectors.reduce((prev, current) =>
    prev.performance > current.performance ? prev : current
  );
  const worstPerformingSector = sectors.reduce((prev, current) =>
    prev.performance < current.performance ? prev : current
  );
  const averagePerformance =
    sectors.reduce((sum, sector) => sum + sector.performance, 0) / sectors.length;

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#333', padding: '10px', border: '1px solid #555', borderRadius: '4px', color: '#fff' }}>
          <p className="label" style={{ fontWeight: 'bold' }}>{`${label}`}</p>
          <p className="intro">{`Performance: ${payload[0].value}%`}</p>
          <p className="intro">{`Change: ${payload[0].payload.change}`}</p>
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
      style={{ padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff', fontSize: '24px', fontWeight: '600' }}>Sector Performance</h2>

      {/* Summary Section */}
      <div style={{ marginBottom: '30px', color: '#fff' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>Market Summary</h3>
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
  <BarChart
    data={sectors}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    aria-label="Sector Performance Chart"
    role="img"
  >
    {/* Dark background for the chart area */}
    <defs>
      <linearGradient id="chartBackground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#000" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#000" stopOpacity={0.2} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#chartBackground)" />

    {/* X-Axis */}
    <XAxis
      dataKey="name"
      tick={{ fill: '#fff', fontSize: 12 }}
      axisLine={{ stroke: '#555' }}
      tickLine={{ stroke: '#555' }}
    />

    {/* Y-Axis */}
    <YAxis
      domain={[0, 'auto']} // Ensures zero level is consistent
      tick={{ fill: '#fff', fontSize: 12 }}
      axisLine={{ stroke: '#555' }}
      tickLine={{ stroke: '#555' }}
    />

    {/* Grid Lines */}
    <CartesianGrid stroke="#444" strokeDasharray="3 3" />

    {/* Tooltip */}
    <Tooltip
      content={<CustomTooltip />}
      cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} // Subtle hover effect
    />

    {/* Legend */}
    <Legend
      wrapperStyle={{ paddingTop: '20px', color: '#fff' }}
      iconType="circle"
      iconSize={10}
    />

    {/* Bar */}
    <Bar
      dataKey="performance"
      name="Performance (%)"
      isAnimationActive={true}
      animationDuration={1000} // Smooth animation
      style={{ cursor: 'default' }} // Disable hover effect
    >
      {sectors.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={entry.performance > 0 ? '#4CAF50' : '#F44336'} // Green for positive, red for negative
        />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>

      {/* Detailed Table */}
      <div style={{ marginTop: '30px', color: '#fff' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>Detailed Sector Performance</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #555' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Sector</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Performance (%)</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Change</th>
            </tr>
          </thead>
          <tbody>
            {sectors.map((sector, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #555' }}>
                <td style={{ padding: '10px' }}>{sector.name}</td>
                <td style={{ padding: '10px' }}>{sector.performance}</td>
                <td style={{ padding: '10px', color: sector.change.startsWith('+') ? '#4CAF50' : '#F44336' }}>
                  {sector.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insights Section */}
      <div style={{ marginTop: '30px', color: '#fff' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>Market Insights</h3>
        <p>
          The technology sector continues to lead the market with strong performance, driven by innovation and high demand for tech products.
        </p>
     
      </div>

    </motion.div>
  );
};

export default SectorPerformance;