"use client";
import React from "react";
import { SectorData } from "@/apis/stock_generic_view/type.generic_view";

interface Props {
  sectors: Record<string, SectorData>;
}

// Utility: map sentiment [-1, 1] to color
const sentimentColor = (sentiment: number) => {
  const red = Math.min(Math.floor(255 * Math.max(-sentiment, 0)), 255);
  const green = Math.min(Math.floor(255 * Math.max(sentiment, 0)), 255);
  return `rgb(${red}, ${green}, 0)`; // red -> negative, green -> positive
};

const SectorHeatmap: React.FC<Props> = ({ sectors }) => {
  const sectorList = Object.entries(sectors);

  return (
    <div className="grid grid-cols-5 gap-4">
      {sectorList.map(([name, sector]) => {
        const bgColor = sentimentColor(sector.avg_sentiment);

        return (
          <div
            key={name}
            className="p-4 rounded-lg text-white flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform"
            style={{
              backgroundColor: bgColor,
              height: `${Math.min(sector.total_market_cap / 1e10, 200)}px`, // scale height by market cap
            }}
            title={`${name}\nStocks: ${sector.total_stocks}\nMarket Cap: ₹${(
              sector.total_market_cap / 1e9
            ).toFixed(2)}B\nAvg Sentiment: ${sector.avg_sentiment}`}
          >
            <div className="font-bold">{name}</div>
            <div className="text-sm">{sector.total_stocks} Stocks</div>
          </div>
        );
      })}
    </div>
  );
};

export default SectorHeatmap;
