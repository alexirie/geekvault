// src/components/FigureCard.js
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

      {/* Sombra exterior que aparece en hover */}
      <div className="rounded-xl transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] group-hover:bg-gray-200 p-1">

        {/* Card con la imagen */}
        <div className="w-full h-64 bg-gray-100 bg-white rounded-xl overflow-hidden shadow-md relative flex items-center justify-center">
          <img
            src={figure.imageUrl || 'https://via.placeholder.com/300x300.png?text=Figure'}
            alt={figure.name}
            className="max-h-full max-w-full object-contain"
          />

          {/* Overlay "En stock" */}
          {figure.inStock && (
            <div className="absolute top-2 left-2 bg-green-600 bg-opacity-80 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
              EN STOCK
            </div>
          )}


          {/* Botón favorito en la esquina superior derecha */}
          <div className="absolute top-2 right-2">
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
                    showToast("Agregado a favoritos 💙");
                  } else {
                    // eliminar favorito (si tienes la función deleteUserFavorite)
                    console.log("Lllamando al delete fav, token: " + token);
                    await deleteUserFavorite(figure.id, token);
                    setFavorite(false);
                    showToast("Eliminado de favoritos 💔");
                  }
                } catch (err) {
                  console.error("Error actualizando favorito:", err);
                }
              }}
              className="text-blue-500 text-2xl"
              whileTap={{ scale: 1.3 }}
              animate={{ scale: favorite ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              {favorite ? <FaHeart /> : <FaRegHeart />}
            </motion.button>
          </div>


          {/* ✨ Precio en banda negra inferior */}
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-lg font-bold text-center py-1">
            {figure.stockPrice
              ? `${Number(figure.stockPrice).toFixed(2)} €`
              : `${Number(figure.price).toFixed(2)} €`
            }
          </div>
        </div>

        {/* Información */}
        <div className="mt-0 rounded-xl p-2">
          <h2 className="text-lg font-bold text-gray-500 font-sans line-clamp-2">
            {figure.name}
          </h2>

          <p className="text-gray-500 text-sm mt-1 font-sans">
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
