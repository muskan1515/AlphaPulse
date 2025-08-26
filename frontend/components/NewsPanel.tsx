'use client';
import React, { useEffect, useState } from 'react';
import API from '../lib/api';

export default function NewsPanel(){
  const [news, setNews] = useState<any[]>([]);
  useEffect(()=> {
    API.get('/api/news').then(r=>setNews(r.data));
    const iv = setInterval(()=> API.get('/api/news').then(r=>setNews(r.data)), 30000);
    return ()=> clearInterval(iv);
  }, []);
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Market News</h3>
      <div className="space-y-2">
        {news.map((n,i) => (
          <div key={i} className="p-2 border rounded">
            <div className="text-xs text-slate-400">{new Date(n.ts).toLocaleTimeString()} • {n.source}</div>
            <div className="mt-1 font-medium">{n.title}</div>
            <div className="text-xs text-slate-500 mt-1">Symbol: {n.symbol || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
