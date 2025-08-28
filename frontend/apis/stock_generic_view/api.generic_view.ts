import API from "@/lib/api";
import { CandleData, FiiDiiApiResponse } from "./type.generic_view";

export const top_fii_dii_stocks = async (): Promise<
  FiiDiiApiResponse
> => {
  const { data } = await API.get("/api/stocks/fii-dii-top-stocks");
  return data;
};

export const majorNews = async (symbol: string): Promise<CandleData[]> => {
  const { data } = await API.get(`/api/stocks/${symbol}/candles`);
  return data;
};
