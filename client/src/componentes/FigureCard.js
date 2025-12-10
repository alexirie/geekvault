// src/components/FigureCard.js (versión dark con sombras azules permanentes)
import { useState, useContext, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { createUserFavorite, deleteUserFavorite } from "../services/api";
import useToast from '../hooks/useToast';
import CustomToast from "../componentes/ui/CustomToast";

const FigureCard = ({ figure, isFavorite, onClick }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const { isLogged, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <div className="mt-2 w-full max-w-xs cursor-pointer group relative" onClick={onClick}>

      {/* Sombra azul permanente */}
      <div className="rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(102,192,244,0.5)] bg-[#1b2838]/60 p-1 backdrop-blur-md border border-[#66c0f4]/20">

        {/* Card con imagen */}
        <div className="w-full h-64 bg-white rounded-xl rounded-b-none overflow-hidden shadow-lg relative flex items-center justify-center">
          <img
            src={figure.imageUrl || 'https://via.placeholder.com/300x300.png?text=Figure'}
            alt={figure.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay "En stock" */}
          {figure.inStock && (
            <div className="absolute top-2 left-2 bg-green-500 bg-opacity-80 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
              EN STOCK
            </div>
          )}

          {/* Botón favorito */}
          <div className="absolute top-2 right-2">
            <motion.button
              onClick={async (e) => {
                e.stopPropagation();
                if (!isLogged) return navigate('/login');

                try {
                  if (!favorite) {
                    await createUserFavorite({ figureId: figure.id }, token);
                    setFavorite(true);
                    showToast("Agregado a favoritos 💙");
                  } else {
                    await deleteUserFavorite(figure.id, token);
                    setFavorite(false);
                    showToast("Eliminado de favoritos 💔");
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              className="text-[#66c0f4] text-2xl hover:text-white"
              whileTap={{ scale: 1.3 }}
              animate={{ scale: favorite ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              {favorite ? <FaHeart /> : <FaRegHeart />}
            </motion.button>
          </div>

          {/* Precio en banda inferior */}
          {figure.stockPrice !== 0 && (
            <div className="absolute bottom-0 left-0 w-full 
                bg-gradient-to-t from-black/80 to-black/40
                text-[#eaf3ff] text-xl font-semibold 
                text-center py-2 
                backdrop-blur-sm shadow-[0_-4px_10px_rgba(0,0,0,0.25)]">
              {figure.stockPrice ? `${Number(figure.stockPrice).toFixed(2)} €` : `${Number(figure.price).toFixed(2)} €`}
            </div>
          )}

        </div>

        {/* Información de la figura */}
        <div className="mt-2 rounded-xl p-2">
          <h2 className="text-lg font-bold text-[#c7d5e0] font-sans line-clamp-2">
            {figure.name}
          </h2>
          <p className="text-[#66c0f4] text-sm mt-1 font-sans">
            {figure.brandName}
          </p>
        </div>

      </div>
      <CustomToast
        message={toast.message}
        visible={toast.visible}
      />
    </div>
  );
};

export default FigureCard;
