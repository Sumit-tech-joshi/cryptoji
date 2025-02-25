import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      {/* Show sign-in/sign-up buttons for non-authenticated users */}
      <SignedOut>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </SignedOut>

      {/* Show user button for authenticated users */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};

export default NavBar;
