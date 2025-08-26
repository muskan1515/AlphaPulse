const Redis = require("ioredis");
const { default: aIClient } = require("../utils/aiClient");

const redis = new Redis(process.env.REDIS_URL);

class StocksService {
  static async getTopStocks() {
    const cached = await redis.get("top_stocks");
    if (cached) return JSON.parse(cached);

    const stocks = await aIClient("/top-fii_dii_stocks", {}, "GET");

    await redis.set("top_stocks", JSON.stringify(stocks), "EX", 60);
    return stocks;
  }

  static async getStockBySymbol(symbol) {
    const cached = await redis.get(`stock:${symbol}`);
    if (cached) return JSON.parse(cached);

    // Mock stock detail
    const stock = {
      symbol,
      name: `Stock ${symbol}`,
      price: (Math.random() * 500).toFixed(2),
      change: ((Math.random() - 0.5) * 10).toFixed(2),
      volume: Math.floor(Math.random() * 10000),
      open: (Math.random() * 500).toFixed(2),
      close: (Math.random() * 500).toFixed(2),
      high: (Math.random() * 500).toFixed(2),
      low: (Math.random() * 500).toFixed(2),
    };

    await redis.set(`stock:${symbol}`, JSON.stringify(stock), "EX", 60);
    return stock;
  }

  static async getStockCandles(symbol, interval = "1d", limit = 30) {
    const cached = await redis.get(`candles:${symbol}`);
    if (cached) return JSON.parse(cached);

    // Mock candles
    const candles = [];
    for (let i = 0; i < limit; i++) {
      const open = Math.random() * 500;
      const close = open + (Math.random() - 0.5) * 10;
      candles.push({
        timestamp: Date.now() - i * 86400000,
        open: open.toFixed(2),
        close: close.toFixed(2),
        high: Math.max(open, close).toFixed(2),
        low: Math.min(open, close).toFixed(2),
        volume: Math.floor(Math.random() * 10000),
      });
    }

    await redis.set(`candles:${symbol}`, JSON.stringify(candles), "EX", 60);
    return candles;
  }
}

module.exports = StocksService;
