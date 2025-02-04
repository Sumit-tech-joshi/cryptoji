import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Import CSS
import heroImage from "../assets/hero.png"; // Update with your actual image
import NavBar from "../components/navbar.tsx";

const Hero: React.FC = () => {
  return (
    <section className="hero ">
      <NavBar />

      <div className="hero-section desktop-width">
        <div className="hero-content">
          <h1>Explore, Analyze & Track Cryptocurrencies</h1>
          <p>
            Get real-time price updates, latest news, and AI-powered insights.
          </p>

          <div className="hero-buttons">
            <Link to="/coins" className="btn-primary">
              Start Exploring
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-image">
          <img src={heroImage} alt="Crypto Hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
