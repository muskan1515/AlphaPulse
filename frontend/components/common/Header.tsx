'use client'
import React from "react";
import StockSearch from "./StockSearch"; 
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-gray-900 px-6 py-3 shadow-md">
      {/* Left side - Logo / Brand */}
      <div className="text-white font-bold text-xl">
        <Link href="/">📊 Stock Dashboard</Link>
      </div>

      {/* Middle - Stock Search */}
      <div className="flex-1 mx-6">
        <StockSearch />
      </div>

      {/* Right side - Nav / User */}
      <div className="flex items-center gap-4 text-white">
        <Link href="/portfolio" className="hover:text-blue-400">Portfolio</Link>
        <Link href="/watchlist" className="hover:text-blue-400">Watchlist</Link>
        <Link href="/login" className="hover:text-blue-400">Login</Link>
      </div>
    </header>
  );
};

export default Header;
