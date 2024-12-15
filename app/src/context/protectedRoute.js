import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";

export const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <button
        onClick={() => window.history.back()}
        style={{
          padding: "10px 20px",
          background: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export const Layout = ({ menuItems }) => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar items={menuItems} style={{ flex: "0 0 250px" }} />
      <div style={{ flex: 1, padding: "0 20px", marginLeft: "250px" }}>
        <NavBar />
        <div style={{ marginTop: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export const ProtectedRoute = ({ allowedRoles, menuItems }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    // Render Unauthorized component if role doesn't match
    return <Unauthorized />;
  }

  // Render child routes if user is authenticated and role is allowed
  return (
    <Layout menuItems={menuItems}>
      <Outlet />
    </Layout>
  );
};
