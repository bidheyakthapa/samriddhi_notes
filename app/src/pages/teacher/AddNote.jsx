import React, { useState } from "react";
import "../../styles/addNote.css";

const AddNote = () => {
  const [formData, setFormData] = useState({ title: "", desc: "", file: null });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Handle changes in input fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, file });
    } else {
      setErrors({ ...errors, file: "Only PDF files are allowed." });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.file) newErrors.file = "Please upload a PDF file.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Note added:", formData);
    setSuccess("Note added successfully!");

    // Reset form after submission
    setFormData({ title: "", desc: "", file: null });
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

        <label htmlFor="desc">Description</label>
        <input
          type="text"
          id="desc"
          placeholder="Enter description"
          value={formData.desc}
          onChange={handleChange}
        />

        <label htmlFor="file">PDF File</label>
        <input
          type="file"
          accept="application/pdf"
          id="file"
          onChange={handleFileChange}
        />
        {errors.file && <p style={{ color: "red" }}>{errors.file}</p>}

        <br />
        <button type="submit">Add</button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddNote;
