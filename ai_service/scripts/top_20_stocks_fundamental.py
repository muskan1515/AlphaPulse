import yfinance as yf
import asyncio

# Top 20 Indian Stocks (Name -> NSE Ticker Symbol)
indian_stocks = {
    "Reliance Industries": "RELIANCE.NS",
    "Tata Consultancy Services": "TCS.NS",
    "HDFC Bank": "HDFCBANK.NS",
    "ICICI Bank": "ICICIBANK.NS",
    "Infosys": "INFY.NS",
    "State Bank of India": "SBIN.NS",
    "Bharti Airtel": "BHARTIARTL.NS",
    "LIC India": "LICI.NS",
    "ITC": "ITC.NS",
    "Hindustan Unilever": "HINDUNILVR.NS",
    "Larsen & Toubro": "LT.NS",
    "Axis Bank": "AXISBANK.NS",
    "Bajaj Finance": "BAJFINANCE.NS",
    "Kotak Mahindra Bank": "KOTAKBANK.NS",
    "HCL Technologies": "HCLTECH.NS",
    "Adani Enterprises": "ADANIENT.NS",
    "Adani Green Energy": "ADANIGREEN.NS",
    "NTPC": "NTPC.NS",
    "Power Grid": "POWERGRID.NS",
    "Sun Pharma": "SUNPHARMA.NS"
}

async def fetch_stock(name, ticker):
    stock = yf.Ticker(ticker)
    def fetch():
        data = stock.history(period="1mo", interval="1d")
        if not data.empty:
            return {
                "name": name,
                "ticker": ticker,
                "open": data['Open'].tolist(),
                "close": data['Close'].tolist(),
                "high": data['High'].tolist(),
                "low": data['Low'].tolist(),
                "volume": data['Volume'].tolist()
            }
            
        return None
    return await asyncio.to_thread(fetch)


async def get_major_stocks():

    tasks = [fetch_stock(name, ticker) for name, ticker in indian_stocks.items()]
    results = await asyncio.gather(*tasks)
    return [r for r in results if r]
