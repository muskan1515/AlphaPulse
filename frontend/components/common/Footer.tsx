import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">StockAI</h3>
          <p className="text-sm">
            StockAI provides real-time stock insights, news, and predictions to help traders make smarter decisions.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">About Us</Link>
            </li>
            <li>
              <Link href="/stocks" className="hover:text-white">All Stocks</Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-white">Wishlist</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
          <ul className="space-y-1">
            <li>Email: <a href="mailto:support@stockai.com" className="hover:text-white">support@stockai.com</a></li>
            <li>Twitter: <a href="https://twitter.com/stockai" target="_blank" rel="noreferrer" className="hover:text-white">@stockai</a></li>
            <li>LinkedIn: <a href="https://linkedin.com/company/stockai" target="_blank" rel="noreferrer" className="hover:text-white">StockAI</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} StockAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
