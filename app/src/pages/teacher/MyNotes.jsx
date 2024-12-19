import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { AuthContext } from "../../context/authContext";

const MyNotes = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(
          "http://localhost:8800/api/note/getNotesByTeacher",
          {
            params: { userId: currentUser.id },
          }
        );
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
        setError("Failed to load notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser.id]);

  const handleDelete = async (noteId) => {
    try {
      const res = await axios.delete(
        "http://localhost:8800/api/note/deleteNote",
        {
          data: { noteId },
        }
      );
      console.log(noteId);
      if (res.status === 200) {
        setNotes(notes.filter((note) => note.id !== noteId));
      }
    } catch (err) {
      console.error("Failed to delete note", err);
      setError("Failed to delete note. Please try again.");
    }
  };

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="cards">
      {notes.map((note) => (
        <Card
          key={note.id}
          noteId={note.id}
          title={note.title}
          description={note.description}
          link={note.file}
          userId={currentUser.id}
          noteOwnerId={note.teacher_id}
          role={currentUser.role}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MyNotes;
