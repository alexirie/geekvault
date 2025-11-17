// src/pages/admin/NewFigure.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFigure } from "../../../services/api";
import FigureForm from "../../../componentes/FigureForm";

export default function NewFigure() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setLoading(true);
        setError("");

        try {
            await createFigure(
                data.name,
                data.brandId,
                data.price,
                data.inStock,
                data.imageUrl,
                data.anime,
                data.collection,
                data.description
            );
            navigate("/admin/figuras");
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };


    return (
        <div className="w-full flex justify-center py-10">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Nueva Figura
                </h1>
                <FigureForm onSubmit={handleSubmit} loading={loading} error={error} />

            </div>
        </div>
    );
};
