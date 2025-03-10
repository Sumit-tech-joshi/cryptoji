import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import CarouselSection from "../components/carouselSection";
import { getCoins, getNews, getVideos } from "../services/apiService";

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

  useEffect(() => {
    if (isLoaded && user) {
      // Get user's favorite coins
      const storedFavorites = user?.unsafeMetadata?.favoriteCoins;
      setFavoriteCoins(storedFavorites || []);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (favoriteCoins.length > 0) {
      // Fetch favorite coin data

      getCoins().then((data) => {
          const filteredCoins = data.filter((coin: Coin) => favoriteCoins.includes(coin.symbol));
          setCoinData(filteredCoins);
      });
      getNews().then((data) => setNews(data.results || []));
      getVideos().then((data) => setVideos(data || []));

    }
  }, [favoriteCoins]);

  return (
    <div className="user-container">
      <Navbar onlyDefaultLogo={true} />

      <h1 className="user-title margin-left-5">My Favorite Cryptos</h1>

      {/* Favorite Coins Table */}
      <div className="favorite-coins desktop-width">
        {coinData.length > 0 ? (
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
              {coinData.map((coin, index) => (
                <tr key={coin.id}>
                  <td>{index + 1}</td>
                  <td className="crypto-name">
                    <img src={coin.image} alt={coin.name} className="crypto-image" />
                    <Link to={`/coin/${coin.id}`} className="crypto-link">
                      {coin.name}
                    </Link>
                  </td>
                  <td>{coin.symbol.toUpperCase()}</td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td className={coin.price_change_percentage_24h >= 0 ? "price-positive" : "price-negative"}>
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

      {/* News Section Using CarouselSection */}
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

      {/* Videos Section Using CarouselSection */}
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
