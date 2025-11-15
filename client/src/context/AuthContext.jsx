// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // opcional: escuchar cambios en localStorage
  useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (token && storedUser) {
    setIsLogged(true);
    setUser(JSON.parse(storedUser));
  } else {
    setIsLogged(false);
    setUser(null);
  }

  const handleStorage = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsLogged(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLogged(false);
      setUser(null);
    }
  };

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}, []);


  // función para loguear
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // guardar user
    setUser(userData);
    setIsLogged(true);
  };

  // función para desloguear
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
