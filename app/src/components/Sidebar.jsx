import React from "react";
import "../styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ items }) => {
  const location = useLocation();
  return (
    <div className="sideBar">
      <aside>
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
      </aside>
    </div>
  );
};

export default Sidebar;
