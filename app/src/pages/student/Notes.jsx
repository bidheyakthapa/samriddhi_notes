import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import { AuthContext } from "../../context/authContext";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/note/getNotesByFaculty",
          {
            params: { faculty: currentUser.faculty },
          }
        );
        setNotes(response.data);
      } catch (err) {
        setError("Failed to load notes.");
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser.faculty]);

  const handleViewClick = (noteId) => {
    navigate(`/student/note/${noteId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cards">
      {notes.map((note) => (
        <Card
          key={note.id}
          title={note.title}
          description={note.description}
          file={note.file}
          noteId={note.id}
          userId={currentUser.id}
          role={currentUser.role}
          handleViewClick={handleViewClick}
        />
      ))}
    </div>
  );
};

export default Notes;
