// src/components/FigureCard.js
import React from 'react';



const FigureCard = ({ figure }) => {
  return (
    <div className="w-full max-w-xs bg-white rounded-xl overflow-hidden transform transition-all duration-300 
                    hover:scale-105 hover:-translate-y-2 shadow-md hover:shadow-2xl hover:ring-2 hover:ring-gray-300 
                    cursor-pointer relative">
      
      {/* Imagen */}
      <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden relative">
        <img
          src={figure.imageUrl || 'https://via.placeholder.com/300x300.png?text=Figure'}
          alt={figure.name}
          className="w-full h-full object-contain"
        />

        {/* Overlay "En stock" */}
        {figure.inStock && (
          <div className="absolute bottom-0 left-0 w-full bg-green-600 bg-opacity-60 text-white text-center py-2 font-semibold">
            EN STOCK
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-4 bg-white">
        <h2 className="text-xl font-bold text-gray-800">{figure.name}</h2>
        <p className="text-gray-500">Marca: {figure.brandName}</p>
        {figure.stockPrice && (
          <p className="text-green-600 font-semibold mt-1">Precio: ${figure.stockPrice}</p>
        )}
      </div>
    </div>
  );
};

export default FigureCard;


