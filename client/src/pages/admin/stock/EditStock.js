// src/pages/admin/EditStock.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStockById, updateStock } from "../../../services/api";
import useFigures from "../../../hooks/homePage/useFigures";
import useStores from "../../../hooks/admin/useStores";
import StockForm from "../../../componentes/StockForm";

export default function EditStock() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { figures } = useFigures();
  const { stores } = useStores();

  // Obtener el stock a editar
  useEffect(() => {
    getStockById(id)
      .then((data) => setStock(data))
      .catch((e) => setError(e.message));
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      await updateStock(id, data);
      navigate("/admin/stock");
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  };

  if (!stock) return <p>Cargando...</p>;

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Editar Precio</h1>

        <StockForm
          initialData={stock}
          figures={figures}
          stores={stores}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
