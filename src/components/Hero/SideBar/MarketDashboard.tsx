import React from 'react';
import {
  LineChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart2,
  PieChart,
  Activity,
  Image,
  Shield,
  Cpu,
  Zap,
  Home,
  Users,
  Gamepad,
  Globe,
} from 'lucide-react';
import { Bitcoin, Coins } from 'lucide-react';
import { SiEthereum } from 'react-icons/si';

const exchangeRate = 83;

type Token = {
  icon: Element;
  name: string;
  symbol: string;
  price: number;
  change24h: string;
  marketCap: number;
  volume: number;
  trendIcon: Element;
};

const MarketDashboard: React.FC = () => {
  // Indices Data
  const indices = [
    { name: 'Dow Jones', value: '42,738.63', change: '+346.36 (0.82%)' },
    { name: 'Nasdaq', value: '19,619.17', change: '+338.38 (1.75%)' },
    { name: 'S&P 500', value: '5,942.47', change: '+73.92 (1.26%)' },
  ];

  // Sort indices by name
  const sortedIndices = indices.sort((a, b) => a.name.localeCompare(b.name));

  // Key Indicators Data
  const keyIndicators = [
    { name: 'Crude Oil', ltp: '70.26', change: '0.64', changePercent: '0.92%', icon: <Activity className="w-4 h-4 text-gray-600" /> },
    { name: 'Gold', ltp: '2,620.56', change: '-12.49', changePercent: '-0.47%', icon: <DollarSign className="w-4 h-4 text-gray-600" /> },
    { name: 'Brent Crude', ltp: '73.81', change: '0.55', changePercent: '0.75%', icon: <Activity className="w-4 h-4 text-gray-600" /> },
    { name: 'DXY', ltp: '108.92', change: '-0.37', changePercent: '-0.33%', icon: <BarChart2 className="w-4 h-4 text-gray-600" /> },
    { name: 'US 10Y', ltp: '4.600', change: '0.03', changePercent: '0.74%', icon: <TrendingUp className="w-4 h-4 text-gray-600" /> },
    { name: 'YEN', ltp: '157.273', change: '-0.23', changePercent: '-0.14%', icon: <PieChart className="w-4 h-4 text-gray-600" /> },
    { name: 'EURO', ltp: '1.031', change: '0.00', changePercent: '0.42%', icon: <PieChart className="w-4 h-4 text-gray-600" /> },
  ];

  // Cryptocurrencies Data
  const cryptocurrencies = [
    {
      icon: <Bitcoin className="w-5 h-5 text-gray-600" />,
      name: "Bitcoin",
      symbol: "btc",
      price: 50000 * exchangeRate,
      change24h: "+2.5%",
      volume24h: 30000000000 * exchangeRate,
      marketCap: 950000000000 * exchangeRate,
      sparkline: "https://example.com/sparkline-bitcoin.png",
      trendIcon: <TrendingUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <SiEthereum className="w-5 h-5 text-gray-600" />,
      name: "Ethereum",
      symbol: "eth",
      price: 4000 * exchangeRate,
      change24h: "-1.2%",
      volume24h: 20000000000 * exchangeRate,
      marketCap: 450000000000 * exchangeRate,
      sparkline: "https://example.com/sparkline-ethereum.png",
      trendIcon: <TrendingDown className="w-4 h-4 text-red-600" />,
    },
  ];

  // Stocks Data
  const stocks = [
    {
      icon: <TrendingUp className="w-5 h-5 text-gray-600" />,
      name: "Apple Inc.",
      symbol: "AAPL",
      price: 150.25 * exchangeRate,
      change24h: "+1.5%",
      marketCap: 2500000000000 * exchangeRate,
      peRatio: 28.5,
      trendIcon: <TrendingUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-gray-600" />,
      name: "Tesla Inc.",
      symbol: "TSLA",
      price: 750.50 * exchangeRate,
      change24h: "-0.8%",
      marketCap: 750000000000 * exchangeRate,
      peRatio: 120.3,
      trendIcon: <TrendingDown className="w-4 h-4 text-red-600" />,
    },
  ];

  // NFTs Data
  const nfts = [
    {
      icon: <Image className="w-5 h-5 text-gray-600" />,
      name: "CryptoPunk #1234",
      collection: "CryptoPunks",
      price: 250000 * exchangeRate,
      change24h: "+5.2%",
      totalVolume: 1000000000 * exchangeRate,
      owners: 5000,
      trendIcon: <TrendingUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <Image className="w-5 h-5 text-gray-600" />,
      name: "Bored Ape #5678",
      collection: "Bored Ape Yacht Club",
      price: 150000 * exchangeRate,
      change24h: "-2.3%",
      totalVolume: 800000000 * exchangeRate,
      owners: 3000,
      trendIcon: <TrendingDown className="w-4 h-4 text-red-600" />,
    },
  ];

  // Commodities Data
  const commodities = [
    {
      icon: <Zap className="w-5 h-5 text-gray-600" />,
      name: "Gold",
      symbol: "XAU",
      price: 1800 * exchangeRate,
      change24h: "+0.5%",
      marketCap: 11000000000000 * exchangeRate,
      supply: 197576,
      trendIcon: <TrendingUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <Zap className="w-5 h-5 text-gray-600" />,
      name: "Silver",
      symbol: "XAG",
      price: 25.50 * exchangeRate,
      change24h: "-0.3%",
      marketCap: 1500000000000 * exchangeRate,
      supply: 1000000,
      trendIcon: <TrendingDown className="w-4 h-4 text-red-600" />,
    },
  ];

  // Forex Data
  const forexPairs = [
    {
      icon: <Globe className="w-5 h-5 text-gray-600" />,
      name: "EUR/USD",
      symbol: "EURUSD",
      price: 1.18 * exchangeRate,
      change24h: "+0.2%",
      volume: 5000000000 * exchangeRate,
      spread: 0.0002,
      trendIcon: <TrendingUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <Globe className="w-5 h-5 text-gray-600" />,
      name: "GBP/USD",
      symbol: "GBPUSD",
      price: 1.38 * exchangeRate,
      change24h: "-0.1%",
      volume: 3000000000 * exchangeRate,
      spread: 0.0003,
      trendIcon: <TrendingDown className="w-4 h-4 text-red-600" />,
    },
  ];

  // DeFi Tokens Data
  const defiTokens = [
    {
      icon: <Coins className="w-5 h-5 text-gray-600" />,
      name: "Uniswap",
      symbol: "UNI",
      price: 25.00 * exchangeRate,
      change24h: "+3.2%",
      tvl: 5000000000 * exchangeRate,
      marketCap: 15000000000 * exchangeRate,
      trendIcon: <TrendingUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <Coins className="w-5 h-5 text-gray-600" />,
      name: "Aave",
      symbol: "AAVE",
      price: 300.00 * exchangeRate,
      change24h: "-1.5%",
      tvl: 3000000000 * exchangeRate,
      marketCap: 4000000000 * exchangeRate,
    },
  ];

  // Metaverse Tokens Data
  const metaverseTokens = [
    {
      icon: <Globe className="w-5 h-5 text-gray-600" />,
      name: "Decentraland",
      symbol: "MANA",
      price: 3.50 * exchangeRate,
      change24h: "+2.1%",
      marketCap: 5000000000 * exchangeRate,
      volume: 100000000 * exchangeRate,
    },
    {
      icon: <Globe className="w-5 h-5 text-gray-600" />,
      name: "The Sandbox",
      symbol: "SAND",
      price: 2.80 * exchangeRate,
      change24h: "-0.8%",
      marketCap: 3000000000 * exchangeRate,
      volume: 80000000 * exchangeRate,
    },
  ];

  // Gaming Tokens Data
  const gamingTokens = [
    {
      icon: <Gamepad className="w-5 h-5 text-gray-600" />,
      name: "Axie Infinity",
      symbol: "AXS",
      price: 75.00 * exchangeRate,
      change24h: "+4.5%",
      marketCap: 5000000000 * exchangeRate,
      volume: 200000000 * exchangeRate,
    },
    {
      icon: <Gamepad className="w-5 h-5 text-gray-600" />,
      name: "Enjin Coin",
      symbol: "ENJ",
      price: 2.50 * exchangeRate,
      change24h: "-1.2%",
      marketCap: 2000000000 * exchangeRate,
      volume: 50000000 * exchangeRate,
    },
  ];

  // Stablecoins Data
  const stablecoins = [
    {
      icon: <DollarSign className="w-5 h-5 text-gray-600" />,
      name: "Tether",
      symbol: "USDT",
      price: 1.00 * exchangeRate,
      change24h: "+0.0%",
      marketCap: 80000000000 * exchangeRate,
      volume: 50000000000 * exchangeRate,
    },
    {
      icon: <DollarSign className="w-5 h-5 text-gray-600" />,
      name: "USD Coin",
      symbol: "USDC",
      price: 1.00 * exchangeRate,
      change24h: "+0.0%",
      marketCap: 50000000000 * exchangeRate,
      volume: 30000000000 * exchangeRate,
    },
  ];

  // Privacy Coins Data
  const privacyCoins = [
    {
      icon: <Shield className="w-5 h-5 text-gray-600" />,
      name: "Monero",
      symbol: "XMR",
      price: 250.00 * exchangeRate,
      change24h: "+1.8%",
      marketCap: 4500000000 * exchangeRate,
      volume: 50000000 * exchangeRate,
    },
    {
      icon: <Shield className="w-5 h-5 text-gray-600" />,
      name: "Zcash",
      symbol: "ZEC",
      price: 120.00 * exchangeRate,
      change24h: "-0.5%",
      marketCap: 1500000000 * exchangeRate,
      volume: 20000000 * exchangeRate,
    },
  ];

  // AI Tokens Data
  const aiTokens = [
    {
      icon: <Cpu className="w-5 h-5 text-gray-600" />,
      name: "Fetch.ai",
      symbol: "FET",
      price: 0.50 * exchangeRate,
      change24h: "+3.5%",
      marketCap: 500000000 * exchangeRate,
      volume: 10000000 * exchangeRate,
    },
    {
      icon: <Cpu className="w-5 h-5 text-gray-600" />,
      name: "Ocean Protocol",
      symbol: "OCEAN",
      price: 0.80 * exchangeRate,
      change24h: "-1.2%",
      marketCap: 300000000 * exchangeRate,
      volume: 5000000 * exchangeRate,
    },
  ];

  // Real Estate Tokens Data
  const realEstateTokens = [
    {
      icon: <Home className="w-5 h-5 text-gray-600" />,
      name: "RealT",
      symbol: "REALT",
      price: 50.00 * exchangeRate,
      change24h: "+1.2%",
      marketCap: 50000000 * exchangeRate,
      volume: 1000000 * exchangeRate,
    },
    {
      icon: <Home className="w-5 h-5 text-gray-600" />,
      name: "Propy",
      symbol: "PRO",
      price: 2.00 * exchangeRate,
      change24h: "-0.3%",
      marketCap: 20000000 * exchangeRate,
      volume: 500000 * exchangeRate,
    },
  ];

  // Social Tokens Data
  const socialTokens = [
    {
      icon: <Users className="w-5 h-5 text-gray-600" />,
      name: "Rally",
      symbol: "RLY",
      price: 0.50 * exchangeRate,
      change24h: "+1.8%",
      marketCap: 100000000 * exchangeRate,
      volume: 2000000 * exchangeRate,
      trendIcon: <TrendingUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <Users className="w-5 h-5 text-gray-600" />,
      name: "Chiliz",
      symbol: "CHZ",
      price: 0.20 * exchangeRate,
      change24h: "-0.5%",
      marketCap: 50000000 * exchangeRate,
      volume: 1000000 * exchangeRate,
      trendIcon: <TrendingDown className="w-4 h-4 text-red-600" />,
    },
  ];

  // Gaming NFTs Data
  const gamingNFTs = [
    {
      icon: <Gamepad className="w-5 h-5 text-gray-600" />,
      name: "Axie Infinity Land",
      collection: "Axie Infinity",
      price: 5000 * exchangeRate,
      change24h: "+3.2%",
      totalVolume: 100000000 * exchangeRate,
      owners: 10000,
      trendIcon: <TrendingUp className="w-4 h-4 text-green-600" />,
    },
    {
      icon: <Gamepad className="w-5 h-5 text-gray-600" />,
      name: "Sandbox LAND",
      collection: "The Sandbox",
      price: 3000 * exchangeRate,
      change24h: "-1.5%",
      totalVolume: 80000000 * exchangeRate,
      owners: 8000,
      trendIcon: <TrendingDown className="w-4 h-4 text-red-600" />,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      {/* Main Content */}
      <div className="flex-1 p-6 xs:p-0 lg:mr-8 overflow-y-auto">
        {/* Indices Table */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-gray-600" /> Indices
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Value</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody>
                {sortedIndices.map((index, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      {index.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{index.value}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">{index.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Indicators Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-600" /> Key Indicators
            </h2>
          </div>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-2 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">LTP</th>
                  <th className="px-2 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Change</th>
                  <th className="px-2 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Change %</th>
                </tr>
              </thead>
              <tbody>
                {keyIndicators.map((indicator, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center gap-2">
                      {indicator.icon}
                      {indicator.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{indicator.ltp}</td>
                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${
                      indicator.change.startsWith('-') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {indicator.change}
                    </td>
                    <td className={`px-4 py-4 whitespace-nowrap text-sm ${
                      indicator.changePercent.startsWith('-') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      <span>{indicator.changePercent}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="sm:hidden">
            <div className="grid grid-cols-2 gap-2">
              {keyIndicators.map((indicator, i) => (
                <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      {indicator.icon}
                      {indicator.name}
                    </span>
                    <span className="text-sm text-gray-900">{indicator.ltp}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-sm ${
                      indicator.change.startsWith('-') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {indicator.change}
                    </span>
                    <span className={`text-sm ${
                      indicator.changePercent.startsWith('-') ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {indicator.changePercent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cryptocurrency Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-gray-600" /> Top Cryptocurrencies
          </h2>
          <div className="space-y-3 mt-8">
            {cryptocurrencies.map((crypto, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    {crypto.icon}
                    <span className="text-sm text-gray-900">{crypto.name}</span>
                    <span className="text-xs text-gray-500">{crypto.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{crypto.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={crypto.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {crypto.trendIcon} {crypto.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Volume:</span>
                    <span className="text-gray-900">₹{crypto.volume24h.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{crypto.marketCap.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stocks Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" /> Top Stocks
          </h2>
          <div className="space-y-3 mt-8">
            {stocks.map((stock, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {stock.icon}
                    <span className="text-sm text-gray-900">{stock.name}</span>
                    <span className="text-xs text-gray-500">{stock.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{stock.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={stock.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {stock.trendIcon} {stock.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{stock.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">P/E Ratio:</span>
                    <span className="text-gray-900">{stock.peRatio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NFTs Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Image className="w-5 h-5 text-gray-600" /> Top NFTs
          </h2>
          <div className="space-y-3 mt-8">
            {nfts.map((nft, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {nft.icon}
                    <span className="text-sm text-gray-900">{nft.name}</span>
                    <span className="text-xs text-gray-500">{nft.collection}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{nft.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={nft.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {nft.trendIcon} {nft.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Total Volume:</span>
                    <span className="text-gray-900">₹{nft.totalVolume.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Owners:</span>
                    <span className="text-gray-900">{nft.owners.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commodities Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-gray-600" /> Top Commodities
          </h2>
          <div className="space-y-3 mt-8">
            {commodities.map((commodity, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {commodity.icon}
                    <span className="text-sm text-gray-900">{commodity.name}</span>
                    <span className="text-xs text-gray-500">{commodity.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{commodity.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={commodity.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {commodity.trendIcon} {commodity.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{commodity.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Supply:</span>
                    <span className="text-gray-900">{commodity.supply.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forex Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" /> Top Forex Pairs
          </h2>
          <div className="space-y-3 mt-8">
            {forexPairs.map((pair, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {pair.icon}
                    <span className="text-sm text-gray-900">{pair.name}</span>
                    <span className="text-xs text-gray-500">{pair.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{pair.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={pair.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {pair.trendIcon} {pair.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Volume:</span>
                    <span className="text-gray-900">₹{pair.volume.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Spread:</span>
                    <span className="text-gray-900">{pair.spread}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DeFi Tokens Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Coins className="w-5 h-5 text-gray-600" /> Top DeFi Tokens
          </h2>
          <div className="space-y-3 mt-8">
            {defiTokens.map((token, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {token.icon}
                    <span className="text-sm text-gray-900">{token.name}</span>
                    <span className="text-xs text-gray-500">{token.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{token.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={token.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {token.trendIcon} {token.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Total Value Locked:</span>
                    <span className="text-gray-900">₹{token.tvl.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{token.marketCap.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metaverse Tokens Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" /> Top Metaverse Tokens
          </h2>
          <div className="space-y-3 mt-8">
            {metaverseTokens.map((token, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {token.icon}
                    <span className="text-sm text-gray-900">{token.name}</span>
                    <span className="text-xs text-gray-500">{token.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{token.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={token.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                     {token.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{token.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Volume:</span>
                    <span className="text-gray-900">₹{token.volume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gaming Tokens Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Gamepad className="w-5 h-5 text-gray-600" /> Top Gaming Tokens
          </h2>
          <div className="space-y-3 mt-8">
            {gamingTokens.map((token, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {token.icon}
                    <span className="text-sm text-gray-900">{token.name}</span>
                    <span className="text-xs text-gray-500">{token.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{token.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={token.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                    {token.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{token.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Volume:</span>
                    <span className="text-gray-900">₹{token.volume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stablecoins Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-gray-600" /> Top Stablecoins
          </h2>
          <div className="space-y-3 mt-8">
            {stablecoins.map((stablecoin, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {stablecoin.icon}
                    <span className="text-sm text-gray-900">{stablecoin.name}</span>
                    <span className="text-xs text-gray-500">{stablecoin.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{stablecoin.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={stablecoin.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                     {stablecoin.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{stablecoin.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Volume:</span>
                    <span className="text-gray-900">₹{stablecoin.volume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Coins Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-600" /> Top Privacy Coins
          </h2>
          <div className="space-y-3 mt-8">
            {privacyCoins.map((coin, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {coin.icon}
                    <span className="text-sm text-gray-900">{coin.name}</span>
                    <span className="text-xs text-gray-500">{coin.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{coin.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={coin.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                     {coin.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{coin.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Volume:</span>
                    <span className="text-gray-900">₹{coin.volume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tokens Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-gray-600" /> Top AI Tokens
          </h2>
          <div className="space-y-3 mt-8">
            {aiTokens.map((token, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {token.icon}
                    <span className="text-sm text-gray-900">{token.name}</span>
                    <span className="text-xs text-gray-500">{token.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{token.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={token.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                     {token.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{token.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Volume:</span>
                    <span className="text-gray-900">₹{token.volume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Estate Tokens Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Home className="w-5 h-5 text-gray-600" /> Top Real Estate Tokens
          </h2>
          <div className="space-y-3 mt-8">
            {realEstateTokens.map((token, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {token.icon}
                    <span className="text-sm text-gray-900">{token.name}</span>
                    <span className="text-xs text-gray-500">{token.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{token.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={token.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                       {token.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{token.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Volume:</span>
                    <span className="text-gray-900">₹{token.volume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Tokens Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" /> Top Social Tokens
          </h2>
          <div className="space-y-3 mt-8">
            {socialTokens.map((token, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {token.icon}
                    <span className="text-sm text-gray-900">{token.name}</span>
                    <span className="text-xs text-gray-500">{token.symbol.toUpperCase()}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{token.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={token.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {token.trendIcon} {token.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Market Cap:</span>
                    <span className="text-gray-900">₹{token.marketCap.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Volume:</span>
                    <span className="text-gray-900">₹{token.volume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gaming NFTs Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Gamepad className="w-5 h-5 text-gray-600" /> Top Gaming NFTs
          </h2>
          <div className="space-y-3 mt-8">
            {gamingNFTs.map((nft, index) => (
              <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {nft.icon}
                    <span className="text-sm text-gray-900">{nft.name}</span>
                    <span className="text-xs text-gray-500">{nft.collection}</span>
                  </div>
                  <span className="text-sm text-gray-900">₹{nft.price.toLocaleString()}</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">24h Change:</span>
                    <span className={nft.change24h.startsWith('-') ? 'text-red-600' : 'text-green-600'}>
                      {nft.trendIcon} {nft.change24h}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Total Volume:</span>
                    <span className="text-gray-900">₹{nft.totalVolume.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Owners:</span>
                    <span className="text-gray-900">{nft.owners.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;