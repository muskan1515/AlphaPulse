import pandas as pd
from textblob import TextBlob
import requests
import os
from dotenv import load_dotenv
from scripts.dii_fii_scraping_script import download_chartink_csv

load_dotenv()

def get_news_sentiment(query: str):
    """Return average sentiment score for top 5 news articles."""
    api_key = os.getenv('NEWS_API_KEY')
    if not api_key:
        return 0
    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={api_key}"
    resp = requests.get(url)
    data = resp.json()
    sentiments = []
    if "articles" in data:
        for article in data["articles"][:5]:
            sentiments.append(TextBlob(article["title"]).sentiment.polarity)
    return sum(sentiments)/len(sentiments) if sentiments else 0

def get_fii_dii_data():
    """Scrape Chartink CSV and return top 20 stocks with all details."""
    download_chartink_csv()

    download_dir = os.path.join(os.getcwd(), "downloads")
    csv_files = [f for f in os.listdir(download_dir) if f.endswith(".csv")]
    if not csv_files:
        raise FileNotFoundError("No Chartink CSV found in downloads folder.")
    
    latest_csv = max([os.path.join(download_dir, f) for f in csv_files], key=os.path.getctime)
    df = pd.read_csv(latest_csv)
    df = df.head(20)

    result = {}
    for _, row in df.iterrows():
        symbol = str(row['Symbol']).upper()
        stock_name = row['Stock Name']
        sr = row.get('Sr.', 0)
        links = row.get('Links', '')
        pct_chg = float(str(row.get('% Chg', 0)).replace('%','').strip())
        price = float(str(row.get('Price', 0)).replace(',','').strip())
        volume_str = str(row.get('Volume', '0')).replace(',','').strip()
        try:
            volume = int(volume_str)
        except:
            volume = 0
        
        sentiment = get_news_sentiment(symbol)

        result[symbol] = {
            'sr': sr,
            'stock_name': stock_name,
            'symbol': symbol,
            'links': links,
            '%chg': pct_chg,
            'price': price,
            'volume': volume,
            'fii': 0,
            'dii': 0,
            'sentiment': sentiment
        }
    
    return result
