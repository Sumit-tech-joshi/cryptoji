import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../App.css"; // Import the global stylesheet
import Hero from "../components/hero.tsx";
import { useUser } from "@clerk/clerk-react"; // Clerk User Hook
import starIcon from "../assets/star.svg";
import starFillIcon from "../assets/star_fill.svg";
import CarouselSection from "../components/carouselSection.tsx";
import { getCoins, getNews, getVideos } from "../services/apiService";

// Coin interface to define structure
interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

// News interface to define structure

interface NewsArticle {
  id: string;
  title: string;
  link: string;
  creator?: string[];
  description: string;
  pubDate: string;
  image_url?: string | null;
  source_name: string;
  source_url: string;
  source_icon?: string | null;
}

// Define YouTube Video Interface
interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
    publishedAt: string;
  };
}

const Home: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const { user, isLoaded } = useUser(); // Get Clerk User
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {

    // Fetch cached API data
    getCoins().then((data) => setCoins(data || []));
    getNews().then((data) => setNews(data.results || []));
    getVideos().then((data) => setVideos(data || []));
    
    // Function to update coin prices randomly
    const updatePrices = () => {
      setCoins((prevCoins) =>
        prevCoins.map((coin) => ({
          ...coin,
          current_price: adjustValue(coin.current_price, 2), // Change price slightly
          price_change_percentage_24h: adjustValue(
            coin.price_change_percentage_24h,
            1
          ), // Change 24h % slightly
          market_cap: adjustValue(coin.market_cap, 2), // Change market cap slightly
        }))
      );
    };

    // Run every 4 seconds
    const interval = setInterval(updatePrices, 4000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    
    if (isLoaded && user) {
      let updatedFavorites: string[] = [];
      let favoriteCoins = []

      if (localStorage.getItem("currentPage") === "SignUp") {
        const storedCoins = localStorage.getItem("favoriteCoins");
  
        favoriteCoins = storedCoins ? JSON.parse(storedCoins) : [];
  
        // Update user metadata in Clerk
        updatedUserDataforFavourite(favoriteCoins);
      }
  
      // Ensure user is loaded before accessing metadata
      updatedFavorites = Array.isArray(favoriteCoins
      ) && favoriteCoins.length ?  favoriteCoins as string[] : Array.isArray(
        user?.unsafeMetadata?.favoriteCoins
      )
        ? [...(user?.unsafeMetadata.favoriteCoins as string[])]
        : [];

      setFavoriteCoins(updatedFavorites);
      // Clear localStorage for currentPage
      localStorage.removeItem("currentPage");
      // Clear localStorage after storing in Clerk
      localStorage.removeItem("favoriteCoins");
    }
  }, [isLoaded, user]);
  
  // Helper function to add slight random variation
  const adjustValue = (value: number, percentage: number) => {
    // 2% variation
    const variation = (value * percentage) / 100;

    // Randomly increase/decrease
    return value + (Math.random() * variation * 2 - variation);
  };

  const updatedUserDataforFavourite = async (updatedFavorites) => {
    await user?.update({
      unsafeMetadata: { favoriteCoins: updatedFavorites },
    });
  };

  // Toogle function to add favourite coin
  const toggleFavorite = async (coinSymbol: string) => {
    if (!user) {
      alert("Please log in to save favorites!");
      return;
    }

    let updatedFavorites: string[] = Array.isArray(
      user?.unsafeMetadata?.favoriteCoins
    )
      ? [...(user.unsafeMetadata.favoriteCoins as string[])]
      : [];

    if (updatedFavorites.includes(coinSymbol)) {
      updatedFavorites = updatedFavorites.filter((coin) => coin !== coinSymbol);
    } else {
      updatedFavorites.push(coinSymbol);
    }

    try {
      console.log({ setFavoriteCoins: updatedFavorites });
      await updatedUserDataforFavourite(updatedFavorites);
      setFavoriteCoins(updatedFavorites);

      console.log("Favorites updated successfully!");
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className="home-container ">
      {/* Hero component */}
      <Hero></Hero>
      <h1 className="home-title margin-top-8 ">Top Cryptocurrencies</h1>
      <table className="crypto-table desktop-width">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th className="hide-table-coulmn">24h Change %</th>
            <th className="hide-table-coulmn">Market Cap</th>
            <th>Add to Favourite</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id} className="crypto-row">
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
                    ? "price-positive hide-table-coulmn"
                    : "price-negative hide-table-coulmn"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="hide-table-coulmn">
                ${coin.market_cap.toLocaleString()}
              </td>
              <td>
                <button
                  className="fav-btn"
                  onClick={() => toggleFavorite(coin.symbol)}
                >
                  {favoriteCoins.includes(coin.symbol) ? (
                    <img src={starFillIcon}></img>
                  ) : (
                    <img src={starIcon}></img>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* News Section */}
      <CarouselSection
        title="Crypto News Updates"
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

      {/* Videos Section */}
      <CarouselSection
        title="Crypto Video Updates"
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

export default Home;
