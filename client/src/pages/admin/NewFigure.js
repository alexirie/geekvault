// src/pages/admin/NewFigure.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFigure } from "../../services/api";

export default function NewFigure() {
    const [name, setName] = useState("");
    const [brandId, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [inStock, setInStock] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [anime, setAnime] = useState("");
    const [collection, setCollection] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Llamamos a la función del API con los campos que espera el backend
            await createFigure(
                name,
                brandId,
                parseFloat(price),
                inStock,
                imageUrl,
                anime,
                collection,
                description
            );

            // Si todo OK, vamos a la lista de figuras
            navigate("/admin/figuras");
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    };


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Nueva Figura</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="flex flex-col gap-4 max-w-lg" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Marca"
                    value={brandId}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    className="input"
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="input"
                />
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                    />
                    En stock
                </label>
                <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Anime"
                    value={anime}
                    onChange={(e) => setAnime(e.target.value)}
                    className="input"
                />
                <input
                    type="text"
                    placeholder="Colección"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    className="input"
                />
                <textarea
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {loading ? "Creando..." : "Crear Figura"}
                </button>
            </form>
        </div>
    );
};
