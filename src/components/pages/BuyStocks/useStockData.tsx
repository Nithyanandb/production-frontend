import { useState, useEffect, startTransition } from 'react';

interface StockHolding {
  symbol: string;
  quantity: number;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  highPrice?: number;
  lowPrice?: number;
  openPrice?: number;
  previousClose?: number;
  name?: string;
}

const useStockData = (holdings: StockHolding[], currentPage: number, itemsPerPage: number) => {
  const [updatedHoldings, setUpdatedHoldings] = useState<StockHolding[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = 'ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g'; // Replace with your Finnhub API key

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const holdingsToFetch = holdings.slice(startIndex, endIndex);

        const updated = await Promise.all(
          holdingsToFetch.map(async (holding) => {
            try {
              const quoteResponse = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${holding.symbol}&token=${API_KEY}`
              );
              const quoteData = await quoteResponse.json();

              if (!quoteData || !quoteData.c) {
                return {
                  ...holding,
                  currentPrice: 0,
                  change: 0,
                  changePercent: 0,
                  highPrice: 0,
                  lowPrice: 0,
                  openPrice: 0,
                  previousClose: 0,
                };
              }

              return {
                ...holding,
                currentPrice: quoteData.c,
                change: quoteData.d,
                changePercent: quoteData.dp,
                highPrice: quoteData.h,
                lowPrice: quoteData.l,
                openPrice: quoteData.o,
                previousClose: quoteData.pc,
              };
            } catch (err) {
              console.error(`Failed to fetch data for ${holding.symbol}:`, err);
              return {
                ...holding,
                currentPrice: 0,
                change: 0,
                changePercent: 0,
                highPrice: 0,
                lowPrice: 0,
                openPrice: 0,
                previousClose: 0,
              };
            }
          })
        );

        startTransition(() => {
          setUpdatedHoldings(updated);
        });
      } catch (err) {
        startTransition(() => {
          setError('Failed to fetch stock data. Please try again later.');
        });
      } finally {
        startTransition(() => {
          setLoading(false);
        });
      }
    };

    if (holdings.length > 0) {
      fetchStockData();
    }
  }, [holdings, currentPage, itemsPerPage]);

  return { updatedHoldings, loading, error };
};

export default useStockData;