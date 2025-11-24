// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { logoutRequest } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || null);
 
  // Estado derivado del token actual
  const isLogged = !!token;

  // Cargar user al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [token]);

  // -------------------------
  // LOGIN
  // -------------------------
  const login = (userData, accessToken, refreshTokenFromBackend) => {
    // guardar en localStorage
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshTokenFromBackend);
    localStorage.setItem("user", JSON.stringify(userData));

    // actualizar estado
    setUser(userData);
    setToken(accessToken);
    setRefreshToken(refreshTokenFromBackend);
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const logout = async () => {

    try {
      if (refreshToken) {
        await logoutRequest(refreshToken);
      }
    } catch (err) {
      console.error("Error cerrando sesión en backend:", err);
    }

    // limpiar front
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    setRefreshToken(null);

    window.location.href = "/login";

  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        token,
        refreshToken,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
