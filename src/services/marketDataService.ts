interface MarketData {
  symbol: string;
  lastPrice: number;
  change: number;
  percentChange: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  previousClose: number;
}

// Mock data for development
const getMockMarketData = (): { nifty: MarketData; sensex: MarketData } => {
  console.log('Generating mock market data...');
  const baseNifty = 21800 + (Math.random() * 200 - 100);
  const baseSensex = 72000 + (Math.random() * 500 - 250);

  const data = {
    nifty: {
      symbol: 'NIFTY 50',
      lastPrice: Math.round(baseNifty * 100) / 100,
      change: Math.round((baseNifty - 21750) * 100) / 100,
      percentChange: Math.round(((baseNifty - 21750) / 21750) * 10000) / 100,
      open: Math.round((baseNifty - 50) * 100) / 100,
      dayHigh: Math.round((baseNifty + 100) * 100) / 100,
      dayLow: Math.round((baseNifty - 150) * 100) / 100,
      previousClose: 21750,
    },
    sensex: {
      symbol: 'SENSEX',
      lastPrice: Math.round(baseSensex * 100) / 100,
      change: Math.round((baseSensex - 71800) * 100) / 100,
      percentChange: Math.round(((baseSensex - 71800) / 71800) * 10000) / 100,
      open: Math.round((baseSensex - 200) * 100) / 100,
      dayHigh: Math.round((baseSensex + 300) * 100) / 100,
      dayLow: Math.round((baseSensex - 400) * 100) / 100,
      previousClose: 71800,
    },
  };
  
  console.log('Mock data generated:', data);
  return data;
};

export const fetchMarketData = async (): Promise<{ nifty: MarketData; sensex: MarketData }> => {
  console.log('fetchMarketData called');
  try {
    const data = getMockMarketData();
    console.log('Successfully fetched market data:', data);
    return data;
    
    // Actual API integration code (commented out for now)
    /*
    const niftyResponse = await fetch('https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050');
    const sensexResponse = await fetch('https://api.bseindia.com/BseIndiaAPI/api/Sensex/GetSensexData');

    if (!niftyResponse.ok || !sensexResponse.ok) {
      throw new Error('Failed to fetch market data');
    }

    const niftyData = await niftyResponse.json();
    const sensexData = await sensexResponse.json();

    return {
      nifty: {
        symbol: 'NIFTY 50',
        lastPrice: niftyData.last,
        change: niftyData.change,
        percentChange: niftyData.percentChange,
        open: niftyData.open,
        dayHigh: niftyData.dayHigh,
        dayLow: niftyData.dayLow,
        previousClose: niftyData.previousClose,
      },
      sensex: {
        symbol: 'SENSEX',
        lastPrice: sensexData.last,
        change: sensexData.change,
        percentChange: sensexData.percentChange,
        open: sensexData.open,
        dayHigh: sensexData.dayHigh,
        dayLow: sensexData.dayLow,
        previousClose: sensexData.previousClose,
      },
    };
    */
  } catch (error) {
    console.error('Error in fetchMarketData:', error);
    throw error;
  }
}; 