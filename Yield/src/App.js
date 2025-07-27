import React from "react";
import ReservationsList from "./Components/ReservationsList"; // Import the ReservationsList component
import "./index"; // Import the CSS styles

// Main App component
function App() {
  return (
    <div className="App">
      {/* Renders the list of reservations */}
      <ReservationsList />
    </div>
  );
}

export default App;
