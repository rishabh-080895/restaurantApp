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

export interface IFooter {
  currentTotalValue: number;
  totalInvestmentValue: number;
  todaysTotalPNL: number;
  totalPNL: number;
}
