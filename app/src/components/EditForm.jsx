import React, { useEffect, useState } from "react";
import "../styles/editForm.css";

const EditForm = ({ data, onClose, handleEdit }) => {
  const [formData, setFormData] = useState({
    id: "", // Add id to form data
    name: "",
    email: "",
    faculty: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  // Set form data when teacher/student data is provided
  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id || "", // Set id from data
        name: data.name || "",
        email: data.email || "",
        faculty: data.faculty || "",
        role: data.role || "",
      });
    }
  }, [data]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, id: formData.id }; // Explicitly add id
    try {
      // Call the passed handleEdit function with formData, including the id
      handleEdit(dataToSubmit);
      onClose(); // Close the form after submission
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
          {/* Name Input */}
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

          {/* Email Input */}
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

          {/* Faculty Dropdown */}
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

          {/* Role Dropdown */}
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

          {/* Submit Button */}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default EditForm;
