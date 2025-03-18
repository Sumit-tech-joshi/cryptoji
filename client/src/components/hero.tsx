import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.webp";
import NavBar from "../components/navbar.tsx"; // Ensure correct import path
import { useUser } from "@clerk/clerk-react"; // Clerk User Hook

const Hero: React.FC = () => {
  const { user, isLoaded } = useUser(); // Get Clerk User

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <NavBar />
      <div className="hero-section desktop-width">
        <div className="hero-content">
          <h1>Explore, Analyze & Track Cryptocurrencies</h1>
          <p>
            Get real-time price updates, latest news, and AI-powered insights.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToContent}>
              Start Exploring
            </button>
            {isLoaded && user && (
              <Link to="/research" className="nav-btn user-btn btn-primary">
                Analyze My Coins
              </Link>
            )}
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
