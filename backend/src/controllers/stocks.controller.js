const StocksService = require('../services/stocks.service');

class StocksController {
  static async topStocks(req, res) {
    try {
      const stocks = await StocksService.getTopStocks();
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
}

module.exports = StocksController;
