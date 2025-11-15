// src/componentes/PublicRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoute({ redirectTo = "/" }) {
  const { isLogged, user } = useContext(AuthContext);

  // Si está logueado -> redirigir según rol
  if (isLogged) {
    const roles = user?.roles || [];
    const isAdmin = roles.includes("ROLE_ADMIN") || roles.includes("ADMIN");
    return <Navigate to={isAdmin ? "/admin" : "/"} replace />;
  }

  // Si no está logueado -> renderizar login u otras rutas públicas
  return <Outlet />;
}
