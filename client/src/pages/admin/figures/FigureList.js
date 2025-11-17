import { useMemo } from "react";
import useFigures from "../../../hooks/homePage/useFigures";
import Table from "../../../componentes/Table";
import { deleteFigure } from "../../../services/api";

import { useNavigate } from "react-router-dom";

export default function FiguresList() {

 const { figures, loading, setFigures } = useFigures();
 const navigate = useNavigate();

 const handleDelete = async (id) => {
  if (!window.confirm("¿Seguro que quieres eliminar esta figura?")) return;
  try {
    await deleteFigure(id); // tu función que hace fetch DELETE
    // Actualizas el estado para quitar la figura borrada
    setFigures((prev) => prev.filter(f => f.id !== id));
  } catch (err) {
    alert("Error al eliminar: " + err.message);
  }
};


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
            onClick={() => navigate(`/admin/figuras/${row.original.id}/editar`)}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(row.original.id)}
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
        {/* Botón para crear nueva figura */}
      <div className="flex justify-left mb-4">
        <button
          onClick={() => navigate("/admin/figuras/nueva")}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Crear Figura
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Lista de Figuras</h1>
        <Table columns={columns} data={figures}/>
    </div>
  );
}
