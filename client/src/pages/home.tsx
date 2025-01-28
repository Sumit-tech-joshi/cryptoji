import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';  // Import the global stylesheet

// Coin interface to define structure


const Home: React.FC = () => {


  return (
    <div className="home-container">
      <h1 className="home-title">Top Cryptocurrencies</h1>

    </div>
  );
};

export default Home;
