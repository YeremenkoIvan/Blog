import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Опционально: для стилизации

const Navbar = () => {
  const navigate = useNavigate(); // Хук для навигации
  return (
    <nav className="navbar">
      <button className="navbar-logo" onClick={() => navigate("/main")}>
        <h1 className="navbar-title">Blog</h1>
      </button>

      <div className="navbar-buttons">
        <button
          className="navbar-button"
          onClick={() => navigate("/registration")}
        >
          Registration
        </button>
        <button className="navbar-button" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
