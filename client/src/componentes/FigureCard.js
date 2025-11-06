// src/components/FigureCard.js
import React from 'react';

const FigureCard = ({ figure }) => {
  return (
    <div className="mt-2 w-full max-w-xs cursor-pointer group">
      
      {/* Sombra exterior que aparece en hover */}
      <div className="rounded-xl transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] group-hover:bg-gray-200 p-1">

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
            Marca: {figure.brandName}
          </p>
        </div>

      </div>
    </div>
  );
};

export default FigureCard;
