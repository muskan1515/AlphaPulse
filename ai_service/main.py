from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List
from scripts.fii_dii_top20 import get_fii_dii_data

app = FastAPI()

# Pydantic model
class StockCard(BaseModel):
    ticker: str
    sr: int
    stock_name: str
    links: str
    percent_change: float
    price: float
    volume: int
    fii: float
    dii: float
    sentiment: float

@app.get("/top-fii_dii_stocks", response_model=List[StockCard])
def get_stocks(page: int = Query(1, ge=1), itemsSize: int = Query(10, ge=1, le=50)):
    fii_dii = get_fii_dii_data()
    results = []

    for ticker, data in fii_dii.items():
        results.append({
            "ticker": ticker,
            "sr": data["sr"],
            "stock_name": data["stock_name"],
            "links": data["links"],
            "percent_change": data["%chg"],
            "price": data["price"],
            "volume": data["volume"],
            "fii": data["fii"],
            "dii": data["dii"],
            "sentiment": data["sentiment"]
        })

    # Sort by sentiment + FII + DII for ranking
    results = sorted(results, key=lambda x: (x['fii'] + x['dii'] + x['sentiment']), reverse=True)

    # Pagination
    start = (page - 1) * itemsSize
    end = start + itemsSize
    return results[start:end]
