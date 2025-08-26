const router = require('express').Router();
const StocksController = require('../controllers/stocks.controller');

router.get('/top', StocksController.topStocks);
router.get('/:symbol', StocksController.stockBySymbol);
router.get('/:symbol/candles', StocksController.stockCandles);

module.exports = router;
