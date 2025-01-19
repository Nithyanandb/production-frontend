
export interface Stock {
  changePercent: number;
  symbol: string;
  name: string;
  price: number; // Make `price` required
  quantity?: number;
  change?: number;
  percentChange?: number;
  openPrice?: number;
  previousClose?: number;
  timestamp?: number;
}
export interface FinnhubQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

export interface HistoricalData {
  time: string;
  price: number;
}