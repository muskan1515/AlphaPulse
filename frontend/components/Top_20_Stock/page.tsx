'use client'

import { top_20_major_stocks_response } from "@/apis/home_page/type.home_page";
import React, { useEffect, useState } from "react";
import StockCard from "./Card";
import { top20MajorStocks } from "@/apis/home_page/api.home_page";

const TopStocks: React.FC = () => {
  const [stocks, setStocks] = useState<top_20_major_stocks_response[]>([]);

  useEffect(() => {
    getAllTopStocks();
  }, []);

  const getAllTopStocks = async () => {
    try {
      const response = await top20MajorStocks();
      setStocks(response);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stocks.map((stock) => (
        <StockCard key={stock.ticker} stock={stock} />
      ))}
    </div>
  );
};

export default TopStocks;
