// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import FigureCard from '../componentes/FigureCard';
import { getFigures } from '../services/api';

const HomePage = () => {
  const [figures, setFigures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFigures()
      .then((data) => {
        const enriched = data.map(f => ({
            ...f,
            brandName: f.brandId, // si el backend ya devuelve el nombre de la marca
            stockPrice: f.price,    // directamente del DTO
            inStock: f.inStock,     // booleano directamente
            imageUrl: f.imageUrl || null
            }));
            setFigures(enriched);
            setLoading(false);
        })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20">Cargando figuras...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Figuras</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {figures.map(f => <FigureCard key={f.id} figure={f} />)}
      </div>
    </div>
  );
};

export default HomePage;
