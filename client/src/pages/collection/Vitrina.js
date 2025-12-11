
import { useState } from "react";
import useFigures from "../../hooks/homePage/useFigures";
import { FiPlus } from "react-icons/fi"; // icono de + bonito
import SearchBar from "../../componentes/SearchBar";
import { useTranslation } from 'react-i18next';


export function Vitrina() {

    const { figures: figuras } = useFigures();
    const [search, setSearch] = useState("");
    const { t } = useTranslation();
 
    // Categorías (ejemplo simple)
    const categorias = {
        Personaje: figuras.filter(f => f.type === "Personaje").length,
        Set: figuras.filter(f => f.type === "Set").length,
        Limitada: figuras.filter(f => f.type === "Limitada").length,
    };

    const figurasFiltradas = figuras.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="space-y-6 animate-fadeDown">
            <h2 className="text-2xl font-bold text-blue-300 tracking-wide">Tu Colección</h2>

            <div className="flex items-center gap-3 pt-2">
                {/* Botón añadir pequeño */}
                <button
                    onClick={() => console.log("Abrir modal/buscador")}
                    className="flex items-center justify-center p-3 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300 ml-1"
                >
                    <FiPlus className="w-6 h-6" />
                </button>

                {/* SearchBar */}
                <div className="flex-1">
                    <SearchBar search={search} setSearch={setSearch} placeholderText={t("placeholders.mi_coleccion")} />
                </div>
            </div>

            {/* Grid de figuras */}
            <div className="grid grid-cols-2 gap-5">
                {figuras.length === 0 && (
                    <p className="text-gray-400 text-sm italic col-span-2">Todavía no añadiste ninguna figura.</p>
                )}

                {figurasFiltradas.map((fig) => (
                    <div
                        key={fig.id}
                        className="bg-[#161b22]/80 backdrop-blur-sm border border-blue-500/20 rounded-xl p-3 flex flex-col shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-black/20">
                            <img src={fig.imageUrl} alt={fig.name} className="w-full h-full object-contain" />
                        </div>
                        <p className="text-blue-100 text-sm font-semibold leading-tight mt-2 line-clamp-2">{fig.name}</p>
                        {fig.price > 0 && (
                            <p className="text-blue-300 text-xs opacity-80 mt-1">{fig.price.toFixed(2)}€</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
