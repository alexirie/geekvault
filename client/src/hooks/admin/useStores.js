import { useEffect, useState } from "react";
import { getStores } from "../../services/api";

export default function useStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStores()
      .then((data) => {
        setStores(
          data.map((s) => ({
            ...s,
            name: s.name || "",
            url: s.url || "",
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching stores:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { stores, loading, setStores };
}
