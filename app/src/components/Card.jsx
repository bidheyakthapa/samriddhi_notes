import React from "react";
import "../styles/card.css";
import { useNavigate } from "react-router-dom";

const Card = ({
  title,
  description,
  link,
  userId,
  noteOwnerId,
  role,
  handleDelete,
  noteId,
  handleViewClick,
}) => {
  const navigate = useNavigate();

  const onDelete = () => {
    handleDelete(noteId);
  };

  const goToEditPage = () => {
    navigate(`/teacher/editNote/${noteId}`);
  };

  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <div className="card-actions">
        {role === "teacher" && userId === noteOwnerId && (
          <>
            <button className="card-button edit-button" onClick={goToEditPage}>
              Edit
            </button>
            <button className="card-button delete-button" onClick={onDelete}>
              Delete
            </button>
          </>
        )}
        {role === "student" && (
          <button
            className="card-button view-button"
            onClick={() => handleViewClick(noteId)}
          >
            View
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
