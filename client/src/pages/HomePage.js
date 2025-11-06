// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import FigureCard from "../componentes/FigureCard";
import { getFigures } from "../services/api";
import HorizontalScroller from "../componentes/HorizontalScroller";
import { MagnifyingGlass } from "phosphor-react";


const HomePage = () => {
  const [figuresByBrand, setFiguresByBrand] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFigures()
      .then((data) => {
        const enriched = data.map((f) => ({
          ...f,
          brandName: f.brandName || f.brandName,
          stockPrice: f.price,
          inStock: f.inStock,
          imageUrl: f.imageUrl || null,
        }));

        // Agrupar por marca
        const grouped = enriched.reduce((acc, fig) => {
          if (!acc[fig.brandName]) acc[fig.brandName] = [];
          acc[fig.brandName].push(fig);
          return acc;
        }, {});

        setFiguresByBrand(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20">Cargando figuras...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">

      {/* 🔎 BUSCADOR */}
      <div className="w-full flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <MagnifyingGlass
            size={22}
            weight="bold"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Buscar figuras..."
            className="w-full p-3 pl-10 rounded-xl shadow-md border focus:ring-2 focus:ring-gray-300 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full h-px bg-gray-200 shadow-sm my-4" />



      {/* 🔥 CATEGORÍAS */}
      {Object.keys(figuresByBrand).map((brand) => {
        const items = figuresByBrand[brand].filter((fig) =>
          fig.name.toLowerCase().includes(search.toLowerCase())
        );

        if (items.length === 0) return null;

        return (
          <section key={brand} className="mb-10">
            <h2 className="text-2xl font-bold mb-4 ml-2">{brand}</h2>

            <HorizontalScroller>
              {items.map((fig) => (
                <div key={fig.id} className="snap-center min-w-[260px]">
                  <FigureCard figure={fig} />
                </div>
              ))}
            </HorizontalScroller>
          </section>
        );
      })}
    </div>
  );
};

export default HomePage;
