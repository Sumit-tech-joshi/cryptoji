import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/crypto_logo.png'; 
const NavBar: React.FC = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#f5f5f5'
    }}>
        <img src={logo} className="crypto-logo"/>

      <Link to="/">
      </Link>
   
    </nav>
  );
};

export default NavBar;
