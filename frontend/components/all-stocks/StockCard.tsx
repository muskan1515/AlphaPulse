"use client";
import React from "react";
import { StockData } from "@/apis/stock_generic_view/type.generic_view";

interface Props {
  stock: StockData;
}

const StockCard: React.FC<Props> = ({ stock }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{stock.stock_name}</h3>
        <span className={`font-semibold ${stock['%chg'] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {stock['%chg'] >= 0 ? `+${stock['%chg']}%` : `${stock['%chg']}%`}
        </span>
      </div>
      <div className="text-sm text-gray-600 mb-2">{stock.symbol} | {stock.sector}</div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Price: ₹{stock.price}</div>
        <div>Volume: {stock.volume.toLocaleString()}</div>
        <div>Market Cap: ₹{(stock.market_cap / 1e9).toFixed(2)}B</div>
        <div>Sentiment: {stock.sentiment}</div>
      </div>
      <div className="mt-2 text-xs text-blue-600">
        Links: {stock.links}
      </div>
    </div>
  );
};

export default StockCard;
