const getCryptoAnalysisPrompt = (coinName) => {
  return `You are an expert crypto analyst. Create a concise and structured analysis of "${coinName}" in valid JSON format.

**Tone:** Friendly, insightful, and natural.  
**Sources:** CoinGecko, TradingView, Google News.  
**Length:** Each subpoint should be max 450 characters.

**JSON Format:**
{
  "coin": "${coinName}",
  "market_summary": {
    "overview": "...",
    "price_trend": "...",
    "whale_activity": "...",
    "trading_volume": "..."
  },
  "investment_recommendation": {
    "should_invest": "yes / no / maybe",
    "reason": "...",
    "risk_level": "...",
    "recommended_strategy": "..."
  },
  "key_market_factors": [
    {"title": "Institutional Adoption", "description": "..."},
    {"title": "Regulation", "description": "..."},
    {"title": "Technology", "description": "..."},
    {"title": "Competitor Analysis", "description": "..."}
  ],
  "recent_news": {
    "title": "Recent News Impacting ${coinName}",
    "points": [
      {"headline": "...", "summary": "..."},
      {"headline": "...", "summary": "..."}
    ]
  },
  "future_predictions": {
    "title": "Next 12–24 Months Forecast",
    "points": [
      {"label": "Bullish Scenario", "summary": "..."},
      {"label": "Bearish Scenario", "summary": "..."},
      {"label": "Most Likely Case", "summary": "..."}
    ]
  },
  "potential_risks": {
    "title": "Key Risks to Watch",
    "points": [
      {"type": "Regulatory", "summary": "..."},
      {"type": "Security", "summary": "..."},
      {"type": "Macroeconomic", "summary": "..."}
    ]
  },
  "investment_insights": {
    "title": "Smart Investor Tips",
    "points": [
      {"tip": "Diversify", "summary": "..."},
      {"tip": "DCA Strategy", "summary": "..."},
      {"tip": "Risk Management", "summary": "..."}
    ]
  },
  "external_links": [
    {"title": "TradingView Chart", "url": "https://www.tradingview.com/symbols/${coinName}-USD/"},
    {"title": "Google News", "url": "https://news.google.com/search?q=${coinName}+crypto"}
  ]
}
All values must be concise and evenly formatted.`;
};

export default getCryptoAnalysisPrompt;
