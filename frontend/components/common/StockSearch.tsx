"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NSEStock } from "@/apis/home_page/type.home_page";
import { getNSEStockList } from "@/apis/home_page/api.home_page";

const StockSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [stocks, setStocks] = useState<NSEStock[]>([]);

  useEffect(() => {
    fetchStockList();
  }, []);

  const fetchStockList = async () => {
    try {
      const res = await getNSEStockList();
      setStocks(res);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = stocks.filter(
    (stock) =>
      String(stock?.["SYMBOL"])?.toLowerCase().includes(query.toLowerCase()) ||
      String(stock?.["NAME OF COMPANY"])
        ?.toLowerCase()
        .includes(query.toLowerCase())
  );

  const handleSelect = (symbol: string) => {
    router.push(`/stock/${symbol}`);
    setQuery(""); 
  };

  const handleViewAll = () => {
    router.push("/stocks");
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Input */}
      <input
        type="text"
        placeholder="Search by symbol or company..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-slate-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none bg-white"
      />

      {/* Dropdown overlay */}
      {query && (
        <ul className="absolute left-0 right-0 mt-1 border border-slate-200 rounded-lg shadow-lg max-h-72 overflow-y-auto bg-white z-50">
          {filtered.length > 0 ? (
            <>
              {filtered.map((stock) => (
                <li
                  key={stock.SYMBOL}
                  className="p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition"
                  onClick={() => handleSelect(stock.SYMBOL)}
                >
                  <div className="font-semibold text-slate-900">
                    {stock.SYMBOL}
                  </div>
                  <div className="text-sm text-slate-600">
                    {stock["NAME OF COMPANY"]}
                  </div>
                  <div className="text-xs text-slate-500">
                    ISIN: {stock["ISIN NUMBER"]} | Face Value:{" "}
                    {stock["FACE VALUE"]}
                  </div>
                </li>
              ))}
              <li
                className="p-3 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer font-medium text-blue-600 transition"
                onClick={handleViewAll}
              >
                View All Results
              </li>
            </>
          ) : (
            <li className="p-3 text-slate-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default StockSearch;
