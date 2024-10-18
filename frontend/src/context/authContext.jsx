import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", inputs);
      const userData = res.data;
      if (userData.token) {
        setCurrentUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.error("Token is missing from the response");
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
    }
  };
  

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      localStorage.removeItem("token");
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout error:", err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
