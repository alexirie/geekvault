// src/componentes/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * ProtectedRoute:
 * - Si el usuario está logueado y tiene rol ADMIN devuelve <Outlet/> (rutas hijas)
 * - Si no está logueado redirige a /login
 * - Si está logueado pero no es admin redirige a /
 *
 * Uso: envolver rutas <Route path="/admin" element={<ProtectedRoute/>}> ... </Route>
 */
export default function ProtectedRoute({ redirectTo = "/login", noAdminRedirect = "/" }) {
  const { isLogged, user } = useContext(AuthContext);

  // Si no está logueado -> ir a login
  if (!isLogged) return <Navigate to={redirectTo} replace />;

  // Comprobar roles (ajusta la propiedad si tu user tiene otro shape)
  const roles = user?.roles || [];
  const isAdmin = roles.includes("ROLE_ADMIN") || roles.includes("ADMIN");

  console.log('es admin: '+isAdmin);

  if (!isAdmin) return <Navigate to={noAdminRedirect} replace />;

  // OK -> renderizar las rutas hijas
  return <Outlet />;
}
