import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './components/Auth/AuthContext';
import { MarketProvider } from './context/MarketContext';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import DynamicBackground from './components/background/DynamicBackground';
import { ProtectedRoute } from './components/routes/ProtectedRoute';

// Page Components
import AppLayout from './components/Layout/AppLayout';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Security from './components/Security/Security';
import OAuthCallback from './components/Auth/OAuthCallback';
import NotFound from './components/ErrorBoundary/NotFound';
import {
  FundamentalAnalysisPage,
  LearnPage,
  TechnicalAnalysisPage,
  TradingStrategiesPage,
} from './components/Header/Navigation/Learn';
import FuturesTrading from './components/Header/Navigation/FuturesTrading';
import MarginTrading from './components/Header/Navigation/MarginTrading';
import SpotTrading from './components/Header/Navigation/SpotTrading';
import OptionsTrading from './components/Header/Navigation/trading/OptionsTrading';
import BuyStocks from './components/pages/BuyStocks/BuyStocks';
import { PortfolioDashboard } from './components/portfolio/PortfolioDashboard';
import StockMarket from './components/Stock/StocksPage/StockMarket';
import About from './components/Header/About/About';
import CookieConsent from './CookieConsent';
import SellStocks from './components/pages/SellStocks/SellStocks';

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

// Enhanced background configuration
const backgroundSections = [
  {
    type: 'gradient',
    content: {
      colors: ['rgba(0,0,0,0.95)', 'rgba(17,24,39,0.95)'],
    },
    effects: {
      grid: {
        size: 40,
        opacity: 0.03,
        color: 'rgba(255, 143, 113, 0.5)',
      },
      glowSpots: [
        {
          color: 'rgba(239, 45, 26, 0.15)',
          position: { x: '25%', y: '25%' },
          size: '600px',
        },
        {
          color: 'rgba(255, 143, 113, 0.15)',
          position: { x: '75%', y: '75%' },
          size: '600px',
        },
      ],
      noise: {
        opacity: 0.015,
        blendMode: 'overlay',
      },
    },
  },
];

// Create router configuration with enhanced styling
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <AppLayout d={undefined}>
          <div className="relative min-h-screen">
            <DynamicBackground sections={backgroundSections} currentSection={0} />
            <div className="relative z-10 overflow-auto custom-scrollbar">
              <div className="space-y-32 pb-32">
                <section className="min-h-screen flex-center transition-all duration-1000">
                  <Hero />
                </section>
                <section className="min-h-screen flex-center transition-all duration-1000">
                  <Features />
                </section>
                <section className="min-h-screen h-[50%] flex-center transition-all duration-1000">
                  <Security />
                </section>
              </div>
            </div>

            {/* Premium gradient overlays */}
            <div className="fixed inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-70" />
            </div>
          </div>
        </AppLayout>
      ),
    },
    {
      path: '/portfolio',
      element: (
        <ProtectedRoute>
          <AppLayout d={undefined}>
            <div className="relative">
              <DynamicBackground sections={backgroundSections} currentSection={0} />
              <div className="relative z-10">
                <PortfolioDashboard />
              </div>
            </div>
          </AppLayout>
        </ProtectedRoute>
      ),
    },
    { path: '/auth/callback', element: <OAuthCallback /> },
    {
      path: '/stock/all',
      element: (
        <QueryClientProvider client={queryClient}>
          <StockMarket />
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
    { path: '/about', element: <About/> },
    { path: '/trading/spot', element: <SpotTrading /> },
    { path: '/trading/options', element: <OptionsTrading /> },
    { path: '*', element: <NotFound /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true, 
    },
  }
);

// Main App component with enhanced providers and styling
function App() {
  return (
    <div className="global-background min-h-screen">
      <ErrorBoundary>
        <CookieConsent />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <MarketProvider>
              <div className="relative min-h-screen bg-black text-white antialiased font-sans">
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