// backend/src/utils/stock_list.js
const axios = require("axios");

const fetchNSEStockList = async () => {
  try {
    const url = "https://archives.nseindia.com/content/equities/EQUITY_L.csv";

    const response = await axios.get(url);
    const csvData = response.data;

    // Convert CSV into JSON
    const rows = csvData.split("\n").map((row) => row.split(","));
    const headers = rows[0];
    const stocks = rows.slice(1).map((row) => {
      let obj = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = row[i]?.trim();
      });
      return obj;
    });

    return stocks;
  } catch (err) {
    console.log("Error fetching stock list:", err.message);
    return [];
  }
}

module.exports = { fetchNSEStockList };
