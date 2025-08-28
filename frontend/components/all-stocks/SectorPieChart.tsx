"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from "recharts";
import { SectorData } from "@/apis/stock_generic_view/type.generic_view";

interface Props {
  sectors: Record<string, SectorData>;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const SectorPieChart: React.FC<Props> = ({ sectors }) => {
  // Make sure total_market_cap is a number, fallback to 0
  const data = Object.entries(sectors).map(([name, sector]) => ({
    name,
    value: Number(sector.total_market_cap || 0),
  }));

  // Formatter for labels on the pie chart
  const labelFormatter = (value: number) => `${(value / 1e9).toFixed(2)}B`;

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={({ value }) => labelFormatter(value)}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: any) => `₹${(Number(value) / 1e9).toFixed(2)}B`} />
      <Legend />
    </PieChart>
  );
};

export default SectorPieChart;
