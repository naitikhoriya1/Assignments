import React from "react";

// Functional component to display a single reservation card
const ReservationCard = ({ reservation }) => {
  // Destructure reservation data for easy access
  const { id, venueName, date, time, partySize } = reservation;

  // Handler for the cancel button click
  const handleCancel = () => {
    console.log("Cancel reservation:", id); // Logs the ID to the console upon activation [cite: 22, 23]
  };

  return (
    <div className="reservation-card">
      <div>
        <div className="card-header">
          {/* Displays the venue name */}
          <h2>{venueName}</h2>
        </div>
        <div className="card-body">
          {/* Displays reservation details: date, time, and party size */}
          <p>
            <strong>Date:</strong> {date.trim()}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <p>
            <strong>Party Size:</strong> {partySize}
          </p>
        </div>
      </div>
      {/* Cancel button with onClick handler */}
      <button className="cancel-button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default ReservationCard;
