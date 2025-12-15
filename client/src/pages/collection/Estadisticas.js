import useFigures from "../../hooks/homePage/useFigures";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export function Estadisticas() {

    const { figures: figuras } = useFigures();
    const figurasConPrecio = figuras.filter(f => f.price > 0);
    const { t } = useTranslation();

    const valorTotal = figurasConPrecio.reduce((acc, f) => acc + f.price, 0).toFixed(2);
    const figuraMasCara = figurasConPrecio.reduce((max, f) => (f.price > max.price ? f : max), { price: 0 });
    const figuraMasBarata = figurasConPrecio.reduce((min, f) => (f.price < min.price ? f : min), { price: Infinity });

    //calcular cuanto sube/baja
    const now = new Date();

    const isSameMonth = (date) =>
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    const isSameYear = (date) =>
        date.getFullYear() === now.getFullYear();

    const crecimientoMensual = figurasConPrecio
        .filter(f => f.createdAt && isSameMonth(new Date(f.createdAt)))
        .reduce((acc, f) => acc + f.price, 0);

    const crecimientoAnual = figurasConPrecio
        .filter(f => f.createdAt && isSameYear(new Date(f.createdAt)))
        .reduce((acc, f) => acc + f.price, 0);

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 animate-fadeDown"
        >

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="relative p-6 rounded-2xl bg-[#161b22] border border-green-500/30 shadow-[0_0_25px_rgba(34,197,94,0.35)]"
            >
                <p className="text-sm text-green-400 font-semibold tracking-wide flex items-center gap-1">
                    📈 Evolución de la colección
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                    {/* Texto */}
                    <div>
                        <p className="text-2xl font-bold text-blue-100">
                            +{crecimientoMensual.toFixed(2)} €
                            <span className="ml-2 text-sm font-medium text-blue-300">
                                este mes
                            </span>
                        </p>
                        <p className="text-blue-300 text-sm opacity-90 mt-1">
                            +{crecimientoAnual.toFixed(2)} € este año
                        </p>
                    </div>

                    {/* Mini gráfico */}
                    <div className="w-20 h-10 flex items-end gap-1">
                        {[30, 40, 35, 50, 65, 80].map((v, i) => (
                            <span
                                key={i}
                                className="flex-1 rounded-sm bg-green-400/70"
                                style={{ height: `${v}%` }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>


            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="p-5 rounded-2xl bg-[#161b22] border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                    <p className="text-sm text-blue-300">{t("stats.valor_total")}</p>
                    <p className="text-2xl font-bold mt-1 text-blue-100">{valorTotal} €</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="p-5 rounded-2xl bg-[#161b22] border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                    <p className="text-sm text-blue-300">{t("stats.num_figuras")}</p>
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
                        <p className="text-sm text-blue-300 mb-2">{t("stats.mas_barata")}</p>
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
                        <p className="text-sm text-blue-300 mb-2">{t("stats.mas_cara")}</p>
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