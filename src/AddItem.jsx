import React, { useState } from "react";
import "./AddItem.css";

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
    <div className="add-item-container">
      <div className="add-item-form-container">
        <h1>Add Item</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Item Name"
              required
            />
          </label>
          <label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              {itemTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Item Description"
              required
            />
          </label>
          <label className="file-label">
            Item Cover Image
            <input
              name="coverImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
              className="file-input"
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="cover preview"
                className="preview-image"
              />
            )}
          </label>
          <label className="file-label">
            Item Additional Images
            <input
              name="additionalImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="file-input"
            />
            <div className="additional-previews">
              {additionalPreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="preview"
                  className="additional-preview-image"
                />
              ))}
            </div>
          </label>
          <button type="submit" className="btn">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
