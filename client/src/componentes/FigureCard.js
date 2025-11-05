// src/components/FigureCard.js
import React from 'react';

const FigureCard = ({ figure }) => {
  return (
    <div className="mt-2 w-full max-w-xs cursor-pointer transform transition-all duration-300 hover:scale-105">

      {/* Card con la imagen */}
      <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden shadow-md relative flex items-center justify-center">
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
      </div>

      {/* Información “fuera” de la card */}
      <div className="mt-0 rounded-xl p-3">
        <h2 className="text-lg font-bold text-gray-500 truncate font-sans">{figure.name}</h2>
        {figure.stockPrice && (
          <p className="text-gray-800 font-bold mt-1 font-sans">{figure.stockPrice} €</p>
        )}
        <p className="text-gray-500 text-sm mt-1 font-sans">Marca: {figure.brandId}</p>
      </div>

    </div>
  );
};

export default FigureCard;
