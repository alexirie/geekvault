// src/components/FigureCard.js
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FigureCard = ({ figure }) => {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="mt-2 w-full max-w-xs cursor-pointer group relative">
      
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
        </div>

        {/* Información */}
        <div className="mt-0 rounded-xl p-2">
          <h2 className="text-lg font-bold text-gray-500 truncate font-sans">
            {figure.name}
          </h2>

          {figure.stockPrice && (
            <p className="text-gray-800 font-bold mt-1 font-sans">
              {figure.stockPrice} €
            </p>
          )}

          <p className="text-gray-500 text-sm mt-1 font-sans">
            {figure.brandName}
          </p>
        </div>

      </div>
    </div>
  );
};

export default FigureCard;
