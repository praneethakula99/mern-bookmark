import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";  // ✅ Import the CSS file

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard"); // Redirect logged-in users to dashboard
    }
  }, [token, navigate]);

  return (
    <div className="hero-section d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <h1 className="text-white fw-bold">Welcome to Bookmark Manager</h1>
        <p className="text-white">Organize and manage your favourite links effortlessly.</p>
        <a href="/signup" className="btn btn-primary btn-lg">Get Started</a>
      </div>
    </div>
  );
};

export default Home;
