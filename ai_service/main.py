from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List
from scripts.fii_dii_top20 import get_fii_dii_data
from scripts.top_20_stocks_fundamental import get_major_stocks
from scripts.top_stock_news import get_latest_news
from model import TickerSentiment, Top20StockCard, FII_DI_STOCK_RESPONSE

app = FastAPI()

@app.get("/top-fii_dii_stocks")
async def get_stocks():
    fii_dii_result = await get_fii_dii_data()
    return fii_dii_result

@app.get("/top-20-stocks", response_model=List[Top20StockCard])
async def get_top_20_stocks():
    return await get_major_stocks()


class TickerSentiment(BaseModel):
    ticker: str
    relevance_score: str
    ticker_sentiment_score: str
    ticker_sentiment_label: str

class NewsStockCard(BaseModel):
    title: str
    url: str
    time_published: str
    summary: str
    banner_image: str
    source: str
    overall_sentiment_score: float
    overall_sentiment_label: str
    ticker_sentiment: List[TickerSentiment]

@app.get("/top-20-stock-news")
async def get_top_20_stock_news():
    return await get_latest_news()  
