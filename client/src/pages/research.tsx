import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import CarouselSection from "../components/carouselSection";
import {
  getCoins,
  getNews,
  getVideos,
  getAIInsights,
} from "../services/apiService";
import aiLoader from "../assets/loader_ai.gif";

// Coin Interface
interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

// News Interface
interface NewsArticle {
  id: string;
  title: string;
  link: string;
  image_url?: string | null;
  source_name: string;
  pubDate: string;
}

// YouTube Video Interface
interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
    publishedAt: string;
  };
}

const Research: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);
  const [coinData, setCoinData] = useState<Coin[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [activeCoin, setActiveCoin] = useState<string | null>(null);
  const [aiInsights, setAiInsights] = useState<any>({});
  const [selectedCoin, setSelectedCoin] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      // Get user's favorite coins
      const storedFavorites = user?.unsafeMetadata?.favoriteCoins || [];
      setFavoriteCoins(storedFavorites || []);

      // Automatically set the first favorite coin as active
      if (storedFavorites.length > 0) {
        setActiveCoin(storedFavorites[0]);
      }
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (favoriteCoins.length > 0) {
      // Fetch favorite coin data
      getCoins().then((data) => {
        const filteredCoins = data?.filter((coin: Coin) =>
          favoriteCoins.includes(coin.symbol)
        );
        setCoinData(filteredCoins);

        let selectedCoinName = filteredCoins?.filter(
          (coin: Coin) => coin.symbol == activeCoin
        )?.[0]?.name;
        setSelectedCoin(selectedCoinName);
        const insights = fetchInsights(selectedCoinName);
        setAiInsights(insights);
        getNews(selectedCoinName).then((data) => setNews(data?.results || []));
        getVideos(selectedCoinName).then((data) => setVideos(data || []));
      });
    }
  }, [favoriteCoins, activeCoin]);

  const fetchInsights = async (coin) => {
    try {
      setLoading(true);
      const insights = await getAIInsights(coin);
      setAiInsights(insights);
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  return (
    <div className="user-container">
      <Navbar onlyDefaultLogo={true} />

      <h1 className="user-title margin-left-10-per margin-bottom-4">
        My Favorite Cryptos
      </h1>

      {/* === Top Bar for Coin Selection === */}
      <div className=" margin-left-10-per margin-bottom-4">
        {favoriteCoins.length > 4 ? (
          // Show dropdown if more than 4 favorite coins
          <select
            value={activeCoin || ""}
            onChange={(e) => setActiveCoin(e.target.value)}
            className="coin-dropdown"
          >
            {favoriteCoins.map((coin) => (
              <option key={coin} value={coin}>
                {coin.toUpperCase()}
              </option>
            ))}
          </select>
        ) : (
          // Show coin buttons if <= 4 favorite coins
          favoriteCoins.map((coin) => (
            <button
              key={coin}
              onClick={() => setActiveCoin(coin)}
              className={`coin-button ${activeCoin === coin ? "active" : ""}`}
            >
              {coin.toUpperCase()}
            </button>
          ))
        )}
      </div>

      {/* === Favorite Coins Table === */}
      <div className="favorite-coins desktop-width">
        {coinData?.length > 0 ? (
          <table className="crypto-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Symbol</th>
                <th>Price (USD)</th>
                <th>24h Change</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {coinData
                .filter((coin) => coin.symbol === activeCoin) // Only show active coin
                .map((coin, index) => (
                  <tr key={coin.id}>
                    <td>{index + 1}</td>
                    <td className="crypto-name">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="crypto-image"
                      />
                      <Link to={`/coin/${coin.id}`} className="crypto-link">
                        {coin.name}
                      </Link>
                    </td>
                    <td>{coin.symbol.toUpperCase()}</td>
                    <td>${coin.current_price.toLocaleString()}</td>
                    <td
                      className={
                        coin.price_change_percentage_24h >= 0
                          ? "price-positive"
                          : "price-negative"
                      }
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>${coin.market_cap.toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No favorite coins yet. Add some from the home page!</p>
        )}
      </div>

      {/* AI Insights Section */}
      {selectedCoin && (
        <div className="desktop-width margin-top-6 ai-container">
          <h2 className="ai-header"> AI Insights for {selectedCoin}</h2>

          {loading ? (
            <div className="ai-loader-wrapper">
              <img
                src={aiLoader}
                width="200"
                className="text-align-center"
                alt="AI loader"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="ai-insights-container">
              {aiInsights && aiInsights.investment_recommendation ? (
                <div className="ai-grid">
                  {/* Investment Summary */}
                  <div className="ai-box investment-summary">
                    <h4 className="ai-section-title">
                      Investment Recommendation
                    </h4>
                    <ul className="ai-list">
                      <li className="ai-list-item">
                        <strong>Risk Level:</strong>{" "}
                        {aiInsights.investment_recommendation?.risk_level}
                      </li>
                      <li className="ai-list-item">
                        <strong>Strategy:</strong>{" "}
                        {
                          aiInsights.investment_recommendation
                            ?.recommended_strategy
                        }
                      </li>
                      <li className="ai-list-item">
                        <strong>Should Invest?</strong>{" "}
                        {aiInsights.investment_recommendation?.should_invest}
                      </li>
                      <li className="ai-list-item">
                        <strong>Reason:</strong>{" "}
                        {aiInsights.investment_recommendation?.reason}
                      </li>
                    </ul>
                  </div>

                  {/* Market Overview */}
                  <div className="ai-box market-overview">
                    <h4 className="ai-section-title"> Market Overview</h4>
                    <ul className="ai-list">
                      <li className="ai-list-item">
                        <strong>Sentiment:</strong>{" "}
                        {aiInsights.market_summary?.overview}
                      </li>
                      <li className="ai-list-item">
                        <strong>6–12 Month Trend:</strong>{" "}
                        {aiInsights.market_summary?.price_trend}
                      </li>
                      <li className="ai-list-item">
                        <strong>Whale Activity:</strong>{" "}
                        {aiInsights.market_summary?.whale_activity}
                      </li>
                      <li className="ai-list-item">
                        <strong>Trading Volume:</strong>{" "}
                        {aiInsights.market_summary?.trading_volume}
                      </li>
                    </ul>
                  </div>

                  {/* Key Market Factors */}
                  <div className="ai-box key-factors">
                    <h4 className="ai-section-title">🔎 Key Market Factors</h4>
                    <ul className="ai-market-factors">
                      {aiInsights.key_market_factors?.map((factor, index) => (
                        <li key={index} className="ai-market-factor">
                          <strong>{factor.title}:</strong> {factor.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="ai-box news-section">
                    <h4 className="ai-section-title">
                       {aiInsights.recent_news?.title}
                    </h4>
                    <ul className="ai-list">
                      {aiInsights.recent_news?.points?.map((item, idx) => (
                        <li key={idx} className="ai-list-item">
                          <strong>{item.headline}:</strong> {item.summary}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/*  Future Predictions */}
                  <div className="ai-box predictions">
                    <h4 className="ai-section-title">
                       {aiInsights.future_predictions?.title}
                    </h4>
                    <ul className="ai-list">
                      {aiInsights.future_predictions?.points?.map(
                        (item, idx) => (
                          <li key={idx} className="ai-list-item">
                            <strong>{item.label}:</strong> {item.summary}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* ⚠️ Risks */}
                  <div className="ai-box risks">
                    <h4 className="ai-section-title">
                      ⚠️ {aiInsights.potential_risks?.title}
                    </h4>
                    <ul className="ai-list">
                      {aiInsights.potential_risks?.points?.map((item, idx) => (
                        <li key={idx} className="ai-list-item">
                          <strong>{item.type}:</strong> {item.summary}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-red-500">Error fetching insights.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* === News Section === */}
      <CarouselSection
        title="Latest News on Your Favorite Coins"
        items={news.map((article) => ({
          id: article.id,
          title: article.title,
          link: article.link,
          imageUrl: article.image_url,
          source: article.source_name,
          publishedAt: article.pubDate,
        }))}
        type="news"
      />

      {/* === Videos Section === */}
      <CarouselSection
        title="Latest Crypto Videos"
        items={videos.map((video) => ({
          id: video.id.videoId,
          title: video.snippet.title,
          link: `https://www.youtube.com/watch?v=${video.id.videoId}`,
          imageUrl: video.snippet.thumbnails.medium.url,
          channelTitle: video.snippet.channelTitle,
          publishedAt: video.snippet.publishedAt,
        }))}
        type="video"
      />
    </div>
  );
};

export default Research;
