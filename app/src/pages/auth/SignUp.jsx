import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../styles/auth.css";
import axios from "axios";
import Toast from "../../components/Toast";
import { AuthContext } from "../../context/authContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    faculty: "",
    role: "",
  });

  const [toast, setToast] = useState();

  const { currentUser } = useContext(AuthContext);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", formData);
      setToast({
        status: "success",
        message: "Sign up successfull!",
      });
    } catch (error) {
      setToast({
        status: "error",
        message: error.response
          ? error.response.data
          : "Failed to register user.",
      });
    }
  };

  if (currentUser) {
    if (currentUser.role === "admin") {
      return <Navigate to="/admin" />;
    } else if (currentUser.role === "teacher") {
      return <Navigate to="/teacher" />;
    } else if (currentUser.role === "student") {
      return <Navigate to="/student" />;
    }
  }
  const handleToastClose = () => {
    setToast(null);
  };

  return (
    <div className="authCon">
      <h1>Sign Up</h1>
      <form onSubmit={handelSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter a password"
        />

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

        <input type="submit" value="Sign Up" />

        <span>
          Have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default SignUp;
