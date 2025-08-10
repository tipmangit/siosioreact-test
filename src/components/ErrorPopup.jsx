import React from 'react';

const ErrorPopup = ({ message, onClose }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="error-popup" onClick={handleBackgroundClick} style={{ display: 'flex' }}>
      <div className="error-popup-content">
        <h3>Error</h3>
        {Array.isArray(message) ? (
          <ul>
            {message.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ) : (
          <p>{message}</p>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorPopup;