'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '../lib/api';

export default function Header(){
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(()=> {
    if (!q) { setSuggestions([]); return; }
    const id = setTimeout(async ()=> {
      const r = await API.get('/api/stocks/search', { params: { q } });
      setSuggestions(r.data);
      setOpen(true);
    }, 200);
    return ()=> clearTimeout(id);
  }, [q]);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link href="/"><a className="text-xl font-bold">StockAI</a></Link>
        <div className="flex-1 relative">
          <input value={q} onChange={(e)=> setQ(e.target.value)} placeholder="Search tickers or company..." className="w-full border rounded px-3 py-2" />
          {open && suggestions.length > 0 && (
            <div className="absolute z-30 w-full bg-white border mt-1 rounded shadow max-h-72 overflow-auto">
              {suggestions.map(s => (
                <div key={s.symbol} onClick={() => (window.location.href=`/stocks/${s.symbol}`)} className="p-3 hover:bg-slate-50 cursor-pointer">
                  <div className="flex justify-between">
                    <div><span className="font-semibold">{s.symbol}</span> <span className="text-sm text-slate-500 ml-2">{s.name}</span></div>
                    <div className="text-xs text-slate-400">{s.marketCap}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="flex gap-4 items-center">
          <Link href="/stocks"><a className="text-sm">Stocks</a></Link>
          <Link href="/about"><a className="text-sm">About</a></Link>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`} className="text-sm bg-blue-600 px-3 py-1 text-white rounded">Login</a>
        </nav>
      </div>
    </header>
  );
}
