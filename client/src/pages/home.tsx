import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css"; // Import the global stylesheet
import Carousel from "react-multi-carousel";

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
    breakpoint: { max: 3000, min: 1024 },
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

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    // Fetch YouTube Videos
    axios
      .get("http://localhost:3001/api/youtube?q=cryptocurrency")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // Fetch coins
    axios
      .get("http://localhost:3001/api/coins")
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:3001/api/news")
      .then((res) => setNews(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Top Cryptocurrencies</h1>
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>24h Change %</th>
            <th>Market Cap</th>
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
              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* News Section */}
      <div className="news-section">
        <h2>Latest Crypto News</h2>
        <div className="news-container"></div>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px news-section"
        >
          {news.length > 0 ? (
            news.map((article) => (
              <div key={article.article_id} className="news-item">
                {/* Use the provided image_url or fallback to source icon */}
                <img
                  src={
                    article.image_url ||
                    article.source_icon ||
                    "https://via.placeholder.com/100"
                  }
                  alt={article.source_name}
                  className="news-image"
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
                    <strong>Source:</strong>
                    <a
                      href={article.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.source_name}
                    </a>
                  </p>
                  <p>
                    <strong>Published:</strong>{" "}
                    {new Date(article.pubDate).toLocaleString()}
                  </p>
                  {article.creator && article.creator.length > 0 && (
                    <p>
                      <strong>Author:</strong> {article.creator.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No news available.</p>
          )}
        </Carousel>
        ;
      </div>

      <div className="home-container">
        <h1 className="home-title">Crypto Video Updates</h1>
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
