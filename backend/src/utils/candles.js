// candles.js
const axios = require("axios");

const getCandles = async (symbol, resolution = "5", from, to) => {
  try {
    const apiKey = process.env.FINNHUB_API_KEY;
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${apiKey}`;

    const { data } = await axios.get(url);

    if (data.s !== "ok") {
      console.error("Error fetching candles:", data);
      return;
    }

    const formattedData = data.t.map((timestamp, i) => ({
      time: new Date(timestamp * 1000).toLocaleString(),
      open: data.o[i],
      high: data.h[i],
      low: data.l[i],
      close: data.c[i],
      volume: data.v[i],
    }));
    
    return formattedData;
  } catch (err) {
    console.error("Error fetching candles:", err.message);
  }
};


module.exports = { getCandles };
