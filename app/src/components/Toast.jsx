import React, { useEffect, useState } from "react";
import "../styles/toast.css";

const Toast = ({ status, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Notify parent to reset the toast state after the toast disappears
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const toastClass = status === "error" ? "error" : "success";

  return <div className={`toast ${toastClass}`}>{message}</div>;
};

export default Toast;
