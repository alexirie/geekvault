import React, { useEffect, useState } from "react";
import useFigures from "../../hooks/homePage/useFigures";

export default function FiguresList() {

 const { figures, loading } = useFigures();



  if (loading) return <p>Cargando figuras...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Figuras</h1>
      <table className="w-full table-auto border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Categoría</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {figures.map((fig) => (
            <tr key={fig.id}>
              <td className="border px-4 py-2">{fig.id}</td>
              <td className="border px-4 py-2">{fig.name}</td>
              <td className="border px-4 py-2">{fig.category}</td>
              <td className="border px-4 py-2">${fig.price}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500 hover:underline mr-2">Editar</button>
                <button className="text-red-500 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
