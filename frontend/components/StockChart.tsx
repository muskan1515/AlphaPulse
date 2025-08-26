'use client';
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function StockChart({ symbol, candles }: { symbol: string, candles: any[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(()=> {
    const chart = createChart(ref.current!, { width: 800, height: 420, layout: { background: { color: '#fff' }, textColor: '#333' }});
    const series = chart.addCandlestickSeries();
    series.setData(candles.map(c => ({ time: Math.floor(new Date(c.ts).getTime()/1000), open:c.o, high:c.h, low:c.l, close:c.c })));
    return ()=> chart.remove();
  }, [candles, symbol]);
  return <div ref={ref} />;
}
