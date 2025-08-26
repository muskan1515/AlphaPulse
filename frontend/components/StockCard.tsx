import Link from 'next/link';
export default function StockCard({ stock }: { stock: any }) {
  return (
    <article className="bg-white rounded shadow p-4 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{stock.symbol}</div>
          <div className="text-sm text-slate-500">{stock.name}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">${stock.price}</div>
          <div className={`text-sm ${stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{stock.change}%</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Link href={`/stocks/${stock.symbol}`}><a className="text-blue-600">View</a></Link>
        <div className="text-xs text-slate-400">{stock.marketCap}</div>
      </div>
    </article>
  );
}
