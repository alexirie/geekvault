import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getFigureById, getFigures } from "../services/api";
import FigureCard from "../componentes/FigureCard";
import PriceComparisonPanel from "../componentes/PriceComparisonPanel";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import BottomNav from "../componentes/BottomNav";
import useStocks from "../hooks/admin/useStocks";
import storeLogos from "../config/storeLogos";
import LoadingSpinner from "../componentes/LoadingSpinner";
import HorizontalScroller from "../componentes/HorizontalScroller";
import { getUserFavorites, createUserFavorite, deleteUserFavorite } from "../services/api";
import { AuthContext } from '../context/AuthContext';
import Footer from "../componentes/Footer";
import { useTranslation } from 'react-i18next';

function FigureDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [figure, setFigure] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const { stocks } = useStocks();
    const [favorites, setFavorites] = useState([]);
    const { isLogged, token } = useContext(AuthContext);
    const { t } = useTranslation();

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


    //Cargar favoritos
    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem("token");

            const favoritesFromApi = await getUserFavorites(token);

            console.log("Favoritos:", favoritesFromApi);

            // Extraemos solo los IDs de figura
            const favoriteIds = favoritesFromApi.map(f => f.figureId);

            setFavorites(favoriteIds);
            console.log("Favoritos IDs:", favoriteIds);

        };

        loadData();
    }, [id]);

    // Cuando figure o favorites cambian, sincronizamos el favorito
    useEffect(() => {
        if (figure) {
            setFavorite(favorites.includes(Number(figure.id)));
        }
    }, [figure, favorites]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [id]); // <- ID de la figura actual

    if (loading) return <LoadingSpinner />;
    if (!figure) return <p className="p-4 text-center">Figura no encontrada</p>;


    return (
        <div className="bg-[#0b0f15] min-h-screen pb-24 text-[#c7d5e0]">
            {/* 🔙 HEADER */}
            <div className="sticky top-0 z-30 bg-[#0b0f15]/90 backdrop-blur-md h-16 relative border-b border-[#2a3b52]">
                {/* Botón volver */}
                <button
                    onClick={() => navigate('/')}
                    className="text-[#66c0f4] font-bold absolute left-4 top-1/2 -translate-y-1/2">
                    ← Volver
                </button>

            </div>

            {/* 🔥 CONTENIDO PRINCIPAL */}
            <div className="p-4 flex flex-col items-center">
                {/* Imagen */}
                <div className="w-full h-[60vh] bg-[#1b2838] flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(102,192,244,0.3)] mb-4">
                    <img
                        src={figure.imageUrl}
                        alt={figure.name}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>

                {/* Datos alineados a la izquierda */}
                <div className="w-full max-w-md flex justify-between items-start mb-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold text-[#66c0f4]">{figure.name}</h2>
                        <p className="text-[#c7d5e0]">{figure.brandName}</p>
                        <p className="text-[#c7d5e0]">{t("figura.coleccion")}: {figure.collection}</p>
                        <p className="text-[#c7d5e0]">{t("figura.serie")}: {figure.anime}</p>
                        <p className="text-[#c7d5e0]">{t("figura.material")}: {figure.material}</p>
                    </div>

                    {/* Botón pequeño de favorito */}
                    <motion.button
                        onClick={async (e) => {
                            e.stopPropagation(); // evita que se active el click de la card

                            if (!isLogged) {
                                console.log("Usuario no logueado, redirigiendo a login");
                                navigate("/login");
                                return;
                            }

                            console.log("Token actual:", token);
                            console.log("Figura que intento marcar:", figure.id);

                            try {
                                if (!favorite) {
                                    // crear favorito
                                    const response = await createUserFavorite({ figureId: figure.id }, token);
                                    console.log("Respuesta backend:", response);
                                    setFavorite(true);
                                    setFavorites(prev => [...prev, Number(figure.id)]);
                                } else {
                                    // eliminar favorito (si tienes la función deleteUserFavorite)
                                    console.log("Lllamando al delete fav, token: " + token);
                                    await deleteUserFavorite(figure.id, token);
                                    setFavorite(false);
                                    setFavorites(prev => prev.filter(fid => fid !== Number(figure.id)));
                                }
                            } catch (err) {
                                console.error("Error actualizando favorito:", err);
                            }
                        }}
                        className="text-[#66c0f4] text-2xl"
                        whileTap={{ scale: 1.3 }}
                        animate={{ scale: favorite ? 1.2 : 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    >
                        {favorite ? <FaHeart /> : <FaRegHeart />}
                    </motion.button>
                </div>


                {/* ✨ DESCRIPCIÓN */}
                {figure.description && (
                    <div className="w-full max-w-md bg-[#1b2838] rounded-lg shadow-[0_0_15px_rgba(102,192,244,0.3)] p-4 mb-6 text-[#c7d5e0] text-sm sm:text-base leading-relaxed">
                        {figure.description}
                    </div>
                )}

                {/* Panel de precios */}
                <PriceComparisonPanel prices={figureStocks} />

                {/* Figuras relacionadas */}
                {related.length > 0 && (
                    <section className="w-full mt-6">
                        <h3 className="text-lg font-semibold mb-2 ml-2 text-[#66c0f4]">
                            {t("titulos.mas_de")} {figure.brandName}
                        </h3>

                        <HorizontalScroller>
                            {related.map((f) => (
                                <div key={f.id} className="snap-center w-[256px] flex-none">
                                    <FigureCard figure={f} isFavorite={favorites.includes(f.id)} onClick={() => navigate(`/figure/${f.id}`)} />
                                </div>
                            ))}
                        </HorizontalScroller>

                    </section>
                )}
            </div>
            <Footer />
            <BottomNav></BottomNav>
        </div>
    );
}


export default FigureDetail;
