import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'StockAI',
  description: 'AI-powered stock sentiment & trend dashboard'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Header />
        <main className="max-w-7xl mx-auto py-8 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
