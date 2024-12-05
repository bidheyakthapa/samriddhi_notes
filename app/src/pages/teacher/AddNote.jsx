import React, { useState } from "react";
import "../../styles/addNote.css";

const AddNote = () => {
  const [formData, setFormData] = useState({ title: "", link: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.link) newErrors.link = "Link is required";
    if (!/^https?:\/\/.+\..+/.test(formData.link)) {
      newErrors.link = "Invalid URL format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Form submission logic
    console.log("Note added:", formData);
    setSuccess("Note added successfully!");

    // Reset form
    setFormData({ title: "", desc: "", link: "" });
    setErrors({});
  };

  return (
    <div className="addNote">
      <h1 style={{ marginTop: "15px" }}>Add Note</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter the title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        <br />
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          id="desc"
          placeholder="Enter description"
          value={formData.desc}
          onChange={handleChange}
        />
        <label htmlFor="link">Link</label>
        <input
          type="text"
          id="link"
          placeholder="Paste the link (e.g., Google Drive, YouTube)"
          value={formData.link}
          onChange={handleChange}
        />
        {errors.link && <p style={{ color: "red" }}>{errors.link}</p>}
        <br />

        <button type="submit">Add</button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddNote;
