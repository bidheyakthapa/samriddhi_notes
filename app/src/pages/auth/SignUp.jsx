import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    faculty: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API request
      await axios.post("http://localhost:8800/api/auth/register", formData);
    } catch (error) {
      // Check if the error has a response property
      if (error.response) {
        // Set errors from the response data
        setErrors(error.response.data);
      } else {
        // Handle cases where there's no response
        console.error("Network or other error:", error);
        setErrors({ general: "An error occurred. Please try again later." });
      }
    }
  };

  return (
    <div className="authCon">
      <h1>Sign Up</h1>
      <form onSubmit={handelSubmit}>
        {/* Name Input */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
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
          placeholder="Enter your email"
        />
        {errors.email && <div className="error">{errors.email}</div>}

        {/* Password Input */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter a password"
        />
        {errors.password && <div className="error">{errors.password}</div>}

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
        <input type="submit" value="Sign Up" />

        {/* Link to Login page */}
        <span>
          Have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
