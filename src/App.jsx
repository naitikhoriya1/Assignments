import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ViewItems from "./ViewItems";
import AddItem from "./AddItem";

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Nike Shirt",
      type: "Shirt",
      description: "A comfortable Nike shirt.",
      coverImage: "https://via.placeholder.com/150",
      additionalImages: [
        "https://via.placeholder.com/300x200",
        "https://via.placeholder.com/300x201",
      ],
    },
    {
      id: 2,
      name: "Adidas Shoes",
      type: "Shoes",
      description: "Stylish Adidas running shoes.",
      coverImage: "https://via.placeholder.com/150/0000FF/808080",
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
      <nav
        style={{
          display: "flex",
          gap: 16,
          padding: 16,
          borderBottom: "1px solid #eee",
        }}
      >
        <Link to="/">View Items</Link>
        <Link to="/add">Add Item</Link>
      </nav>
      {successMessage && (
        <div
          style={{
            background: "#d4edda",
            color: "#155724",
            padding: 10,
            margin: 10,
            borderRadius: 4,
          }}
        >
          {successMessage}
        </div>
      )}
      <Routes>
        <Route path="/" element={<ViewItems items={items} />} />
        <Route path="/add" element={<AddItem addItem={addItem} />} />
      </Routes>
    </Router>
  );
}

export default App;
