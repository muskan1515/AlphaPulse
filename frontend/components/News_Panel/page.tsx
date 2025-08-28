"use client";
import React, { useEffect, useState } from "react";
import { majorNews } from "@/apis/home_page/api.home_page";
import NewCard from "./newsCard";
import { top_20_major_stocks_news_response } from "@/apis/home_page/type.home_page";

export default function NewsPanel() {
  const [news, setNews] = useState<top_20_major_stocks_news_response[]>([]);

  useEffect(() => {
    getAllTopStockNews();
  }, []);

  const getAllTopStockNews = async () => {
    try {
      const response = await majorNews();
      setNews(response);
    } catch (err) {
      console.error(err);
      alert(`Got error: ${err}`);
    }
  };

  return <NewCard news={news} />;
}
