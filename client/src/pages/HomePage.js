// src/pages/HomePage.js
import React, { useState } from "react";
import FigureCard from "../componentes/FigureCard";
import HorizontalScroller from "../componentes/HorizontalScroller";
import useFigures from "../hooks/homePage/useFigures";
import SearchBar from "../componentes/SearchBar";
import FilterPills from "../componentes/homePage/FilterPills";
import BottomNav from "../componentes/BottomNav";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const { figures, loading } = useFigures();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("brand"); // "brand" | "collection"
  const navigate = useNavigate();

  console.log('Figures en HomePage:', figures);

  if (loading) return <div className="text-center mt-20">Cargando figuras...</div>;

  // Agrupar según filtro activo
  const grouped = figures.reduce((acc, fig) => {
    let key;

    if (activeFilter === "collection") {
      key = fig.collection || "Sin colección";
    } else if (activeFilter === "anime") {
      key = fig.anime || "Sin anime";
    } else {
      key = fig.brandName || "Sin marca";
    }
    fig.inStock = true;

    if (!acc[key]) acc[key] = [];
    acc[key].push(fig);
    return acc;
  }, {});



  return (
    <div className="bg-gray-100 p-0 sm:px-8 pb-24">
      {/* 🔎 NAV */}
      <div className="sticky top-0 z-30 bg-gray-100">
        {/* 🔎 BUSCADOR */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* 🔎 SEPARADOR */}
        <div className="w-full h-px bg-gray-200 shadow-sm" />
      </div>

      {/* ✅ FILTROS */}
      <div className="mt-3 flex justify-center flex-wrap">
        <FilterPills activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>


      {/* 🔥 CATEGORÍAS */}
      {Object.keys(grouped).map((categoryName) => {
        let items = grouped[categoryName];

        // ✅ Filtro por búsqueda
        items = items.filter((fig) =>
          fig.name.toLowerCase().includes(search.toLowerCase())
          
        );

        if (items.length === 0) return null;

      
        return (
          <section key={categoryName} className="mb-10">
            <h2 className="text-2xl font-bold mb-4 ml-2 mt-3">

              {categoryName}
            </h2>

            <HorizontalScroller>
              {items.map((fig) => (
                
                <div key={fig.id} className="snap-center min-w-[260px]">
                  <FigureCard figure={fig} onClick={() => navigate(`/figure/${fig.id}`)} />
                </div>
              ))}
            </HorizontalScroller>
          </section>
        );
      })}
      <BottomNav></BottomNav>
    </div>
  );
};

export default HomePage;
