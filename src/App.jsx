import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ViewItems from "./ViewItems";
import AddItem from "./AddItem";

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Nike Shoes",
      type: "Shirt",
      description: "A comfortable Nike shirt.",
      coverImage:
        "https://i.pinimg.com/736x/8b/3b/fa/8b3bfaf6d9a9ad6cc09c45f3d1b06395.jpg",
      additionalImages: [
        "https://www.nike.com/in/u/custom-nike-dunk-high-by-you-shoes-10001378",
        "https://via.placeholder.com/300x201",
      ],
    },
    {
      id: 2,
      name: "Adidas Shoes",
      type: "Shoes",
      description: "Stylish Adidas running shoes.",
      coverImage:
        "https://i.pinimg.com/736x/97/26/61/972661f3a16b2b1a6bc89675da6049cd.jpg",
      additionalImages: [
        "https://via.placeholder.com/300x202",
        "https://via.placeholder.com/300x203",
      ],
    },
  ]);
  const [successMessage, setSuccessMessage] = useState("");

  const addItem = (item) => {
    setItems((prev) => [...prev, { ...item, id: Date.now() }]);
    setSuccessMessage("Item successfully added");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">
          View Items
        </Link>
        <Link to="/add" className="nav-link">
          Add Item
        </Link>
      </nav>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <main className="container">
        <Routes>
          <Route path="/" element={<ViewItems items={items} />} />
          <Route path="/add" element={<AddItem addItem={addItem} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
