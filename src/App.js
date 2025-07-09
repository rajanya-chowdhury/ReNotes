// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import BrowsePage from "./pages/BrowsePage";
import NoteDetail from "./pages/NoteDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </>
  );
}

export default App;
