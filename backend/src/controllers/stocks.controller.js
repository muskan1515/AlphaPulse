const StocksService = require("../services/stocks.service");

class StocksController {
  static async topStocks(req, res) {
    try {
      const stocks = await StocksService.getTopStocks();
      res.json(stocks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async topStockNews(req, res) {
    try {
      const stockNews = await StocksService.top20MajorStockNews();
      res.json(stockNews);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async top20MajorStocks(req, res) {
    try {
      const stocks = await StocksService.top20MajorStocks();
      res.json(stocks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async stockBySymbol(req, res) {
    try {
      const { symbol } = req.params;
      const stock = await StocksService.getStockBySymbol(symbol);
      res.json(stock);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async stockCandles(req, res) {
    try {
      const { symbol } = req.params;
      const candles = await StocksService.getStockCandles(symbol);
      res.json(candles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getStockList(req, res) {
    try {
      const list = await StocksService.getStockList();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = StocksController;
