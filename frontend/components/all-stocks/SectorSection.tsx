"use client";
import React from "react";
import { SectorData } from "@/apis/stock_generic_view/type.generic_view";

interface Props {
  sectorName: string;
  sector: SectorData;
}

const SectorSection: React.FC<Props> = ({ sectorName, sector }) => {
  return (
    <div className="border rounded-lg p-4 shadow mb-4">
      <h2 className="font-bold text-xl mb-2">{sectorName}</h2>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>Total Stocks: {sector.total_stocks}</div>
        <div>Avg Sentiment: {sector.avg_sentiment}</div>
        <div>Total Market Cap: ₹{(sector.total_market_cap / 1e9).toFixed(2)}B</div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Stocks: {sector.symbols.join(", ")}
      </div>
    </div>
  );
};

export default SectorSection;
