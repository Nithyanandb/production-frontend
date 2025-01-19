import { ReactNode } from "react";

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

export interface PortfolioStats {
  dailyPerformance: Array<{
    date: string;
    value: number;
  }>;
  totalInvestment: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Transaction {
  id: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  totalAmount: number;
  date: string;
  status: string;
}


export interface PortfolioHolding {
  name: ReactNode;

  symbol: string;

  quantity: number;

  averagePrice: number;

  currentPrice: number;

  marketValue?: number;

  totalReturn?: number;

}


export interface DailyPerformance {
  date: string;
  value: number;
  change: number;
}

export interface PortfolioAction {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  quantity: number;
  price: number;
  timestamp: string;
}

export const formatMoney = (value: number): string => {

  return new Intl.NumberFormat('en-US', {

    style: 'currency',

    currency: 'USD'

  }).format(value);

};



export const formatPercent = (value: number): string => {

  return new Intl.NumberFormat('en-US', {

    style: 'percent',

    minimumFractionDigits: 2,

    maximumFractionDigits: 2

  }).format(value / 100);

};

export interface LoginActivityData {
  date: string;
  count: number;
  details?: {
    browser: string;
    platform: string;
    location?: string;
  };
}

export interface ActivityStats {
  totalLogins: number;
  averagePerDay: number;
  mostActiveDay: {
    date: string;
    count: number;
  };
  lastSevenDays: {
    dates: string[];
    counts: number[];
  };
}