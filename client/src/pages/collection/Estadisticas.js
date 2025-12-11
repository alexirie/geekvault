import { useState, useEffect } from "react";
import useFigures from "../../hooks/homePage/useFigures";
import LoadingSpinner from "../../componentes/LoadingSpinner";
import { FiPlus } from "react-icons/fi"; // icono de + bonito
import SearchBar from "../../componentes/SearchBar";
import { motion } from "framer-motion";


export function Estadisticas() {

    const { figures: figuras } = useFigures();
    const figurasConPrecio = figuras.filter(f => f.price > 0);

    const valorTotal = figurasConPrecio.reduce((acc, f) => acc + f.price, 0).toFixed(2);
    const figuraMasCara = figurasConPrecio.reduce((max, f) => (f.price > max.price ? f : max), { price: 0 });
    const figuraMasBarata = figurasConPrecio.reduce((min, f) => (f.price < min.price ? f : min), { price: Infinity });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 animate-fadeDown"
        >
            <h2 className="text-2xl font-bold text-blue-300 tracking-wide">Estadísticas</h2>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="p-5 rounded-2xl bg-[#161b22] border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                    <p className="text-sm text-blue-300">Valor total</p>
                    <p className="text-2xl font-bold mt-1 text-blue-100">{valorTotal} €</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="p-5 rounded-2xl bg-[#161b22] border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                    <p className="text-sm text-blue-300">Número de figuras</p>
                    <p className="text-2xl font-bold mt-1 text-blue-100">{figuras.length}</p>
                </motion.div>

                {/* Más barata */}
                {figuraMasBarata && figuraMasBarata.price !== Infinity && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="relative bg-[#161b22]/80 backdrop-blur-sm border border-blue-500/20 rounded-xl p-3 flex flex-col items-center shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                    >
                        <p className="text-sm text-blue-300 mb-2">Figura más barata</p>
                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-black/20 mb-2">
                            <img src={figuraMasBarata.imageUrl} className="w-full h-full object-contain" />
                        </div>
                        <p className="text-blue-100 text-sm font-semibold text-center line-clamp-2 h-10">
                            {figuraMasBarata.name}
                        </p>
                        <p className="text-blue-400 text-xs font-semibold mt-1 animate-pulse">
                            {figuraMasBarata.price.toFixed(2)}€
                        </p>
                    </motion.div>
                )}

                {/* Más cara */}
                {figuraMasCara && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="relative bg-[#161b22]/80 backdrop-blur-sm border border-blue-500/20 rounded-xl p-3 flex flex-col items-center shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                    >
                        <p className="text-sm text-blue-300 mb-2">Figura más cara</p>
                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-black/20 mb-2">
                            <img src={figuraMasCara.imageUrl} className="w-full h-full object-contain" />
                        </div>
                        <p className="text-blue-100 text-sm font-semibold text-center line-clamp-2 h-10">
                            {figuraMasCara.name}
                        </p>
                        <p className="text-blue-400 text-xs font-semibold mt-1 animate-pulse">
                            {figuraMasCara.price.toFixed(2)}€
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}