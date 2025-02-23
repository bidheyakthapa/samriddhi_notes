import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";
import { AuthContext } from "../../context/authContext";
import Search from "../../components/Search";
import Toast from "../../components/Toast";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [toast, setToast] = useState(null);
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
        setFilteredNotes(response.data);
      } catch (err) {
        setError("Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser.faculty]);

  const handleSearch = (query) => {
    if (query === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      );

      if (filtered.length === 0) {
        setFilteredNotes(notes);
        setToast({
          status: "error",
          message: "No notes found.",
        });
      } else {
        setFilteredNotes(filtered);
        setToast(null);
      }
    }
  };

  const handleToastClose = () => {
    setToast(null);
  };

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
    <>
      <Search onSearch={handleSearch} />
      <div className="cards">
        {filteredNotes.map((note) => (
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
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={handleToastClose}
        />
      )}
    </>
  );
};

export default Notes;
