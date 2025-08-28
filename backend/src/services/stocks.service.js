// const Redis = require("ioredis");
const { aIClient } = require("../utils/aiClient");
const { getCandles } = require("../utils/candles");
const { fetchNSEStockList } = require("../utils/stock_list");
// const redis = new Redis(process.env.REDIS_URL);

class StocksService {
  static async getTopStocks() {
    // const cached = await redis.get("top_stocks");
    // if (cached) return JSON.parse(cached);

    const stocks = await aIClient("top-fii_dii_stocks", {}, "GET");

    // await redis.set("top_stocks", JSON.stringify(stocks), "EX", 60);
    return stocks;
  }

  static async top20MajorStocks() {
    // const cached = await redis.get("top_20_major_stocks");
    // if (cached) return JSON.parse(cached);

    const stocks = await aIClient("top-20-stocks", {}, "GET");
    // await redis.set("top_20_major_stocks", JSON.stringify(stocks), "EX", 3600);
    return stocks;
  }

  static async top20MajorStockNews() {
    // const cached = await redis.get("top-20-stock-news");
    // if (cached) return JSON.parse(cached);

    const stockNews = await aIClient("top-20-stock-news", {}, "GET");
    // await redis.set("top-20-stock-news", JSON.stringify(stocks), "EX", 3600);
    return stockNews;
  }

  static async getStockBySymbol(symbol) {
    // const cached = await redis.get(`stock:${symbol}`);
    // if (cached) return JSON.parse(cached);

    // await redis.set(`stock:${symbol}`, JSON.stringify(stock), "EX", 60);
    return stock;
  }

  static async getStockCandles(symbol, interval = "1", limit = 30) {
    // const cached = await redis.get(`candles:${symbol}`);
    // if (cached) return JSON.parse(cached);

    const now = Math.floor(Date.now() / 1000);
    const from = now - limit * 24 * 60 * 60;

    const candles = await getCandles(symbol, interval, from, to);

    // await redis.set(`candles:${symbol}`, JSON.stringify(candles), "EX", 60);
    return candles;
  }

  static async getStockList() {
    try {
      // const cached = await redis.get(`nse_stock_list`);
      // if (cached) return JSON.parse(cached);

      const list = await fetchNSEStockList();
      // await redis.set(`nse_stock_list`, JSON.stringify(list), "EX", 43200);
      return list;
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = StocksService;
