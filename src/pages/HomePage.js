import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function HomePage() {
  return (
    <div className="homepage">
      <h1 style={{ color: '#007bff', fontWeight: 'bold' }}>ReNotes</h1>
      <p className="tagline">Buy & Sell Used Notes, Easily.</p>

      <div className="button-group">
        <Link to="/upload">
          <button className="btn primary">List Your Notes</button>
        </Link>
        <Link to="/browse">
          <button className="btn secondary">Browse Materials</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
