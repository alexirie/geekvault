import { useEffect, useState } from "react";
import { getFigures } from "../../services/api";

export default function useFigures() {
  const [figures, setFigures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFigures()
      .then((data) => {
        setFigures(
          data.map((f) => ({
            ...f,
            brandName: f.brandName,
            collection: f.collection,
            stockPrice: f.price,
            inStock: f.inStock,
            imageUrl: f.imageUrl || null,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return { figures, loading };
}
