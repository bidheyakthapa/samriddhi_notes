import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        data
      );
      setCurrentUser(response.data);
    } catch (error) {
      throw new Error(error.response?.data || "Login failed");
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
