import React, { useState, useEffect } from "react";
import { SignUp, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo-black.webp";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

const SignUpPage: React.FC = () => {
  const { user } = useUser();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);

  // Fetch coins from API when component loads
  useEffect(() => {
    localStorage.setItem("currentPage", "SignUp");
    axios
      .get("https://cryptoji.onrender.com/api/coins")
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Update search results when user types
  useEffect(() => {
    if (searchTerm.length > 0) {
      const matches = coins
        .filter((coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3); // Limit to top 3 results
      setFilteredCoins(matches);
    } else {
      setFilteredCoins([]);
    }
  }, [searchTerm, coins]);

  // Add a coin to favorites
  const addFavoriteCoin = (coinSymbol: string) => {
    if (!favoriteCoins.includes(coinSymbol)) {
      setFavoriteCoins([...favoriteCoins, coinSymbol]);
    }
    setSearchTerm("");
    setFilteredCoins([]);

    localStorage.setItem("favoriteCoins", JSON.stringify([...favoriteCoins, coinSymbol]));
  };

  // Remove a coin from favorites
  const removeFavoriteCoin = (coinSymbol: string) => {
    setFavoriteCoins(favoriteCoins.filter((coin) => coin !== coinSymbol));
    localStorage.setItem("favoriteCoins", JSON.stringify(favoriteCoins.filter((coin) => coin !== coinSymbol)));
  };


  return (
    <div className="auth-container text-align-center margin-top-5">
      <img src={logo} className="crypto-logo" loading="lazy" />
      <h1 className="margin-bottom-6">Create Your CryptoJi Account</h1>

      <div className="favorite-coins-section margin-top-5">
        {/* Search & Select Favorite Coins */}
        <div className="coin-search-container">
          <h5>Select Your Favorite Cryptocurrencies</h5>
          <input
            type="text"
            placeholder="Search for a coin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="coin-search-input"
          />
          {filteredCoins.length > 0 && (
            <ul className="coin-search-dropdown">
              {filteredCoins.map((coin) => (
                <li key={coin.id} onClick={() => addFavoriteCoin(coin.symbol)}>
                  <img src={coin.image} alt={coin.name} className="coin-icon"  loading="lazy"/>{" "}
                  {coin.name} ({coin.symbol})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Display Selected Favorite Coins */}
        <div className="favorite-coins-container">
          {favoriteCoins.length > 0 && (
            <>
              <h5>Selected Favorite Coins:</h5>
              <ul className="favorite-coins-list">
                {favoriteCoins.map((coinSymbol) => (
                  <li key={coinSymbol}>
                    {coinSymbol}{" "}
                    <button onClick={() => removeFavoriteCoin(coinSymbol)}>
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Clerk Signup Form */}
      <SignUp />

      <div className="login-footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
