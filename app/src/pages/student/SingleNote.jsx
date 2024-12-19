import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/singleNote.css";
import Card from "../../components/Card";
import { AuthContext } from "../../context/authContext";

const SingleNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [relatedNotes, setRelatedNotes] = useState([]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/note/getNoteById/${id}`
        );
        setNote(response.data);
      } catch (err) {
        console.error("Error fetching note:", err);
      }
    };

    const fetchRelatedNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/note/getNotes`
        );
        setRelatedNotes(response.data.filter((n) => n.id !== parseInt(id)));
      } catch (err) {
        console.error("Error fetching related notes:", err);
      }
    };

    fetchNote();
    fetchRelatedNotes();
  }, [id]);

  const handleViewClick = (noteId) => {
    navigate(`/student/note/${noteId}`);
  };

  return (
    <div className="notesContainer">
      <div className="singleNote">
        <h1>{note ? note.title : "Note not found"}</h1>
        <p>{note ? note.description : ""}</p>
        {note && note.file && (
          <iframe
            src={`/upload/${note.file}`}
            width={1000}
            height={700}
            title="Note PDF"
          />
        )}
      </div>
      <div className="relevantNotes">
        <h3>Related Notes</h3>
        {relatedNotes.map((relNote) => (
          <Card
            key={relNote.id}
            title={relNote.title}
            description={relNote.description}
            file={relNote.file}
            noteId={relNote.id}
            userId={currentUser.id}
            role={currentUser.role}
            handleViewClick={handleViewClick}
          />
        ))}
        <Link to="/student/notes" className="link-view-more">
          View More...
        </Link>
      </div>
    </div>
  );
};

export default SingleNote;
