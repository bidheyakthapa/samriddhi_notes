import React from "react";
import { Link } from "react-router-dom";
import "../../styles/auth.css";

const LogIn = () => {
  return (
    <div className="authCon">
      <h1>Log In</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
        <label htmlFor="pass">Password</label>
        <input type="text" id="pass" />

        <input type="submit" />
        <span>
          Don't have an account ?<Link to="/signup">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LogIn;
