import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./pages/home.tsx";
import Research from "./pages/research.tsx";

import Login from "./pages/login.tsx";
import SignUp from "./pages/signup.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/research" element={<Research />} />


        {/* Protect dashboard route */}
        <Route
          path="/"
          element={
            <SignedIn>
              <Home />
              <Research />
            </SignedIn>
          }
        />

        <Route
          path="/"
          element={
            <SignedOut>
              <Login />
              <SignUp />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
