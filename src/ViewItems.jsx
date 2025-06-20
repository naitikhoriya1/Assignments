import React, { useState } from "react";

function Carousel({ images }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={images[idx]}
        alt="item"
        style={{
          maxWidth: 300,
          maxHeight: 200,
          borderRadius: "var(--card-radius)",
        }}
      />
      <div style={{ marginTop: 8 }}>
        <button
          onClick={() => setIdx((idx - 1 + images.length) % images.length)}
          disabled={images.length < 2}
        >
          &lt;
        </button>
        <span style={{ margin: "0 8px" }}>
          {idx + 1} / {images.length}
        </span>
        <button
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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(16,69,91,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "var(--white)",
          padding: 24,
          borderRadius: "var(--card-radius)",
          minWidth: 320,
          maxWidth: 400,
          position: "relative",
          boxShadow: "var(--shadow)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "none",
            border: "none",
            fontSize: 18,
            color: "var(--primary)",
            cursor: "pointer",
          }}
        >
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
        <button
          style={{
            marginTop: 16,
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Enquire
        </button>
      </div>
    </div>
  );
}

export default function ViewItems({ items }) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding: 24, minHeight: "80vh" }}>
      <h1>View Items</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "center",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "var(--white)",
              borderRadius: "var(--card-radius)",
              boxShadow: "var(--shadow)",
              width: 260,
              cursor: "pointer",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "box-shadow 0.2s",
              border: "none",
            }}
            onClick={() => setSelected(item)}
          >
            <img
              src={item.coverImage}
              alt={item.name}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
            <div
              style={{
                background: "var(--bg)",
                padding: "18px 18px 12px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--primary)",
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: 14, color: "#6c7a89" }}>{item.type}</div>
              <button
                style={{
                  marginLeft: "auto",
                  marginTop: 8,
                  background: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  fontSize: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(255,175,32,0.12)",
                  cursor: "pointer",
                }}
              >
                +
              </button>
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
