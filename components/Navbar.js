import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">ReNotes</Link>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/browse">Browse</Link>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
