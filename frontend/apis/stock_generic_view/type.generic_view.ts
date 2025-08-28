export interface fii_dii_stocks_response {
  ticker: string;
  sr: number;
  stock_name: string;
  links: string;
  percent_change: number;
  price: number;
  volume: number;
  fii: number;
  dii: number;
  sentiment: number;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
export interface HolderData {
  Holder: string;
  Shares: number;
  "Date Reported": string;
}

export interface StockData {
  sr: number;
  stock_name: string;
  symbol: string;
  links: string;
  "%chg": number;           // use the same as in API
  price: number;
  volume: number;
  fii: number;              // FII/DII flag
  sentiment: number;
  sector: string;
  industry: string;
  market_cap: number;
  holders: HolderData[];
}

export interface SectorData {
  total_stocks: number;
  avg_sentiment: number;
  total_market_cap: number;
  symbols: string[];
}

export interface FiiDiiApiResponse {
  stocks: Record<string, StockData>;  // key is stock symbol
  sectors: Record<string, SectorData>;
}
