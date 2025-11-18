// src/components/StockForm.jsx
import { useState } from "react";


export default function StockForm({ figures = [], stores = [], initialData = {}, onSubmit, loading, error }) {
    const [figureId, setFigureId] = useState(initialData.figureId || "");
    const [storeId, setStoreId] = useState(initialData.storeId || "");
    const [price, setPrice] = useState(initialData.price || "");
    const [available, setAvailable] = useState(initialData.available ?? true);
    const [productUrl, setProductUrl] = useState(initialData.productUrl || "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        onSubmit({
            figureId,
            storeId,
            price: parseFloat(price),
            available,
            productUrl,

        });
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4 bg-red-100 p-2 rounded">{error}</p>}

            {/* FIGURA */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Figura</label>
                <select
                    value={figureId}
                    onChange={(e) => setFigureId(e.target.value)}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                    <option value="">Selecciona una figura</option>
                    {figures.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                </select>
            </div>

            {/* TIENDA */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Tienda</label>
                <select
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                    <option value="">Selecciona una tienda</option>
                    {stores.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </div>

            {/* PRECIO */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Precio (€)</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </div>

            {/* DISPONIBLE */}
            <label className="flex items-center gap-2 text-gray-700">
                <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="w-5 h-5 accent-blue-500"
                />
                Disponible
            </label>

            {/* URL DEL PRODUCTO */}
            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">URL del producto</label>
                <input
                    type="url"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </div>

            {/* BOTÓN */}
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-3 px-5 rounded-xl text-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
            >
                {loading ? "Guardando..." : "Guardar Stock"}
            </button>
        </form>
    );
}