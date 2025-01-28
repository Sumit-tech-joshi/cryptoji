import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#f5f5f5'
    }}>
      <Link to="/">
        <h2>CryptoJi</h2>
      </Link>
      {/* Additional links or UI */}
    </nav>
  );
};

export default NavBar;
