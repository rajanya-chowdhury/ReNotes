import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../App.css";

function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Physics");
  const [price, setPrice] = useState("0");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !price.trim()) {
      setMessage("❌ Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "notes"), {
        title: title.trim(),
        description: description.trim(),
        category,
        price,
        timestamp: serverTimestamp(),
      });

      setTitle("");
      setDescription("");
      setCategory("Physics");
      setPrice("0");
      setMessage("✅ Note uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Failed to upload note.");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Upload a Note</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Math">Math</option>
          <option value="English">English</option>
        </select>
        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />
        <button type="submit">Upload Note</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default UploadPage;
