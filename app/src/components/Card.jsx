import React from "react";
import "../styles/card.css";

const Card = ({ title, description, link, userId, noteOwnerId, role }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <div className="card-actions">
        {role === "teacher" && userId === noteOwnerId && (
          <>
            <button className="card-button edit-button">Edit</button>
            <button className="card-button delete-button">Delete</button>
          </>
        )}
        {role === "student" && (
          <button className="card-button view-button">View</button>
        )}
      </div>
    </div>
  );
};

export default Card;
