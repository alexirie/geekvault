// src/pages/admin/NewFigure.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStock } from "../../../services/api";
import useFigures from "../../../hooks/homePage/useFigures";
import useStores from "../../../hooks/admin/useStores";
import StockForm from "../../../componentes/StockForm";

export default function NewStock() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { figures } = useFigures();
    const { stores } = useStores();

    const handleSubmit = async (data) => {
        setLoading(true);
        setError("");

        try {
            await createStock(
                data.figureId,
                data.storeId,
                data.price,
                data.available,
                data.productUrl,
            );
            navigate("/admin/stock");
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };


    return (
        <div className="w-full flex justify-center py-10">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Nuevo Precio
                </h1>
                <StockForm
                    figures={figures}
                    stores={stores}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                />

            </div>
        </div>
    );
};
