# models.py
from typing import List, Dict, Optional
from pydantic import BaseModel, Field


class TickerSentiment(BaseModel):
    ticker: str
    relevance_score: Optional[float] = None
    ticker_sentiment_score: Optional[float] = None
    ticker_sentiment_label: Optional[str] = None


class Top20StockCard(BaseModel):
    name: str
    ticker: str
    open: List[float]
    close: List[float]
    high: List[float]
    low: List[float]
    volume: List[float]


class NewsStockCard(BaseModel):
    title: str
    url: str
    time_published: str
    summary: str
    banner_image: Optional[str] = None
    source: str
    overall_sentiment_score: float
    overall_sentiment_label: str
    ticker_sentiment: List[TickerSentiment] = []


class Holder(BaseModel):
    # CSV / upstream keys like "Holder", "Shares", "Date Reported"
    name: str = Field(..., alias="Holder")
    shares: int = Field(..., alias="Shares")
    date_reported: Optional[str] = Field(None, alias="Date Reported")


class StockInfo(BaseModel):
    sr: Optional[int] = 0
    stock_name: str
    symbol: str
    links: Optional[str] = None
    pct_change: float = Field(..., alias="pct_change")  # normalized name, use alias if input uses different key
    price: float
    volume: int
    fii_dii_flag: bool = False
    sentiment: float = 0.0
    sector: Optional[str] = "Unknown"
    industry: Optional[str] = "Unknown"
    market_cap: Optional[float] = 0.0
    holders: List[Holder] = []


class Sector(BaseModel):
    total_stocks: int
    avg_sentiment: float
    total_market_cap: float
    symbols: List[str]


class FII_DI_STOCK_RESPONSE(BaseModel):
    stocks: List[StockInfo]
    sectors: Dict[str, Sector]
