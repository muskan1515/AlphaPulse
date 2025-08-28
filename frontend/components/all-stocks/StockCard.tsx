"use client";
import React from "react";
import { StockData } from "@/apis/stock_generic_view/type.generic_view";

interface Props {
  stock: StockData;
}

const StockCard: React.FC<Props> = ({ stock }) => {
  const changePositive = stock['%chg'] >= 0;

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-2xl transition duration-300 bg-white hover:bg-gray-50 transform hover:-translate-y-1">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{stock.stock_name}</h3>
        <span
          className={`font-semibold px-2 py-1 rounded-lg ${
            changePositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {changePositive ? `+${stock['%chg']}%` : `${stock['%chg']}%`}
        </span>
      </div>

      {/* Symbol & Sector */}
      <div className="text-sm text-gray-500 mb-3">{stock.symbol} | {stock.sector}</div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-blue-50 p-2 rounded shadow-sm">Price: <span className="font-semibold">₹{stock.price}</span></div>
        <div className="bg-yellow-50 p-2 rounded shadow-sm">Volume: <span className="font-semibold">{stock.volume.toLocaleString()}</span></div>
        <div className="bg-purple-50 p-2 rounded shadow-sm">Market Cap: <span className="font-semibold">₹{(stock.market_cap / 1e9).toFixed(2)}B</span></div>
        <div className="bg-gray-100 p-2 rounded shadow-sm">Sentiment: <span className="font-semibold">{stock.sentiment}</span></div>
      </div>

      {/* Links */}
      <div className="mt-3 text-xs text-blue-600 font-medium">
        Links: {stock.links}
      </div>
    </div>
  );
};

export default StockCard;
