const FINNHUB_API_KEY = "cu147s1r01qjiern2jmgcu147s1r01qjiern2jn0";
const BASE_URL = "https://finnhub.io/api/v1";

// Cache duration in milliseconds (30 minutes)
const CACHE_DURATION = 30 * 60 * 1000;

export interface FinnhubQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

export interface RecommendationTrend {
  symbol: string;
  buy: number;
  hold: number;
  period: string;
  sell: number;
  strongBuy: number;
  strongSell: number;
}

export const finnhubApi = {
  async getQuote(symbol: string): Promise<FinnhubQuote> {
    const cacheKey = `quote_${symbol}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
    const now = Date.now();

    if (cachedData && cacheTimestamp && now - Number(cacheTimestamp) < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }

    const response = await fetch(
      `${BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(`${cacheKey}_timestamp`, now.toString());
    return data;
  },

  async getRecommendationTrends(symbol: string): Promise<RecommendationTrend[]> {
    const cacheKey = `recommendation_${symbol}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
    const now = Date.now();

    if (cachedData && cacheTimestamp && now - Number(cacheTimestamp) < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }

    const response = await fetch(
      `${BASE_URL}/stock/recommendation?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch recommendation trends');
    }
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(`${cacheKey}_timestamp`, now.toString());
    return data;
  },
};