import { NavLink, Outlet } from "react-router-dom";
import BottomNav from "../componentes/BottomNav";
import { useState, useEffect } from "react";
import useFigures from "../hooks/homePage/useFigures";
import LoadingSpinner from "../componentes/LoadingSpinner";
import { FiPlus } from "react-icons/fi"; // icono de + bonito
import SearchBar from "../componentes/SearchBar";

export default function CollectionPage() {

    return (
        <div className="min-h-screen p-6 pb-[90px]  space-y-6 bg-[#0d1117] text-blue-100 ">

            {/* Tabs */}
            <div className="flex gap-6 border-b border-blue-500/20 pb-1">
                <NavLink
                    to="vitrina"
                    className={({ isActive }) =>
                        `
            pb-2 text-lg transition-all duration-300 relative
            ${isActive ? "text-blue-400 font-semibold" : "text-gray-400 hover:text-blue-300"}
            `
                    }
                >
                    {({ isActive }) => (
                        <span className="relative">
                            Tu Vitrina
                            {isActive && (
                                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                            )}
                        </span>
                    )}
                </NavLink>

                <NavLink
                    to="sets"
                    className={({ isActive }) =>
                        `
            pb-2 text-lg transition-all duration-300 relative
            ${isActive ? "text-blue-400 font-semibold" : "text-gray-400 hover:text-blue-300"}
            `
                    }
                >
                    {({ isActive }) => (
                        <span className="relative">
                            Sets
                            {isActive && (
                                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                            )}
                        </span>
                    )}
                </NavLink>
            </div>

            {/* Contenido dinamico */}
            <Outlet />
            <BottomNav />
        </div>
    );
}


// ---------- VITRINA ----------
export function Vitrina() {

    const { figures: figuras } = useFigures();

    //Cojo solo las figuras que no valen 0
    const figurasConPrecio = figuras.filter(f => f.price > 0);

    // Estadísticas derivadas
    const valorTotal = figurasConPrecio.reduce((acc, f) => acc + f.price, 0).toFixed(2);
    const figuraMasCara = figurasConPrecio.reduce((max, f) => (f.price > max.price ? f : max), { price: 0 });
    const figuraMasBarata = figurasConPrecio.reduce((min, f) => (f.price < min.price ? f : min), { price: Infinity });

    // Categorías (ejemplo simple)
    const categorias = {
        Personaje: figuras.filter(f => f.type === "Personaje").length,
        Set: figuras.filter(f => f.type === "Set").length,
        Limitada: figuras.filter(f => f.type === "Limitada").length,
    };



    return (
        <div className="space-y-6 animate-fadeDown">
            <h2 className="text-2xl font-bold text-blue-300 tracking-wide">Tu Vitrina Virtual</h2>

            {/* Stats generales */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#161b22] border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <p className="text-sm text-blue-300">Valor total</p>
                    <p className="text-2xl font-bold mt-1 text-blue-100">{valorTotal} €</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#161b22] border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <p className="text-sm text-blue-300">Número de figuras</p>
                    <p className="text-2xl font-bold mt-1 text-blue-100">{figuras.length}</p>
                </div>
                {figuraMasBarata && (
                    <div className="
        relative bg-[#161b22]/80 backdrop-blur-sm border border-blue-500/20 
        rounded-xl p-3 flex flex-col items-center
        shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.9)]
        transition-all duration-500
      ">
                        <p className="text-sm text-blue-300 mb-2">Figura más barata</p>
                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-black/20 mb-2">
                            <img
                                src={figuraMasBarata.imageUrl}
                                alt={figuraMasBarata.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-blue-100 text-sm font-semibold leading-tight text-center line-clamp-2 h-10">
                            {figuraMasBarata.name}
                        </p>
                        <p className="text-blue-400 text-xs font-semibold mt-1 animate-pulse">
                            {figuraMasBarata.price.toFixed(2)}€
                        </p>

                        {/* Glow azul neón animado */}
                        <span className="
          absolute -inset-1 rounded-xl
          border border-blue-500/30
          shadow-[0_0_25px_rgba(59,130,246,0.7)]
          animate-pulse
          pointer-events-none
        "></span>
                    </div>
                )}

                {figuraMasCara && (
                    <div className="
        relative bg-[#161b22]/80 backdrop-blur-sm border border-blue-500/20 
        rounded-xl p-3 flex flex-col items-center
        shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.9)]
        transition-all duration-500
      ">
                        <p className="text-sm text-blue-300 mb-2">Figura más cara</p>
                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-black/20 mb-2">
                            <img
                                src={figuraMasCara.imageUrl}
                                alt={figuraMasCara.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-blue-100 text-sm font-semibold leading-tight text-center line-clamp-2 h-10">
                            {figuraMasCara.name}
                        </p>
                        <p className="text-blue-400 text-xs font-semibold mt-1 animate-pulse">
                            {figuraMasCara.price.toFixed(2)}€
                        </p>

                        {/* Glow azul neón animado */}
                        <span className="
          absolute -inset-1 rounded-xl
          border border-blue-500/30
          shadow-[0_0_25px_rgba(59,130,246,0.7)]
          animate-pulse
          pointer-events-none
        "></span>
                    </div>
                )}

            </div>


            <div className="flex items-center gap-3 pt-8">
                {/* Botón añadir pequeño */}
                <button
                    onClick={() => console.log("Abrir modal/buscador")}
                    className="flex items-center justify-center p-3 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-300 ml-1"
                >
                    <FiPlus className="w-6 h-6" />
                </button>

                {/* SearchBar */}
                <div className="flex-1">
                    <SearchBar />
                </div>
            </div>

            {/* Grid de figuras */}
            <div className="grid grid-cols-2 gap-5 ">
                {figuras.length === 0 && (
                    <p className="text-gray-400 text-sm italic col-span-2">Todavía no añadiste ninguna figura.</p>
                )}

                {figuras.map((fig) => (
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



// ---------- SETS ----------
export function Sets() {
    return (
        <div className="space-y-4 animate-fadeDown">
            <h2 className="text-2xl font-bold text-blue-300 tracking-wide">
                Sets coleccionables
            </h2>

            <p className="text-gray-400 italic">Muy pronto...</p>
        </div>
    );
}
