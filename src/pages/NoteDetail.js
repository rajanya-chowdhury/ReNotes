import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const docRef = doc(db, "notes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNote({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (!note) return <p style={{ padding: "20px" }}>Note not found.</p>;

  return (
    <div className="note-detail-container">
      <h2>{note.title}</h2>
      <p><strong>Description:</strong> {note.description}</p>
      <p><strong>Subject:</strong> {note.category}</p>
      <p><strong>Price:</strong> ₹{note.price}</p>
      <button
  onClick={() => window.open(note.paymentLink || "#", "_blank")}
  className="mt-4 bg-blue-600 text-white text-lg font-medium py-2 px-6 rounded-2xl hover:bg-blue-700 transition-colors duration-300"
>
  Buy Now
</button>



      <p><strong>Uploaded on:</strong> {note.timestamp?.toDate?.().toLocaleDateString("en-IN")}</p>

      {note.fileURL && (
        <div className="note-preview">
          <iframe
            src={note.fileURL}
            title="Note Preview"
            width="100%"
            height="500px"
          ></iframe>
        </div>
      )}

      <Link to="/browse" className="back-button">← Back to Browse</Link>
    </div>
  );
}

export default NoteDetail;
