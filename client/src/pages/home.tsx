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

    </div>
  );
};

export default Home;
