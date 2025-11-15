// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // opcional: escuchar cambios en localStorage
  useEffect(() => {
    // 🔹 Función segura para cargar el usuario desde localStorage
    const loadUserFromStorage = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      let parsedUser = null;

      try {
        parsedUser = storedUser ? JSON.parse(storedUser) : null;
      } catch (err) {
        console.warn("Error parsing user from localStorage:", err);
        parsedUser = null;
      }

      if (token && parsedUser) {
        setIsLogged(true);
        setUser(parsedUser);
      } else {
        setIsLogged(false);
        setUser(null);
      }
    };

    // 🔹 Inicializar al cargar la app
    loadUserFromStorage();

    // 🔹 Escuchar cambios en localStorage (otras pestañas o logout)
    window.addEventListener("storage", loadUserFromStorage);
    return () => window.removeEventListener("storage", loadUserFromStorage);
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
