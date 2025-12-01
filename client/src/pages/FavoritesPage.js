// src/pages/FavoritesPage.js (versión dark estilo Steam)
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

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesFromApi = await getUserFavorites(token);
        const normalized = favoritesFromApi.map(fav => ({ ...fav, id: fav.figureId }));
        setFavoriteFigures(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [token]);

  if (loading) return <LoadingSpinner />;

  const grouped = favoriteFigures.reduce((acc, fig) => {
    let key;
    if (activeFilter === "collection") key = fig.collection || "Sin colección";
    else if (activeFilter === "anime") key = fig.anime || "Sin anime";
    else key = fig.brandName || "Sin marca";
    if (!acc[key]) acc[key] = [];
    acc[key].push(fig);
    return acc;
  }, {});

  return (
    <div className="bg-[#0b0f15] p-0 sm:px-8 pb-24 min-h-screen text-[#c7d5e0]">

      {/* BUSCADOR */}
      <div className="sticky top-0 z-30 bg-[#0b0f15]/90 backdrop-blur-md">
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholderText="favoritos"
        />
        <div className="w-full h-px bg-[#2a3b52]" />
      </div>

      {/* FILTROS */}
      <div className="mt-5 flex justify-center flex-wrap">
        <FilterPills
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      {/* FIGURAS FAVORITAS AGRUPADAS */}
      {Object.keys(grouped).map((categoryName) => {
        let items = grouped[categoryName];
        items = items.filter((fig) => fig.name.toLowerCase().includes(search.toLowerCase()));
        if (items.length === 0) return null;

        return (
          <section key={`fav-cat-${categoryName}`} className="mb-10">
            <h2 className="text-2xl font-bold mb-4 ml-2 mt-3 text-[#66c0f4]">
              {categoryName}
            </h2>

            <HorizontalScroller>
              {items.map((fig) => (
                <div key={`fav-${fig.id}`} className="snap-center w-[256px] shrink-0">
                  <FigureCard
                    figure={fig}
                    isFavorite={true}
                    onClick={() => navigate(`/figure/${fig.id}`)}
                  />
                </div>
              ))}
            </HorizontalScroller>
          </section>
        );
      })}

      <Footer />
      <BottomNav />
    </div>
  );
};

export default FavoritesPage;