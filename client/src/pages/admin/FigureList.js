import React, { useEffect, useState, useMemo } from "react";
import useFigures from "../../hooks/homePage/useFigures";
import Table from "../../componentes/Table";

export default function FiguresList() {

 const { figures, loading } = useFigures();

 const columns = useMemo(
  () => [
    { id: "id", header: "ID", accessorKey: "id" },
    { id: "name", header: "Nombre", accessorKey: "name" },
    { id: "in_stock", header: "Stock", accessorKey: "inStock" },
    { id: "price", header: "Precio", accessorKey: "price" },
    { id: "brandName", header: "Marca", accessorKey: "brandName" },
    { id: "image_url", header: "Foto", accessorKey: "imageUrl" },
    { id: "anime", header: "Anime", accessorKey: "anime" },
    { id: "collection", header: "Colección", accessorKey: "collection" },
    { id: "description", header: "Descripción", accessorKey: "description" },
    { id: "lastUpdate", header: "Último cambio", accessorKey: "lastUpdate" },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => alert("Editar figura " + row.original.id)}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => alert("Eliminar figura " + row.original.id)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ],
  []
);

    

  if (loading) return <p>Cargando figuras...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Figuras</h1>
        <Table columns={columns} data={figures}/>
    </div>
  );
}
