// src/components/Notification.jsx
import React, { useEffect } from "react";
import "../styles/Notification.css"; // pour le style

const Notification = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;
