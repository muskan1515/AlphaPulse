import React from 'react';
import TopStocks from '../components/TopStocks';
import NewsPanel from '../components/NewsPanel';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TopStocks />
        </div>
        <aside>
          <NewsPanel />
        </aside>
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Why StockAI</h2>
        <p className="text-sm text-slate-600">Real-time market data + AI-driven sentiment and predictions. Built for traders who need quick insights and clear explainability.</p>
      </section>
    </div>
  );
}
