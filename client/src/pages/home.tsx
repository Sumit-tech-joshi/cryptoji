import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';  // Import the global stylesheet

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

const Home: React.FC = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);


    useEffect(() => {
      // Fetch coins
      axios.get('http://localhost:3001/api/coins')
        .then((res) => setCoins(res.data))
        .catch((err) => console.error(err));


        axios.get('http://localhost:3001/api/news')
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
              <td className={coin.price_change_percentage_24h >= 0 ? 'price-positive' : 'price-negative'}>
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
        <div className="news-container">
          {news.length > 0 ? (
            news.map((article) => (
              <div key={article.article_id} className="news-item">
                {/* Use the provided image_url or fallback to source icon */}
                <img 
                  src={article.image_url || article.source_icon || "https://via.placeholder.com/100"} 
                  alt={article.source_name}
                  className="news-image"
                />
                <div className="news-content">
                  <h3>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h3>
                  <p>{article.description}</p>
                  <p>
                    <strong>Source:</strong> 
                    <a href={article.source_url} target="_blank" rel="noopener noreferrer">
                      {article.source_name}
                    </a>
                  </p>
                  <p><strong>Published:</strong> {new Date(article.pubDate).toLocaleString()}</p>
                  {article.creator && article.creator.length > 0 && (
                    <p><strong>Author:</strong> {article.creator.join(', ')}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No news available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
