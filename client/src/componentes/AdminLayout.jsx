// src/pages/admin/AdminLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/admin/figuras" className="text-gray-700 hover:text-blue-600">Figuras</Link>
          <Link to="/admin/usuarios" className="text-gray-700 hover:text-blue-600">Usuarios</Link>
          <Link to="/admin/configuracion" className="text-gray-700 hover:text-blue-600">Configuración</Link>
        </nav>
      </aside>

           {/* Contenido */}
      <main className="flex-1 p-6">
        <Outlet /> {/* Aquí se renderiza Dashboard o las demás rutas hijas */}
      </main>
    </div>
  );
}
