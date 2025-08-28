import API from "@/lib/api";
import { NSEStock, top_20_major_stocks_news_response, top_20_major_stocks_response } from "./type.home_page";

export const top20MajorStocks = async (
): Promise<top_20_major_stocks_response[]> => {
  const { data } = await API.get('/api/stocks/top-20-stocks');
  return data
};

export const majorNews = async (
): Promise<top_20_major_stocks_news_response[]> => {
  const { data } = await API.get("/api/stocks/top-stock-news");
  return data;
};

export const getNSEStockList = async (
): Promise<NSEStock[]> => {
  const { data } = await API.get("/api/stocks/get-nes-stock-list");
  return data;
};

export const fii_dii_top_stocks = async (
): Promise<top_20_major_stocks_response[]> => {
  const { data } = await API.get('/api/stocks/fii-dii-top-stocks');
  return data
};
