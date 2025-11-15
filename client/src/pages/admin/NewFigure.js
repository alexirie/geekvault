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
    const [imageFile, setImageFile] = useState(null);

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

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };


    return (
        <div className="w-full flex justify-center py-10">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Nueva Figura
                </h1>

                {error && (
                    <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">
                        {error}
                    </p>
                )}

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* NOMBRE */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* MARCA */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            ID Marca
                        </label>
                        <input
                            type="text"
                            value={brandId}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* PRECIO */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Precio (€)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* EN STOCK */}
                    <label className="flex items-center gap-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={inStock}
                            onChange={(e) => setInStock(e.target.checked)}
                            className="w-5 h-5 accent-blue-500"
                        />
                        En stock
                    </label>

                    {/* URL IMAGEN */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Imagen
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>


                    {/* ANIME */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Anime
                        </label>
                        <input
                            type="text"
                            value={anime}
                            onChange={(e) => setAnime(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* COLECCIÓN */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Colección
                        </label>
                        <input
                            type="text"
                            value={collection}
                            onChange={(e) => setCollection(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    {/* BOTÓN */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white py-3 px-5 rounded-xl text-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
                    >
                        {loading ? "Creando..." : "Crear Figura"}
                    </button>
                </form>
            </div>
        </div>
    );
};
