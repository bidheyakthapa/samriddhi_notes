import React, { useContext, useState } from "react";
import "../styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Sidebar = ({ items }) => {
  const location = useLocation();
  const { currentUser, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar open and close
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the sidebar when a navigation link is clicked
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sideBar ${isOpen ? "open" : ""}`}>
        <aside>
          <div className="roleName">
            {currentUser &&
              (currentUser.role === "admin"
                ? "Admin Portal"
                : currentUser.role === "teacher"
                ? "Teacher Portal"
                : "Student Portal")}
          </div>

          <nav>
            <ul>
              {items.map((item) => (
                <li
                  key={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {/* Clicking on a link closes the sidebar */}
                  <Link to={item.path} onClick={closeSidebar}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button className="logoutButton" onClick={logout}>
            Log Out
          </button>
        </aside>
      </div>

      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="toggleButton">
        ☰
      </button>
    </>
  );
};

export default Sidebar;
