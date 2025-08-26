'use client';
import React, { useEffect, useState } from 'react';
import API from '../lib/api';
import StockCard from './StockCard';

export default function TopStocks(){
  const [stocks, setStocks] = useState<any[]>([]);
  useEffect(()=> { API.get('/api/stocks').then(r=>setStocks(r.data)); }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks.map(s => <StockCard key={s.symbol} stock={s} />)}
    </div>
  );
}
