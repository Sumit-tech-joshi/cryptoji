const getCryptoAnalysisPrompt = (coinName) => {
    return `You are an AI financial analyst specializing in cryptocurrency investments. Generate a **comprehensive, human-readable, and market-driven analysis** for "${coinName}" in **structured JSON format**.
  
    ** The report should:**
    - Use **real-world data** from CoinGecko, TradingView, and Google News.
    - Present **insights in a storytelling format** (no robotic tone).
    - Offer **actionable investment strategies**.
    - Include **market sentiment, whale activity, regulatory news, and external links**.
  
    ** JSON Response Format:**
    {
      "coin": "${coinName}",
      "market_summary": {
        "overview": "Summarize market sentiment (Bullish, Bearish, or Neutral) and key reasons.",
        "price_trend": "Analyze ${coinName}'s price movement in the last 6-12 months.",
        "whale_activity": "Report large transactions & accumulation patterns.",
        "trading_volume": "Discuss recent trading volume trends and their significance."
      },
      "investment_recommendation": {
        "should_invest": "yes / no / maybe",
        "reason": "Provide a compelling explanation with supporting market factors.",
        "risk_level": "Low / Medium / High",
        "recommended_strategy": "Short-term / Long-term / Hold"
      },
      "key_market_factors": [
        {"title": "Institutional Adoption", "description": "Are major institutions investing?"},
        {"title": "Regulatory Climate", "description": "Any upcoming regulations that may affect the coin?"},
        {"title": "Technological Advancements", "description": "Any protocol upgrades or new features?"},
        {"title": "Competitor Analysis", "description": "How does ${coinName} compare to its competitors?"}
      ],
      "recent_news": {
        "title": "Latest Market Updates",
        "description": "Summarize **two breaking news headlines** affecting ${coinName}."
      },
      "future_predictions": {
        "title": "12-24 Month Forecast",
        "description": "What market analysts expect for ${coinName}."
      },
      "potential_risks": {
        "title": "Investment Risks",
        "description": "List major risks, such as security threats, regulation, or market instability."
      },
      "investment_insights": {
        "title": "Expert Takeaways",
        "description": "Summarize top investment strategies and key takeaways."
      },
      "external_links": [
        {"title": "TradingView Chart", "url": "https://www.tradingview.com/symbols/${coinName}-USD/"},
        {"title": "Google News Updates", "url": "https://news.google.com/search?q=${coinName}+crypto"}
      ]
    }
  
    ** Notes:**
    - **Ensure data is from real-world sources.**
    - **Use storytelling to make the report engaging.**
    - **All responses must be in valid JSON.**`;
  };
  
  export default getCryptoAnalysisPrompt;
  