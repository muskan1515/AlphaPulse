import { top_20_major_stocks_response } from "@/apis/home_page/type.home_page";
import React from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

interface StockCardProps {
  stock: top_20_major_stocks_response;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const closes = stock.close.map((c: number, i: number) => ({
    idx: i,
    value: c,
  }));

  const lastClose = stock.close[stock.close.length - 1];
  const prevClose = stock.close[stock.close.length - 2];
  const isUp = lastClose >= prevClose;

  return (
    <div className="bg-white shadow rounded-2xl p-6 w-64 flex-shrink-0 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="pr-2">
          <h3 className="text-lg font-semibold truncate">{stock.name}</h3>
          <p className="text-sm text-gray-500 truncate">{stock.ticker}</p>
        </div>
        <div
          className={`text-lg font-bold ${
            isUp ? "text-green-600" : "text-red-600"
          }`}
        >
          {lastClose.toFixed(2)}
        </div>
      </div>

      {/* Sparkline chart */}
      <div className="h-28 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={closes}>
            <Tooltip
              formatter={(v: number) => v.toFixed(2)}
              labelFormatter={() => ""}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={isUp ? "#16a34a" : "#dc2626"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Extra info */}
      <div className="mt-3 text-sm text-gray-500 flex justify-between">
        <span>Prev Close: {prevClose.toFixed(2)}</span>
        <span
          className={`${isUp ? "text-green-600" : "text-red-600"} font-medium`}
        >
          {isUp ? "↑" : "↓"}
        </span>
      </div>
    </div>
  );
};

export default StockCard;
