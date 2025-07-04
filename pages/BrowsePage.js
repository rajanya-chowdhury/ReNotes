import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../App.css";

function BrowsePage() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notes"));
        const notesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesData);
        console.log("Fetched notes:", notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "" ||
        note.category?.toLowerCase() === filterCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "priceLowHigh") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortOption === "priceHighLow") {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (sortOption === "newest") {
        return (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0);
      } else if (sortOption === "titleAZ") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "titleZA") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  return (
    <div className="browse-container">
      <h2>Browse Notes</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Subjects</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Math">Math</option>
          <option value="English">English</option>
        </select>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort by</option>
          <option value="newest">Newest</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="titleAZ">Title: A to Z</option>
          <option value="titleZA">Title: Z to A</option>
        </select>
      </div>

      <div className="card-grid">
        {filteredNotes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          filteredNotes.map((note) => (
            <Link to={`/note/${note.id}`} key={note.id} className="note-card-link">
              <div className="note-card">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                <p><strong>Subject:</strong> {note.category}</p>
                <p><strong>Price:</strong> ₹{note.price}</p>
                <p><strong>Uploaded:</strong> {note.timestamp?.toDate?.().toLocaleDateString("en-IN")}</p>

              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default BrowsePage;
