import React from "react";
import "../styles/popup.css";

const Popup = ({ type, onClose, onConfirm }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <span className="popup-close" onClick={onClose}>
          ×
        </span>
        <h4>Are you sure you want to {type}?</h4>
        <div className="popup-actions">
          <button className="popup-button confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="popup-button cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
