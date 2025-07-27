import React from "react";
import ReservationCard from "./ReservationCard";

// Component to display the entire list of upcoming reservations
const ReservationsList = () => {
  // Static JSON data provided for the task [cite: 11]
  const reservationsData = [
    {
      id: 1,
      venueName: "The Grand Cafe",
      date: "2024-08-15 ",
      time: "19:00",
      partySize: 2,
      status: "Confirmed",
    }, // [cite: 12]
    {
      id: 2,
      venueName: "Ocean's Breeze",
      date: "2024-08-22 ",
      time: "20:30",
      partySize: 4,
      status: "Confirmed",
    }, // [cite: 13]
    {
      id: 3,
      venueName: "The Rooftop Grill",
      date: "2024-09-01",
      time: "18:00",
      partySize: 5,
      status: "Pending",
    }, // [cite: 14]
  ];

  return (
    <div className="reservations-container">
      <h1>Upcoming Reservations</h1>
      <div className="reservations-list">
        {/* Renders a ReservationCard for each item in the data array */}
        {reservationsData.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default ReservationsList;
