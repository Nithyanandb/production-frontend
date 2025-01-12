import React, { Suspense } from 'react';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './components/Auth/AuthContext';
import MarketProvider from './context/MarketContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AppLayout from './components/Layout/AppLayout';
import CookieConsent from './CookieConsent';
import LoadingSpinner from '../src/components/ui/LoadingSpinner'; 
import LearnPage from './components/Header/Navigation/LearnPage';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import FundamentalAnalysisPage from './components/Header/Navigation/FundamentalAnalysisPage';
import TechnicalAnalysisPage from './components/Header/Navigation/TechnicalAnalysisPage';
import TradingStrategiesPage from './components/Header/Navigation/TradingStrategiesPage';
import Hero from './components/Hero/Hero';
import Settings from './components/Header/Settings';
import Chatbot from './Chatbot';
import PrivacyPolicy from './PrivacyPolicy';

const Features = React.lazy(() => import('./components/Features/Features'));
const Security = React.lazy(() => import('./components/Security/Security'));
const OAuthCallback = React.lazy(() => import('./components/Auth/OAuthCallback'));
const NotFound = React.lazy(() => import('./components/ErrorBoundary/NotFound'));
const FuturesTrading = React.lazy(() => import('./components/Header/Navigation/FuturesTrading'));
const MarginTrading = React.lazy(() => import('./components/Header/Navigation/MarginTrading'));
const SpotTrading = React.lazy(() => import('./components/Header/Navigation/SpotTrading'));
const OptionsTrading = React.lazy(() => import('./components/Header/Navigation/trading/OptionsTrading'));
const BuyStocks = React.lazy(() => import('./components/pages/BuyStocks/BuyStocks'));
const StockMarket = React.lazy(() => import('./components/Stock/StocksPage/StockMarket'));
const About = React.lazy(() => import('./components/Header/About/About'));
const SellStocks = React.lazy(() => import('./components/pages/SellStocks/SellStocks'));
  <Route path="/privacy" element={<PrivacyPolicy />} />
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

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Hero />
        <Suspense fallback={<LoadingSpinner />}>
          <div className="relative min-h-screen">
            <div className="fixed inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-70" />
            </div>
          </div>
        </Suspense>
       
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
 
            <div className="relative">
              <div className="relative z-10">
              <Settings />
              </div>
            </div>

    ),
  },
  { path: '/auth/callback', element: <OAuthCallback /> },
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
  { path: '/stock/buy', element: <BuyStocks /> },
  { path: '/learn/basics', element: <LearnPage /> },
  { path: '/stock/sell', element: <SellStocks /> },
  { path: '/learn/strategies', element: <TradingStrategiesPage /> },
  { path: '/learn/technical', element: <TechnicalAnalysisPage /> },
  { path: '/learn/fundamental', element: <FundamentalAnalysisPage /> },
  { path: '/trading/futures', element: <FuturesTrading /> },
  { path: '/trading/margin', element: <MarginTrading /> },
  { path: '/about', element: <About /> },
  { path: '/trading/spot', element: <SpotTrading /> },
  { path: '/trading/options', element: <OptionsTrading /> },
  { path: '*', element: <NotFound /> },
  {path: '/privacy', element: <PrivacyPolicy />}
  
]);

// Main App component
function App() {
  return (
    <div className="global-background min-h-screen overflow-hidden">
      <ErrorBoundary>
        <CookieConsent />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <MarketProvider>
              <div className="relative min-h-screen bg-black text-white antialiased font-sans">
                <RouterProvider router={router} />
                <Chatbot />
              </div>
            </MarketProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;