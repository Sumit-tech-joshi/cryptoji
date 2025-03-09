import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css"; // Import the global stylesheet
import Carousel from "react-multi-carousel";
import Hero from "../components/hero.tsx";
import { useUser } from "@clerk/clerk-react"; // Clerk User Hook
import starIcon from "../assets/star.svg";
import starFillIcon from "../assets/star_fill.svg";

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
  article_id: string;
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

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1700 },
    items: 4,
  },
  desktopTwo: {
    breakpoint: { max: 1700, min: 1024 },
    items: 3,
  },
  desktopThree: {
    breakpoint: { max: 1200, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Home: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const { user, isLoaded } = useUser(); // Get Clerk User
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    // Fetch coins initially
    axios
      .get("http://localhost:3001/api/coins")
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));

    // Fetch news
    axios
      .get("http://localhost:3001/api/news")
      .then((res) => {
        setNews(res.data.results);
      })
      .catch((err) => console.error(err));

    // Fetch YouTube Videos
    axios
      .get("http://localhost:3001/api/youtube?q=cryptocurrency")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));

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
      // Ensure user is loaded before accessing metadata
    let updatedFavorites: string[] = Array.isArray(user?.unsafeMetadata?.favoriteCoins)
    ? [...(user?.unsafeMetadata.favoriteCoins as string[])]
    : [];  

    setFavoriteCoins(updatedFavorites);
    }
  }, [isLoaded, user]);
  // Helper function to add slight random variation
  const adjustValue = (value: number, percentage: number) => {
    // 2% variation
    const variation = (value * percentage) / 100;

    // Randomly increase/decrease
    return value + (Math.random() * variation * 2 - variation);
  };

  // Toogle function to add favourite coin
  const toggleFavorite = async (coinSymbol: string) => {
    if (!user) {
      alert("Please log in to save favorites!");
      return;
    }

    let updatedFavorites: string[] = Array.isArray(user?.unsafeMetadata?.favoriteCoins)
    ? [...(user.unsafeMetadata.favoriteCoins as string[])]
    : [];  

    if (updatedFavorites.includes(coinSymbol)) {
      updatedFavorites = updatedFavorites.filter((coin) => coin !== coinSymbol);
    } else {
      updatedFavorites.push(coinSymbol);
    }
  
    try {
      console.log({ setFavoriteCoins: updatedFavorites})
      await user.update({
        unsafeMetadata: { favoriteCoins: updatedFavorites },
      });
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
            <th>24h Change %</th>
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
                    ? "price-positive"
                    : "price-negative"
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
      <div
        className="home-container margin-top-8 desktop-width"
        id="content-section"
      >
        <h2 className="home-title">Crypto News Updates</h2>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px video-container"
        >
          {news.map((article) => (
            <div key={article.article_id} className="news-item">
              <img
                src={
                  article.image_url ||
                  article.source_icon ||
                  "https://via.placeholder.com/100"
                }
                alt={article.source_name}
              />
              <div className="news-content">
                <h3>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h3>
                <p>{article.description}</p>
                <p>
                  <strong>Published:</strong>{" "}
                  {new Date(article.pubDate).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="home-container margin-top-8 desktop-width margin-bottom-8">
        <h2 className="home-title">Crypto Video Updates</h2>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px video-container"
        >
          {videos.map((video) => (
            <div key={video.id.videoId} className="video-item">
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="video-thumbnail"
                />

                <div className="play-icon">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                    alt="Play"
                  />
                </div>
              </a>
              <div className="video-info">
                <h3>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {video.snippet.title}
                  </a>
                </h3>
                <p>By {video.snippet.channelTitle}</p>
                <p>
                  Published:{" "}
                  {new Date(video.snippet.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
