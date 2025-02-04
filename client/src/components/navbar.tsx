import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

const NavBar: React.FC = () => {
  return (
    <nav className="cpt-nav desktop-width ">
      <img src={logo} className="crypto-logo" />

      <Link to="/"></Link>
    </nav>
  );
};

export default NavBar;
