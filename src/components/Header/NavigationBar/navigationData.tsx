import React from 'react';
import {
  BarChart2,
  DollarSign,
  PieChart,
  Briefcase,
  TrendingUp,
  Landmark,
  LineChart,
  BookOpen,
  Target,
  Building2,
  Laptop,
  Brain,
  Wallet,
  ArrowUpDown,
  BookText,
  GraduationCap,
  TrendingDown,
  Lightbulb,
  Newspaper
} from 'lucide-react';

export const marketsData = {
  label: 'Markets',
  icon: <BarChart2 size={18} />,
  content: {
    right: [
      {
        title: 'Stock Market',
        links: [
          {
            href: '/stock/all',
            icon: <BarChart2 size={20} />,
            title: 'All Stocks',
            description: 'View all available stocks',
          },
          {
            href: '/stock/buy',
            icon: <DollarSign size={20} />,
            title: 'Buy Stocks',
            description: 'Start investing today',
          },
          {
            href: '/stock/sell',
            icon: <PieChart size={20} />,
            title: 'Sell Stocks',
            description: 'Manage your portfolio',
          },
          {
            href: '/stock/watchlist',
            icon: <Target size={20} />,
            title: 'Watchlist',
            description: 'Track your favorite stocks',
          },
        ],
      },
      {
        title: 'Market Indices',
        links: [
          {
            href: '/indices/nifty',
            icon: <BarChart2 size={20} />,
            title: 'NIFTY 50',
            description: 'Top 50 companies in India',
          },
          {
            href: '/indices/sensex',
            icon: <LineChart size={20} />,
            title: 'SENSEX',
            description: 'Benchmark index of BSE',
          },
          {
            href: '/indices/banknifty',
            icon: <Landmark size={20} />,
            title: 'BANK NIFTY',
            description: 'Banking sector performance',
          },
          {
            href: '/indices/global',
            icon: <TrendingUp size={20} />,
            title: 'Global Indices',
            description: 'Track worldwide markets',
          },
        ],
      },
    ],
  },
};

export const tradingData = {
  label: 'Trading',
  icon: <TrendingUp size={18} />,
  content: {
    right: [
      {
        title: 'Trading Options',
        links: [
          {
            href: '/trading/spot',
            icon: <ArrowUpDown size={20} />,
            title: 'Spot Trading',
            description: 'Trade instantly',
          },
          {
            href: '/trading/margin',
            icon: <Wallet size={20} />,
            title: 'Margin Trading',
            description: 'Leverage your trades',
          },
          {
            href: '/trading/futures',
            icon: <TrendingUp size={20} />,
            title: 'Futures',
            description: 'Trade with contracts',
          },
          {
            href: '/trading/options',
            icon: <TrendingDown size={20} />,
            title: 'Options',
            description: 'Advanced derivatives',
          },
        ],
      },
      {
        title: 'Advanced Trading',
        links: [
          {
            href: '/trading/algo',
            icon: <Laptop size={20} />,
            title: 'Algo Trading',
            description: 'Automate your trades',
          },
          {
            href: '/trading/derivatives',
            icon: <Building2 size={20} />,
            title: 'Derivatives',
            description: 'Advanced trading tools',
          },
          {
            href: '/trading/analysis',
            icon: <Brain size={20} />,
            title: 'Technical Analysis',
            description: 'Advanced charting tools',
          },
        ],
      },
    ],
  },
};

export const learnData = {
  label: 'Learn',
  icon: <BookOpen size={18} />,
  content: {
    right: [
      {
        title: 'Learning Paths',
        links: [
          {
            href: '/learn/basics',
            icon: <BookText size={20} />,
            title: 'Trading Basics',
            description: 'Start your trading journey',
          },
          {
            href: '/learn/technical',
            icon: <LineChart size={20} />,
            title: 'Technical Analysis',
            description: 'Master chart patterns',
          },
          {
            href: '/learn/fundamental',
            icon: <Briefcase size={20} />,
            title: 'Fundamental Analysis',
            description: 'Understand company valuations',
          },
        ],
      },
      {
        title: 'Resources',
        links: [
          {
            href: '/learn/strategies',
            icon: <Lightbulb size={20} />,
            title: 'Trading Strategies',
            description: 'Learn proven methods',
          },
          {
            href: '/learn/news',
            icon: <Newspaper size={20} />,
            title: 'Market News',
            description: 'Stay updated with markets',
          },
          {
            href: '/learn/certification',
            icon: <GraduationCap size={20} />,
            title: 'Certifications',
            description: 'Get certified in trading',
          },
        ],
      },
    ],
  },
};