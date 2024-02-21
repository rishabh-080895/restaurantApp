import {PortfolioResponse} from '../type';

async function Api(apiUrl: string): Promise<PortfolioResponse> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: PortfolioResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching stock portfolio data failed:', error);
    throw error;
  }
}

export {Api};
