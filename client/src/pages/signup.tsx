import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-black.png";

const SignUpPage: React.FC = () => {
  return (
    <div className="auth-container margin-top-8 text-align-center">
      <img src={logo} className="crypto-logo" />
      <h1>Create Your CryptoJi Account</h1>
      <SignUp />
      <div className="login-footer">Already have an account? <Link to="/login">Sign in</Link> </div>

    </div>
  );
};

export default SignUpPage;
