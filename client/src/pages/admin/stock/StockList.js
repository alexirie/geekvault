import { useMemo } from "react";
import useStocks from "../../../hooks/admin/useStocks"; // hook que trae los stocks
import Table from "../../../componentes/Table";
import { deleteStock } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function StockList() {
  const { stocks, loading, setStocks } = useStocks();
  const navigate = useNavigate();

  /*const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este precio?")) return;
    try {
      await deleteStock(id); // tu función fetch DELETE
      setStocks((prev) => prev.filter(s => s.id !== id));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };*/

  const columns = useMemo(() => [
    { id: "id", header: "ID", accessorKey: "id" },
    { id: "figureName", header: "Figura", accessorKey: "figureName" },
    { id: "storeName", header: "Tienda", accessorKey: "storeName" },
    { id: "price", header: "Precio", accessorKey: "price" },
    { id: "available", header: "Disponible", accessorKey: "available" },
    { id: "productUrl", header: "Link", accessorKey: "productUrl" },
    { id: "lastChecked", header: "Última actualización", accessorKey: "lastChecked" },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate(`/admin/precios/${row.original.id}/editar`)}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => alert(row.original.id)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ], []);

  if (loading) return <p>Cargando precios...</p>;
  console.log(stocks);

  return (
    <div className="p-6">
      {/* Botón para crear nuevo precio */}
      <div className="flex justify-left mb-4">
        <button
          onClick={() => navigate("/admin/precios/nuevo")}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Añadir Precio
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Precios por tienda</h1>
      <Table columns={columns} data={stocks} />
    </div>
  );
}
