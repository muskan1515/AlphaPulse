import { top_20_major_stocks_news_response } from "@/apis/home_page/type.home_page";
import formatTimePublished from "@/helper/conversionFunc";
import React from "react";

interface NewCardProps{
    news: top_20_major_stocks_news_response[]
}
const NewCard:React.FC<NewCardProps> = ({ news }) => {
  if (!news || news.length === 0) {
    return <p className="text-center text-gray-500">No news available</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Latest Stock News</h2>
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {news.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
          >
            <img
              src={item.banner_image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h3 className="font-semibold text-lg line-clamp-2 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3 mb-2">
              {item.summary}
            </p>
            <p className="text-xs text-gray-400 mb-2">
              {formatTimePublished(item.time_published)}

            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCard;
