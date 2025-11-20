import { useEffect, useState } from "react";
import { getUsersFavorites } from "../services/api"; // Asegúrate de tener esta función en tu API

export default function useUsers() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    getUsersFavorites()
      .then((data) => {
        // Agrupamos por usuario
        const grouped = data.reduce((acc, fav) => {
          const userId = fav.userId;
          if (!acc[userId]) {
            acc[userId] = {
              userId: userId,
              userName: fav.userName || "", // si el DTO trae nombre
              email: fav.userEmail || "",   // si el DTO trae email
              favorites: [],
            };
          }
          acc[userId].favorites.push({
            figureId: fav.figureId,
            figureName: fav.figureName,
            figureBrandName: fav.figureBrandName,
            figureImageUrl: fav.figureImageUrl,
            figureCollection: fav.figureCollection,
            figureAnime: fav.figureAnime,
            figurePrice: fav.figurePrice,
            figureInStock: fav.figureInStock,
            figureYear: fav.figureYear,
            figureMaterial: fav.figureMaterial,
            figureDescription: fav.figureDescription,
            figureLastUpdate: fav.figureLastUpdate,
          });
          return acc;
        }, {});

        // Convertimos el objeto a array para mapear más fácil en JSX
        setFavorites(Object.values(grouped));
      })
      .catch((err) => {
        console.error("Error fetching users' favorites:", err);
      })
      .finally(() => setLoading(false));
  }, []);

    return { favorites, loading, setFavorites };
}
