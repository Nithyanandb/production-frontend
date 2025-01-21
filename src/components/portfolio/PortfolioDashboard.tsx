import React, { useState, useEffect, useRef } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import PortfolioTable from './PortfolioTable';
import portfolioApi from './Asserts/portfolioApi';
import { Portfolio } from './Asserts/Portfolio';
import useAuth from '../hooks/useAuth';
import './portfolioDashboard.css';

const CACHE_KEY = 'pageViewsCache';

const getCachedPageViews = (): { date: string; count: number }[] => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  return cachedData ? JSON.parse(cachedData) : [];
};

const setCachedPageViews = (data: { date: string; count: number }[]) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
};

const calculatePortfolioValue = (portfolio: Portfolio[]) => {
  return portfolio.reduce((total, holding) => {
    const value = holding.value || 0;
    return total + value;
  }, 0);
};

const aggregateWeeklyPageViews = (data: { date: string; count: number }[]) => {
  const weeklyData: { [key: string]: number } = {};

  data.forEach((entry) => {
    const date = new Date(entry.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];

    weeklyData[weekKey] = (weeklyData[weekKey] || 0) + entry.count;
  });

  return Object.keys(weeklyData).map((weekKey) => ({
    date: weekKey,
    count: weeklyData[weekKey],
  }));
};

const filterLastYearData = (data: { date: string; count: number }[]) => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  return data.filter((entry) => new Date(entry.date) >= oneYearAgo);
};

const PortfolioDashboard: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [pageViews, setPageViews] = useState<{ date: string; count: number }[]>(() => {
    return getCachedPageViews();
  });
  const [weeklyPageViews, setWeeklyPageViews] = useState<{ date: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, user, token } = useAuth();

  const prevPortfolioValueRef = useRef<number>(0);
  const portfolioValue = calculatePortfolioValue(portfolio);

  useEffect(() => {
    prevPortfolioValueRef.current = portfolioValue;
  }, [portfolioValue]);

  useEffect(() => {
    if (isAuthenticated) {
      const today = new Date().toISOString().split('T')[0];
      const cachedPageViews = getCachedPageViews();
      const updatedPageViews = [...cachedPageViews];
      const existingEntryIndex = updatedPageViews.findIndex((entry) => entry.date === today);

      if (existingEntryIndex !== -1) {
        updatedPageViews[existingEntryIndex].count += 1;
      } else {
        updatedPageViews.push({ date: today, count: 1 });
      }

      setCachedPageViews(updatedPageViews);
      setPageViews(updatedPageViews);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const weeklyData = aggregateWeeklyPageViews(pageViews);
    setWeeklyPageViews(weeklyData);
  }, [pageViews]);

  useEffect(() => {
    if (isAuthenticated && user && token) {
      fetchData();
    } else {
      setPortfolio([]);
      setPageViews([]);
      setWeeklyPageViews([]);
      setIsLoading(false);
      setError(null);
    }
  }, [isAuthenticated, user, token]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [portfolioRes, statsRes] = await Promise.all([
        portfolioApi.getPortfolio(),
        portfolioApi.getPortfolioStats(),
      ]);

      if (portfolioRes.data?.success && statsRes.data?.success) {
        setPortfolio(portfolioRes.data.data || []);
      } else {
        setError('Failed to fetch portfolio data');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-black">Please log in to view your Portfolio.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex pt-32">
      {/* Sidebar */}
      <div className="w-96 bg-gray-50 p-6 border-r border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Login Activity</h2>
        <CalendarHeatmap
          startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
          endDate={new Date()}
          values={filterLastYearData(weeklyPageViews)}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            if (value.count === 0) {
              return 'color-custom-0';
            } else if (value.count <= 3) {
              return 'color-custom-1';
            } else if (value.count <= 6) {
              return 'color-custom-2';
            } else if (value.count <= 9) {
              return 'color-custom-3';
            } else {
              return 'color-custom-4';
            }
          }}
          showWeekdayLabels={true}
          onClick={(value) => {
            if (value) {
              alert(`Week of ${value.date}: ${value.count} page views`);
            }
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          {user && (
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-xl font-medium text-green-600">
                  Portfolio Value: ₹{portfolioValue.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </header>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Holdings</h2>
          <PortfolioTable data={portfolio} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;