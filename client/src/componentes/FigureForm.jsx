// src/components/FigureForm.jsx
import { useState, useEffect } from "react";

export default function FigureForm({ initialData = {}, onSubmit, loading, error }) {
    const [name, setName] = useState(initialData.name || "");
    const [brandId, setBrand] = useState(initialData.brandId || "");
    const [price, setPrice] = useState(initialData.price || "");
    const [inStock, setInStock] = useState(initialData.inStock ?? true);
    const [anime, setAnime] = useState(initialData.anime || "");
    const [collection, setCollection] = useState(initialData.collection || "");
    const [description, setDescription] = useState(initialData.description || "");
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let finalImageUrl = initialData.imageUrl || "";

        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);

            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/figures/upload`, {
                method: "POST",
                body: formData,
            });
            finalImageUrl = await res.text();
        }

        onSubmit({
            name,
            brandId,
            price: parseFloat(price),
            inStock,
            anime,
            collection,
            description,
            imageUrl: finalImageUrl,
        });
    };

    const handleFileChange = (e) => setImageFile(e.target.files[0]);

    return (
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{error}</p>}
            
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
                    name="file"
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
                {loading ? "Guardando..." : "Guardar Figura"}
            </button>
        </form>

    );
}