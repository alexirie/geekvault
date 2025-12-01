// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import FigureCard from "../componentes/FigureCard";
import HorizontalScroller from "../componentes/HorizontalScroller";
import useFigures from "../hooks/homePage/useFigures";
import SearchBar from "../componentes/SearchBar";
import FilterPills from "../componentes/homePage/FilterPills";
import BottomNav from "../componentes/BottomNav";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../componentes/LoadingSpinner";
import { getUserFavorites } from "../services/api";
import Footer from "../componentes/Footer";

const HomePage = () => {
  const { figures, loading } = useFigures();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("brand");
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      const favoritesFromApi = await getUserFavorites(token);
      const favoriteIds = favoritesFromApi.map((f) => f.figureId);
      setFavorites(favoriteIds);
    };

    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;

  const grouped = figures.reduce((acc, fig) => {
    let key;

    if (activeFilter === "collection") key = fig.collection || "Sin colección";
    else if (activeFilter === "anime") key = fig.anime || "Sin anime";
    else key = fig.brandName || "Sin marca";

    if (!acc[key]) acc[key] = [];
    acc[key].push(fig);
    return acc;
  }, {});

  const placeholderText = "GeekVault";

  return (
    <div className="bg-gradient-to-b from-[#0b0f15] via-[#131922] to-[#0b0f15] text-gray-200 p-0 sm:px-8 pb-24 min-h-screen">
      {/* 🔎 NAV */}
      <div className="sticky top-0 z-30 bg-[#0b0f15] shadow-xl shadow-black/60 backdrop-blur-md">
        <SearchBar search={search} setSearch={setSearch} placeholderText={placeholderText} />
        <div className="w-full h-px bg-[#1a1f29] shadow-sm" />
      </div>

      {/* 🔹 FILTROS */}
      <div className="mt-5 flex justify-center flex-wrap">
        <FilterPills
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      {/* 🔥 CATEGORÍAS */}
      {Object.keys(grouped).map((categoryName) => {
        let items = grouped[categoryName];

        items = items.filter((fig) =>
          fig.name.toLowerCase().includes(search.toLowerCase())
        );

        if (items.length === 0) return null;

        return (
          <section key={categoryName} className="mb-10">
            <h2 className="text-2xl font-bold mb-4 ml-2 mt-3 text-[#d7e9ff]">
              {categoryName}
            </h2>

            <HorizontalScroller>
              {items.map((fig) => (
                <div key={fig.id} className="snap-center w-[256px] shrink-0 mr-3">
                  <FigureCard
                    figure={fig}
                    isFavorite={favorites.includes(fig.id)}
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

export default HomePage;
