// data.ts
export const generateMockPrice = (basePrice: number, volatility = 0.001) => {
  const change = basePrice * volatility * (Math.random() - 0.5);
  return Number((basePrice + change).toFixed(2));
};

export const MOCK_INDICES = {
  USA: [
    { symbol: 'SPX', name: 'S&P 500', basePrice: 4500 },
    { symbol: 'DJI', name: 'Dow Jones', basePrice: 35000 },
    { symbol: 'IXIC', name: 'NASDAQ', basePrice: 14000 },
    { symbol: 'TSX', name: 'Toronto SE', basePrice: 20000 },
    { symbol: 'BOVESPA', name: 'Brazil BOVESPA', basePrice: 118000 }
  ],
  Europe: [
    { symbol: 'FTSE', name: 'FTSE 100', basePrice: 7500 },
    { symbol: 'DAX', name: 'German DAX', basePrice: 15800 },
    { symbol: 'CAC', name: 'French CAC 40', basePrice: 7300 },
    { symbol: 'STOXX50E', name: 'Euro STOXX 50', basePrice: 4300 },
    { symbol: 'FTSEMIB', name: 'Italy FTSE MIB', basePrice: 28000 }
  ],
  AsiaPacific: [
    { symbol: 'N225', name: 'Nikkei 225', basePrice: 32000 },
    { symbol: 'HSI', name: 'Hang Seng', basePrice: 18000 },
    { symbol: 'AXJO', name: 'ASX 200', basePrice: 7200 },
    { symbol: 'SENSEX', name: 'BSE SENSEX', basePrice: 65000 },
    { symbol: 'KOSPI', name: 'KOSPI', basePrice: 2500 }
  ],
  India: [
    { symbol: 'NSEI', name: 'Nifty 50', basePrice: 18000 },
    { symbol: 'BSESN', name: 'BSE Sensex', basePrice: 60000 },
    { symbol: 'NIFTYBANK', name: 'Nifty Bank', basePrice: 42000 },
    { symbol: 'NIFTYIT', name: 'Nifty IT', basePrice: 35000 },
    { symbol: 'NIFTYMID50', name: 'Nifty Midcap 50', basePrice: 12000 }
  ],
  China: [
    { symbol: 'SSEC', name: 'Shanghai Composite', basePrice: 3300 },
    { symbol: 'SZSC', name: 'Shenzhen Component', basePrice: 12000 },
    { symbol: 'HSI', name: 'Hang Seng China Enterprises', basePrice: 8000 },
    { symbol: 'CSI300', name: 'CSI 300', basePrice: 5000 },
    { symbol: 'GEM', name: 'ChiNext', basePrice: 2800 }
  ]
};

const generateHistoricalData = (basePrice: number, points = 100) => {
  const data = [];
  let currentPrice = basePrice;

  for (let i = 0; i < points; i++) {
    // Introduce a slight bias to simulate trends (e.g., 50% chance of upward bias)
    const bias = Math.random() > 0.5 ? 0.0001 : -0.0001; // Small bias for trends
    currentPrice = generateMockPrice(currentPrice + currentPrice * bias, 0.001); // Smaller volatility
    data.push(currentPrice);
  }

  return data;
};

export const generateMockMarketData = () => {
  const results: Record<string, any[]> = {};

  Object.entries(MOCK_INDICES).forEach(([region, indices]) => {
    results[region] = indices.map(index => {
      const historicalData = generateHistoricalData(index.basePrice);
      const currentPrice = historicalData[historicalData.length - 1];
      const previousPrice = historicalData[historicalData.length - 2];
      const change = currentPrice - previousPrice;
      const changePercent = (change / previousPrice) * 100;

      return {
        symbol: index.symbol,
        name: index.name,
        price: currentPrice,
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        high: Math.max(...historicalData),
        low: Math.min(...historicalData),
        volume: Math.floor(Math.random() * 1000000) + 500000,
        previousClose: previousPrice,
        timestamp: Date.now(),
        region,
        historicalData
      };
    });
  });

  return results;
};