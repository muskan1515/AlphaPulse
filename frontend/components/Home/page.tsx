'use client'

import NewsPanel from "../News_Panel/page";
import TopStocks from "../Top_20_Stock/page";

const HomePage = () => {

  return (
    <div className="space-y-12 p-6 md:p-12 bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
          Welcome to StockAI
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Real-time market data, AI-driven sentiment, and predictions for traders
          and investors who want quick, actionable insights.
        </p>
      </section>

      {/* Top Stocks Section */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Top 20 Stocks</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-6 min-w-max pb-2">
            {/* <TopStocks /> */}
          </div>
        </div>
      </section>

      {/* Market News Section */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Market News</h2>
        {/* <NewsPanel /> */}
      </section>

      {/* Why StockAI Section */}
      <section className="bg-white rounded-2xl shadow p-6 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why StockAI?</h2>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          Get instant access to real-time stock market data, AI-driven sentiment
          analysis, and actionable predictions. Designed for traders and investors
          who value speed, clarity, and explainability.
        </p>
      </section>

      {/* Optional Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Real-Time Data",
            desc: "Stay updated with the latest stock prices and market movements.",
          },
          {
            title: "AI Predictions",
            desc: "Get predictive insights powered by AI to make smarter decisions.",
          },
          {
            title: "Sentiment Analysis",
            desc: "Analyze market sentiment from news and social channels instantly.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
