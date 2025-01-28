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

const Home: React.FC = () => {
    const [coins, setCoins] = useState<Coin[]>([]);

    useEffect(() => {
      // Fetch coins
      axios.get('http://localhost:3001/api/coins')
        .then((res) => setCoins(res.data))
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
    </div>
  );
};

export default Home;
