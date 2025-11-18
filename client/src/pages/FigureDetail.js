import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFigureById, getFigures } from "../services/api";
import FigureCard from "../componentes/FigureCard";
import PriceComparisonPanel from "../componentes/PriceComparisonPanel";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import BottomNav from "../componentes/BottomNav";
import useStocks from "../hooks/admin/useStocks";
import storeLogos from "../config/storeLogos";

function FigureDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [figure, setFigure] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const { stocks } = useStocks();

    // Filtramos los precios de la figura actual
    const figureStocks = stocks
        .filter(s => s.figureId === figure.id)
        .map(s => ({
            ...s,
            logoUrl: storeLogos[s.storeName] || null,
            name: s.storeName,
            url: s.productUrl,
            price: s.price,
        }));

    useEffect(() => {
        async function fetchData() {
            try {
                //Traer detalle de figura
                const data = await getFigureById(id);
                setFigure(data);

                // Traer figuras relacionadas (misma saga)
                const allFigures = await getFigures();
                const relatedFigures = allFigures
                    .filter(f => f.saga === data.saga && f.id !== data.id)
                    .slice(0, 10); // limitar a 10
                setRelated(relatedFigures);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [id]); // <- ID de la figura actual

    if (loading) return <p className="p-4 text-center">Cargando...</p>;
    if (!figure) return <p className="p-4 text-center">Figura no encontrada</p>;

    //figure.description = "Banpresto es uno de los mayores fabricantes Japoneses de Figuras a nivel mundial. Perteneciente al grupo Bandai Spirits, esta empresa ofrece una calidad precio única. Actualmente dispone de múltiples líneas diferentes para que todos los fans puedan tener en su colección una figura que se adapte a su manera de disfrutar del mundo de las figuras.";


    return (
        <div className="bg-gray-100 min-h-screen pb-24">
            {/* 🔙 HEADER */}
            <div className="sticky top-0 z-30 bg-gray-100 flex items-center p-4 shadow-sm">
                <button
                    onClick={() => navigate('/')}
                    className="text-blue-500 font-bold mr-4"
                >
                    ← Volver
                </button>

            </div>

            {/* 🔥 CONTENIDO PRINCIPAL */}
            <div className="p-4 flex flex-col items-center">
                {/* Imagen */}
                <div className="w-full h-[75vh] bg-white flex items-center justify-center rounded-lg shadow-lg mb-4">
                    <img
                        src={figure.imageUrl}
                        alt={figure.name}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>

                {/* Datos alineados a la izquierda */}
                <div className="w-full max-w-md flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold">{figure.name}</h2>
                        <p className="text-gray-600">{figure.brandName}</p>
                        <p className="text-gray-600">Colección: {figure.collection}</p>
                        <p className="text-gray-600">Serie: {figure.anime}</p>

                    </div>

                    {/* Botón pequeño de favorito */}
                    <motion.button
                        onClick={(e) => {
                            e.stopPropagation(); // evita que se active el click de la card
                            setFavorite(!favorite);
                        }}
                        className="text-blue-500 text-2xl"
                        whileTap={{ scale: 1.3 }} // efecto “pop” al pulsar
                        animate={{ scale: favorite ? 1.2 : 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    >
                        {favorite ? <FaHeart /> : <FaRegHeart />}
                    </motion.button>
                </div>


                {/* ✨ DESCRIPCIÓN */}
                {figure.description && (
                    <div className="w-full max-w-md bg-white rounded-lg shadow p-4 mb-6 text-gray-700 text-sm sm:text-base leading-relaxed">
                        {figure.description}
                    </div>
                )}

                {/* Panel de precios */}
                <PriceComparisonPanel prices={figureStocks} />

                {/* Figuras relacionadas */}
                {related.length > 0 && (
                    <section className="w-full mt-6">
                        <h3 className="text-lg font-semibold mb-2 ml-2">
                            Más de {figure.brandName}
                        </h3>
                        <div className="flex overflow-x-auto gap-3 px-2 snap-x">
                            {related.map((f) => (
                                <div key={f.id} className="snap-center min-w-[200px]">
                                    <FigureCard figure={f} onClick={() => navigate(`/figure/${f.id}`)} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
            <BottomNav></BottomNav>
        </div>
    );
}

export default FigureDetail;
