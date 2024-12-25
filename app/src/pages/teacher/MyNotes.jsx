import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import { AuthContext } from "../../context/authContext";
import Popup from "../../components/Popup";
import Toast from "../../components/Toast";

const MyNotes = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          "http://localhost:8800/api/note/getNotesByTeacher",
          {
            params: { userId: currentUser.id },
          }
        );
        setNotes(res.data);
      } catch (err) {
        setToast({
          status: "error",
          message: "Failed to load notes. Please try again.",
        });
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
      if (res.status === 200) {
        setNotes(notes.filter((note) => note.id !== noteId));
        setToast({ status: "success", message: "Note deleted successfully!" });
      }
    } catch (err) {
      console.error("Failed to delete note", err);
      setToast({
        status: "error",
        message: "Failed to delete note. Please try again.",
      });
    }
  };

  const handleConfirmAction = () => {
    if (actionType === "delete") {
      handleDelete(selectedNoteId);
    }
    setShowPopup(false);
  };

  const handleAction = (noteId, type) => {
    setSelectedNoteId(noteId);
    setActionType(type);
    setShowPopup(true);
  };

  if (loading) return <p>Loading notes...</p>;

  return (
    <div className="cards">
      {notes.map((note) => (
        <Card
          key={note.id}
          noteId={note.id}
          title={note.title}
          description={note.description}
          file={note.file}
          userId={currentUser.id}
          noteOwnerId={note.teacher_id}
          role={currentUser.role}
          handleDelete={() => handleAction(note.id, "delete")}
        />
      ))}

      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {showPopup && (
        <Popup
          type={actionType}
          onClose={() => setShowPopup(false)}
          onConfirm={handleConfirmAction}
        />
      )}
    </div>
  );
};

export default MyNotes;
