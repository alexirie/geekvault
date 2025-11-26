// src/pages/FavoritesPage.js
import React, { useState, useEffect, useContext } from "react";
import FigureCard from "../componentes/FigureCard";
import HorizontalScroller from "../componentes/HorizontalScroller";
import SearchBar from "../componentes/SearchBar";
import FilterPills from "../componentes/homePage/FilterPills";
import BottomNav from "../componentes/BottomNav";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../componentes/LoadingSpinner";
import { getUserFavorites } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Footer from "../componentes/Footer";

const FavoritesPage = () => {
  const [favoriteFigures, setFavoriteFigures] = useState([]); 
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("brand");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // 🔥 Cargar favoritos del usuario
  useEffect(() => {
  const loadFavorites = async () => {
    try {
      const favoritesFromApi = await getUserFavorites(token);

      console.log("Favoritos API:", favoritesFromApi);

      // Normalizar: el backend NO devuelve id → solo figureId
      const normalized = favoritesFromApi.map(fav => ({
        ...fav,
        id: fav.figureId
      }));

      console.log("Normalizados:", normalized);

      setFavoriteFigures(normalized);
    } catch (err) {
      console.error("Error cargando favoritos:", err);
    } finally {
      setLoading(false);
    }
  };

  loadFavorites();
}, [token]);

  if (loading) return <LoadingSpinner />;

  // 🔍 Agrupación dinámica por marca/colección/anime
  const grouped = favoriteFigures.reduce((acc, fig) => {
    let key;

    if (activeFilter === "collection") key = fig.collection || "Sin colección";
    else if (activeFilter === "anime") key = fig.anime || "Sin anime";
    else key = fig.brandName || "Sin marca"; // default = brand

    if (!acc[key]) acc[key] = [];
    acc[key].push(fig);

    return acc;
  }, {});

  return (
    <div className="bg-gray-100 p-0 sm:px-8 pb-24">

      {/* BUSCADOR */}
      <div className="sticky top-0 z-30 bg-gray-100">
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholderText="favoritos"
        />
        <div className="w-full h-px bg-gray-200 shadow-sm" />
      </div>

      {/* FILTROS */}
      <div className="mt-3 flex justify-center flex-wrap">
        <FilterPills
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      {/* FIGURAS FAVORITAS AGRUPADAS */}
      {Object.keys(grouped).map((categoryName) => {
        let items = grouped[categoryName];

        // 🔍 Filtro de búsqueda
        items = items.filter((fig) =>
          fig.name.toLowerCase().includes(search.toLowerCase())
        );

        if (items.length === 0) return null;

        return (
          <section key={`fav-cat-${categoryName}`} className="mb-10">

            <h2 className="text-2xl font-bold mb-4 ml-2 mt-3">
              {categoryName}
            </h2>

            <HorizontalScroller>
              {items.map((fig) => (
                <div key={`fav-${fig.id}`} className="snap-center w-[256px] shrink-0">
                  <FigureCard
                    figure={fig}
                    isFavorite={true}  // Todas son favoritas
                    onClick={() => navigate(`/figure/${fig.id}`)}
                  />
                </div>
              ))}
            </HorizontalScroller>

          </section>
        );
      })}
      <Footer/>
      <BottomNav />
    </div>
  );
};

export default FavoritesPage;
