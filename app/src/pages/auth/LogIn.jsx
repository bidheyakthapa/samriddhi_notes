import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../styles/auth.css";
import Toast from "../../components/Toast";
import { AuthContext } from "../../context/authContext";

const LogIn = () => {
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, currentUser } = useContext(AuthContext);

  const handleToastClose = () => {
    setToast(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      setToast({
        status: "success",
        message: "Logged in successfully!",
      });
    } catch (error) {
      setToast({
        status: "error",
        message: error.message || "Failed to Log In.",
      });
    }
  };

  // Redirect if user is already logged in
  if (currentUser) {
    if (currentUser.role === "admin") {
      return <Navigate to="/admin" />;
    } else if (currentUser.role === "teacher") {
      return <Navigate to="/teacher" />;
    } else if (currentUser.role === "student") {
      return <Navigate to="/student" />;
    }
  }

  return (
    <div className="authCon">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          id="pass"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input type="submit" value="Log In" />
        <span>
          Don't have an account? <Link to="/signup">Register</Link>
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

export default LogIn;
