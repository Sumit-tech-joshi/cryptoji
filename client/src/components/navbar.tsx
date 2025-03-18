import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import logoDefault from "../assets/logo.webp"; // Default logo
import logoScrolled from "../assets/logo-black.webp"; // Logo when scrolled

const NavBar: React.FC<{ onlyDefaultLogo: boolean }> = ({
  onlyDefaultLogo,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 700) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
 
      <div className="navbar-container">
      {onlyDefaultLogo && (
        <div className="back-button-container">
          <Link to="/" className="back-button ">
            ←
          </Link>
        </div>
      )}
        {/* Dynamic Logo */}
        <img
          src={
            onlyDefaultLogo
              ? logoScrolled
              : scrolled
              ? logoScrolled
              : logoDefault
          }
          className="crypto-logo"
          alt="Crypto Logo"
        />

        <div className="nav-links">
          {/* Show sign-in/sign-up buttons for non-authenticated users */}
          <SignedOut>
            <Link to="/login" className="nav-btn login-btn">
              Login
            </Link>
            <Link to="/signup" className="nav-btn signup-btn">
              SignUp
            </Link>
          </SignedOut>

          {/* Show user button for authenticated users */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
