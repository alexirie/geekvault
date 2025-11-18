import { useMemo } from "react";
import useStocks from "../../../hooks/admin/useStocks"; // hook que trae los stocks
import Table from "../../../componentes/Table";
import { deleteStock } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../componentes/SearchBar";
import React, { useState } from "react";

export default function StockList() {
    const { stocks, loading, setStocks } = useStocks();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este precio?")) return;
        try {
            await deleteStock(id); // tu función fetch DELETE
            setStocks((prev) => prev.filter(s => s.id !== id));
        } catch (err) {
            alert("Error al eliminar: " + err.message);
        }
    };

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
                        onClick={() => navigate(`/admin/stock/${row.original.id}/editar`)}
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
    ], []);

    // Filtrar resultados según el buscador
    const filteredStocks = useMemo(() => {
        const term = search.toLowerCase();

        return stocks.filter(s =>
            s.figureName.toLowerCase().includes(term) ||
            s.storeName.toLowerCase().includes(term) ||
            String(s.price).includes(term)
        );
    }, [stocks, search]);


    if (loading) return <p>Cargando precios...</p>;



    return (
        <div className="p-6">
            {/* Botón para crear nuevo precio */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <button
                    onClick={() => navigate("/admin/stock/nuevo")}
                    className="bg-green-600 text-white py-2 px-5 rounded-xl font-semibold hover:bg-green-700 transition shadow-sm"
                >
                    Añadir
                </button>

                <div className="flex-1 min-w-[500px] max-w-xs ml-auto">
                    <SearchBar search={search} setSearch={setSearch} />
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">Precios por tienda</h1>
            <Table columns={columns} data={filteredStocks} />
        </div>
    );
}
