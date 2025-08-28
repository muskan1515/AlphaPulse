export interface top_20_major_stocks_response {
  name: string;
  ticker: string;
  open: number[];
  close: number[];
  high: number[];
  low: number[];
  volume: number[];
}

interface TickerSentiment{
    ticker: string;
    relevance_score: string;
    ticker_sentiment_score: string;
    ticker_sentiment_label: string;
}

export interface top_20_major_stocks_news_response{
    title: string;
    url:string;
    time_published: string;
    summary: string;
    banner_image: string;
    source: string;
    overall_sentiment_score: Float32Array,
    overall_sentiment_label: string;
    ticker_sentiment: TickerSentiment[]
}

export interface NSEStock {
  SYMBOL: string;
  "NAME OF COMPANY": string;
  SERIES: string;
  "DATE OF LISTING": string;
  "PAID UP VALUE": string;
  "MARKET LOT": string;
  "ISIN NUMBER": string;
  "FACE VALUE": string;
}
