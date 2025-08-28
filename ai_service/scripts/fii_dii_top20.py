import pandas as pd
from textblob import TextBlob
import os
from dotenv import load_dotenv
from scripts.dii_fii_scraping_script import download_chartink_csv
import asyncio
import aiohttp
import yfinance as yf

load_dotenv()


async def get_news_sentiment(query: str):
    """Return average sentiment score for top 5 news articles."""
    url = "https://newsapi.org/v2/everything"
    params = {"q": query, "apiKey": os.getenv("NEWS_API_KEY")}

    if not params["apiKey"]:
        return 0

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params, timeout=10) as res:
                res.raise_for_status()
                data = await res.json()
    except Exception:
        return 0

    sentiments = []
    if "articles" in data:
        for article in data["articles"][:5]:
            sentiments.append(TextBlob(article["title"]).sentiment.polarity)

    return sum(sentiments) / len(sentiments) if sentiments else 0


async def get_fii_dii_data():
    """Scrape Chartink CSV and return top 20 stocks with all details + sector heatmap data (optimized)."""
    await download_chartink_csv()

    # get latest CSV
    download_dir = os.path.join(os.getcwd(), "downloads")
    csv_files = [f for f in os.listdir(download_dir) if f.endswith(".csv")]
    if not csv_files:
        raise FileNotFoundError("No Chartink CSV found in downloads folder.")

    latest_csv = max([os.path.join(download_dir, f) for f in csv_files], key=os.path.getctime)
    df = pd.read_csv(latest_csv).head(20)

    # vectorized cleaning
    df["% Chg"] = df["% Chg"].astype(str).str.replace("%", "").astype(float)
    df["Price"] = df["Price"].astype(str).str.replace(",", "").astype(float)
    df["Volume"] = df["Volume"].astype(str).str.replace(",", "").astype(int)

    # symbols
    symbols = [f"{s.upper()}.NS" for s in df["Symbol"].tolist()]

    # concurrent news sentiment calls
    sentiment_tasks = [get_news_sentiment(sym) for sym in symbols]
    sentiments = await asyncio.gather(*sentiment_tasks, return_exceptions=True)

    # batch fetch yahoo finance data
    tickers = yf.Tickers(" ".join(symbols))

    result = {}
    sector_map = {}

    for i, row in df.iterrows():
        symbol = symbols[i]
        info = {}
        try:
            info = tickers.tickers[symbol].info or {}
        except Exception:
            info = {}

        stock_data = {
            "sr": row.get("Sr.", 0),
            "stock_name": row["Stock Name"],
            "symbol": symbol,
            "links": row.get("Links", ""),
            "%chg": row["% Chg"],
            "price": row["Price"],
            "volume": row["Volume"],
            "fii": 0,
            "sentiment": sentiments[i] if not isinstance(sentiments[i], Exception) else 0,
            "sector": info.get("sector", "Unknown"),
            "industry": info.get("industry", "Unknown"),
            "market_cap": info.get("marketCap", 0),
            "holders": (
                tickers.tickers[symbol].institutional_holders.to_dict("records")
                if getattr(tickers.tickers[symbol], "institutional_holders", None) is not None else []
            ),
        }

        result[symbol] = stock_data

        # sector aggregation
        sec = sector_map.setdefault(stock_data["sector"], {
            "total_stocks": 0,
            "avg_sentiment": 0,
            "total_market_cap": 0,
            "symbols": []
        })

        sec["total_stocks"] += 1
        sec["avg_sentiment"] += stock_data["sentiment"]
        sec["total_market_cap"] += stock_data["market_cap"] or 0
        sec["symbols"].append(symbol)

    # finalize averages
    for sector, values in sector_map.items():
        if values["total_stocks"]:
            values["avg_sentiment"] /= values["total_stocks"]

    return {"stocks": result, "sectors": sector_map}
