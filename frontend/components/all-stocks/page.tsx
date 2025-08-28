"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/store/slices/uiSlice";
import { top_fii_dii_stocks } from "@/apis/stock_generic_view/api.generic_view";
import { FiiDiiApiResponse, StockData } from "@/apis/stock_generic_view/type.generic_view";

import StockCard from "./StockCard";
import SectorSection from "./SectorSection";
import SectorPieChart from "./SectorPieChart";
import SectorHeatmap from "./SectorHeatmap";

const HomePage = () => {
  const dispatch = useDispatch();
  const [stocks, setStocks] = useState<Record<string, StockData>>({});
  const [sectors, setSectors] = useState<Record<string, any>>({});

  useEffect(() => {
    const getAllStocks = async () => {
      try {
        dispatch(showLoader());
        const response: FiiDiiApiResponse = await top_fii_dii_stocks();
        if (response) {
          setStocks(response.stocks);
          setSectors(response.sectors);
        }
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(hideLoader());
      }
    };
    getAllStocks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">Stocks Dashboard</h1>

      {/* Charts + Stocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Sector Distribution</h2>
            <SectorPieChart sectors={sectors} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Sector Heatmap</h2>
            <SectorHeatmap sectors={sectors} />
          </div>
        </div>

        {/* Stocks Section */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Top Stocks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.values(stocks).map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      </div>

      {/* Sector Sections */}
      <div className="space-y-6">
        {Object.entries(sectors).map(([name, sector]) => (
          <SectorSection key={name} sectorName={name} sector={sector} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
