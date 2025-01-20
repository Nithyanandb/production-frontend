import React, { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './components/Auth/AuthContext';
import MarketProvider from './components/routes/MarketContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AppLayout from './components/Layout/AppLayout';
import CookieConsent from './Asserts/CookieConsent';
import LoadingSpinner from '../src/components/ui/LoadingSpinner';
import LearnPage from './components/Header/Navigation/LearnPage';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import FundamentalAnalysisPage from './components/Header/Navigation/FundamentalAnalysisPage';
import TechnicalAnalysisPage from './components/Header/Navigation/TechnicalAnalysisPage';
import TradingStrategiesPage from './components/Header/Navigation/TradingStrategiesPage';
import Hero from './components/Hero/Hero';
import Settings from './components/Header/Settings';
import PrivacyPolicy from './Asserts/PrivacyPolicy';
import './App.css';

// Lazy-loaded components
const OAuthCallback = React.lazy(() => import('./components/Auth/OAuthCallback'));
const NotFound = React.lazy(() => import('./components/ErrorBoundary/NotFound'));
const FuturesTrading = React.lazy(() => import('./components/Header/Navigation/FuturesTrading'));
const MarginTrading = React.lazy(() => import('./components/Header/Navigation/MarginTrading'));
const SpotTrading = React.lazy(() => import('./components/Header/Navigation/SpotTrading'));
const OptionsTrading = React.lazy(() => import('./components/Header/Navigation/trading/OptionsTrading'));
const BuyStocks = React.lazy(() => import('./components/pages/BuyStocks/BuyStocks'));
const StockMarket = React.lazy(() => import('./components/pages/AllStocks/StockMarket'));
const About = React.lazy(() => import('./components/Header/About/About'));
const SellStocks = React.lazy(() => import('./components/pages/SellStocks/SellStocks'));

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Preload function for lazy-loaded components
const preloadLazyComponents = () => {
  const componentsToPreload = [
    () => import('./components/pages/BuyStocks/BuyStocks'),
    () => import('./components/pages/AllStocks/StockMarket'),
  ];

  componentsToPreload.forEach((component) => component());
};

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Hero />
      </AppLayout>
    ),
  },
  {
    path: '/portfolio',
    element: (
      <ProtectedRoute>
        <AppLayout>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="relative">
              <div className="relative z-10">
                <PortfolioDashboard />
              </div>
            </div>
          </Suspense>
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <AppLayout>
        <div className="relative">
          <div className="relative z-10">
            <Settings />
          </div>
        </div>
      </AppLayout>
    ),
  },
  {
    path: '/auth/callback',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <OAuthCallback />
      </Suspense>
    ),
  },
  {
    path: '/stock/all',
    element: (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner />}>
          <StockMarket />
        </Suspense>
      </QueryClientProvider>
    ),
  },
  {
    path: '/stock/buy',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <BuyStocks />
      </Suspense>
    ),
  },
  {
    path: '/stock/sell',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SellStocks />
      </Suspense>
    ),
  },
  { path: '/learn/basics', element: <LearnPage /> },
  { path: '/learn/strategies', element: <TradingStrategiesPage /> },
  { path: '/learn/technical', element: <TechnicalAnalysisPage /> },
  { path: '/learn/fundamental', element: <FundamentalAnalysisPage /> },
  {
    path: '/trading/futures',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <FuturesTrading />
      </Suspense>
    ),
  },
  {
    path: '/trading/margin',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MarginTrading />
      </Suspense>
    ),
  },
  {
    path: '/trading/spot',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SpotTrading />
      </Suspense>
    ),
  },
  {
    path: '/trading/options',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <OptionsTrading />
      </Suspense>
    ),
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: '/privacy',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

// Main App component
function App() {
  useEffect(() => {
    // Preload the lazy-loaded components when the app starts
    preloadLazyComponents();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <ErrorBoundary>
        <CookieConsent />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <MarketProvider>
              <div className="relative min-h-screen bg-white text-gray-900 antialiased font-sans">
                <RouterProvider router={router} />
              </div>
            </MarketProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;