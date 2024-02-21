export interface StockData {
  avgPrice: number;
  close: number;
  ltp: number;
  quantity: number;
  symbol: string;
}

export interface PortfolioResponse {
  userHolding: StockData[];
}
