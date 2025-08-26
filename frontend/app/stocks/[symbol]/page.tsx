import React from 'react';
import API from '../../../lib/api';
import StockChart from '../../../components/StockChart';

export default async function StockPage({ params }: any) {
  const symbol = params.symbol.toUpperCase();
  // server side fetch history (Next.js server component)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stocks/${symbol}/candles`);
  const data = await res.json();
  const candles = data.candles;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{symbol}</h1>
      <div className="bg-white p-4 rounded shadow">
        <StockChart symbol={symbol} candles={candles} />
      </div>
      {/* More panels: news, predictions, indicators */}
    </div>
  );
}
