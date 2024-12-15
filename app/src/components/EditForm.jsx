import React, { useEffect, useState } from "react";
import "../styles/editForm.css";

const EditForm = ({ data, onClose, handleEdit }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    faculty: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id || "",
        name: data.name || "",
        email: data.email || "",
        faculty: data.faculty || "",
        role: data.role || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, id: formData.id };
    try {
      handleEdit(dataToSubmit);
      onClose();
    } catch (error) {
      setErrors({ general: "Failed to submit the form. Try again later." });
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <button onClick={onClose} className="closeFormBtn">
          &times;
        </button>

        <h1>Edit {data?.role === "teacher" ? "Teacher" : "Student"}</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />
          {errors.name && <div className="error">{errors.name}</div>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <label htmlFor="faculty">Faculty</label>
          <select
            id="faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
          >
            <option value="">Select Faculty</option>
            <option value="BCA">BCA</option>
            <option value="CSIT">CSIT</option>
          </select>
          {errors.faculty && <div className="error">{errors.faculty}</div>}

          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.role && <div className="error">{errors.role}</div>}

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default EditForm;
