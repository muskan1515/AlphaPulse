const router = require('express').Router();
const StocksController = require('../controllers/stocks.controller');

router.get('/fii-dii-top-stocks', StocksController.topStocks);
router.get('/top-20-stocks', StocksController.top20MajorStocks);
router.get('/top-stock-news', StocksController.topStockNews);
router.get("/get-nes-stock-list", StocksController.getStockList)
router.get('/:symbol', StocksController.stockBySymbol);
router.get('/:symbol/candles', StocksController.stockCandles);

module.exports = router;
