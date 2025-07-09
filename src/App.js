import React from "react";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import BrowsePage from "./pages/BrowsePage";
import Navbar from "./components/Navbar";
import NoteDetail from "./pages/NoteDetail";
import { Routes, Route } from "react-router-dom";

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
