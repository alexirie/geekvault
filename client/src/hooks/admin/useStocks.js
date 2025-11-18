import { useEffect, useState } from "react";
import { getStocks } from "../../services/api"; // Asegúrate de tener esta función en tu API

export default function useStocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStocks()
      .then((data) => {
        setStocks(
          data.map((s) => ({
            ...s,
            figureName: s.figure?.name || "",
            storeName: s.store?.name || "",
            price: s.price ?? 0,
            available: s.available ?? false,
            productUrl: s.productUrl || "",
            lastChecked: s.lastChecked || null,
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching stocks:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { stocks, loading, setStocks };
}
