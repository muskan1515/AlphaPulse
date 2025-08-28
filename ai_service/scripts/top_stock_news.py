import dotenv
import os
import aiohttp
from model import NewsStockCard

dotenv.load_dotenv()
async def get_latest_news():
    url = "https://www.alphavantage.co/query"
    params = {
        "function": "NEWS_SENTIMENT",
        "tickers": "",
        "apikey": os.getenv("ALPHA_VANTAGE_API_KEY"),
        "limit": 20,
    }
    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params, timeout=10) as response:
            response.raise_for_status()
            data = await response.json()  

            # Transform API response into NewsStockCard list
            news_items = []
            for item in data.get("feed" , []):
                news_items.append(NewsStockCard(
                    title=item.get("title", ""),
                    url=item.get("url", ""),
                    time_published=item.get("time_published", ""),
                    summary=item.get("summary", ""),
                    banner_image=item.get("banner_image", ""),
                    source=item.get("source", ""),
                    overall_sentiment_score=float(item.get("overall_sentiment_score", 0.0)),
                    overall_sentiment_label=item.get("overall_sentiment_label", ""),
                    ticker_sentiment= item.get("ticker_sentiment", [])
                ))
            print("news_items:", news_items)
            return news_items   

