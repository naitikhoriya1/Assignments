import React, { useState } from "react";

const initialState = {
  name: "",
  type: "",
  description: "",
  coverImage: null,
  additionalImages: [],
};

const itemTypes = ["Shirt", "Pant", "Shoes", "Sports Gear", "Other"];

export default function AddItem({ addItem }) {
  const [form, setForm] = useState(initialState);
  const [coverPreview, setCoverPreview] = useState(null);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImage") {
      const file = files[0];
      setForm((f) => ({ ...f, coverImage: file }));
      setCoverPreview(file ? URL.createObjectURL(file) : null);
    } else if (name === "additionalImages") {
      const filesArr = Array.from(files);
      setForm((f) => ({ ...f, additionalImages: filesArr }));
      setAdditionalPreviews(filesArr.map((f) => URL.createObjectURL(f)));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert images to URLs for demo (in real app, upload to server)
    const reader = (file) =>
      new Promise((res) => {
        if (!file) return res("");
        const fr = new FileReader();
        fr.onload = (e) => res(e.target.result);
        fr.readAsDataURL(file);
      });
    Promise.all([
      reader(form.coverImage),
      Promise.all(form.additionalImages.map(reader)),
    ]).then(([cover, additional]) => {
      addItem({
        name: form.name,
        type: form.type,
        description: form.description,
        coverImage: cover,
        additionalImages: additional,
      });
      setForm(initialState);
      setCoverPreview(null);
      setAdditionalPreviews([]);
    });
  };

  return (
    <div
      style={{
        padding: 24,
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          background: "var(--white)",
          borderRadius: "var(--card-radius)",
          boxShadow: "var(--shadow)",
          padding: 32,
          minWidth: 340,
          maxWidth: 420,
        }}
      >
        <h1 style={{ marginTop: 0 }}>Add Item</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <label style={{ fontWeight: 500 }}>
            Item Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                marginTop: 4,
              }}
            />
          </label>
          <label style={{ fontWeight: 500 }}>
            Item Type
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                marginTop: 4,
              }}
            >
              <option value="">Select type</option>
              {itemTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label style={{ fontWeight: 500 }}>
            Item Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                marginTop: 4,
                minHeight: 60,
              }}
            />
          </label>
          <label style={{ fontWeight: 500 }}>
            Item Cover Image
            <input
              name="coverImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
              style={{ marginTop: 4 }}
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="cover preview"
                style={{
                  width: 100,
                  marginTop: 8,
                  borderRadius: 8,
                  boxShadow: "var(--shadow)",
                }}
              />
            )}
          </label>
          <label style={{ fontWeight: 500 }}>
            Item Additional Images
            <input
              name="additionalImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              style={{ marginTop: 4 }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {additionalPreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="preview"
                  style={{
                    width: 60,
                    borderRadius: 8,
                    boxShadow: "var(--shadow)",
                  }}
                />
              ))}
            </div>
          </label>
          <button
            type="submit"
            style={{
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              padding: "10px 0",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              marginTop: 8,
              boxShadow: "0 2px 8px rgba(255,175,32,0.12)",
            }}
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
