import React, { useContext } from "react";
import "../styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Sidebar = ({ items }) => {
  const location = useLocation();
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="sideBar">
      <aside>
        {/* Role name at the top */}
        {currentUser && (
          <div className="roleName">
            {currentUser.role === "admin"
              ? "Admin Portal"
              : currentUser.role === "teacher"
              ? "Teacher Portal"
              : "Student Portal"}
          </div>
        )}

        <nav>
          <ul>
            {items.map((item) => (
              <li
                key={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <button className="logoutButton" onClick={logout}>
          Log Out
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
