import { useEffect, useState } from "react";
import { getUsers } from "../../services/api"; // Asegúrate de tener esta función en tu API

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(
          data.map((u) => ({
            ...u,
            roles: u.roles || [],
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, setUsers };
}
