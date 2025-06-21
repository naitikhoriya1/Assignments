import React, { useState } from "react";
import "./ViewItems.css";

function Carousel({ images }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div className="carousel">
      <img src={images[idx]} alt="item" className="carousel-image" />
      <div className="carousel-controls">
        <button
          className="carousel-btn"
          onClick={() => setIdx((idx - 1 + images.length) % images.length)}
          disabled={images.length < 2}
        >
          &lt;
        </button>
        <span className="carousel-indicator">
          {idx + 1} / {images.length}
        </span>
        <button
          className="carousel-btn"
          onClick={() => setIdx((idx + 1) % images.length)}
          disabled={images.length < 2}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

function ItemModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn">
          ×
        </button>
        <h2>{item.name}</h2>
        <Carousel
          images={[item.coverImage, ...(item.additionalImages || [])]}
        />
        <p>
          <b>Type:</b> {item.type}
        </p>
        <p>
          <b>Description:</b> {item.description}
        </p>
        <button className="btn">Enquire</button>
      </div>
    </div>
  );
}

export default function ViewItems({ items }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="view-items-container">
      <h1>View Items</h1>
      <div className="items-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="item-card"
            onClick={() => setSelected(item)}
          >
            <img
              src={item.coverImage}
              alt={item.name}
              className="item-card-image"
            />
            <div className="item-card-content">
              <div className="item-card-name">{item.name}</div>
              <div className="item-card-type">{item.type}</div>
              <button className="item-card-add-btn">+</button>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <ItemModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
