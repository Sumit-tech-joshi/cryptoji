import React from "react";
import { SignIn } from "@clerk/clerk-react";
import logo from "../assets/logo-black.png";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="auth-container margin-top-8 text-align-center">
      <img src={logo} className="crypto-logo" />
      <h1 className="margin-top-2 ">Login to CryptoJi</h1>
      <SignIn />
      <div className="login-footer">Don’t have an account? <Link to="/signup">Sign up</Link> </div>
    </div>
  );
};

export default Login;
