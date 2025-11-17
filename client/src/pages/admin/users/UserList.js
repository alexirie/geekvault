import { useMemo } from "react";
import useUsers from "../../../hooks/admin/useUsers";
import Table from "../../../componentes/Table";
import { deleteUser } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const { users, loading, setUsers } = useUsers();
  const navigate = useNavigate();

 /* const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };*/

  const columns = useMemo(
    () => [
      { id: "id", header: "ID", accessorKey: "id" },
      { id: "username", header: "Usuario", accessorKey: "username" },
      { id: "email", header: "Email", accessorKey: "email" },
      { id: "enabled", header: "Activo", accessorKey: "enabled" },
      { id: "roles", header: "Roles", accessorFn: (row) => row.roles.join(", ") },
      {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate(`/admin/usuarios/${row.original.id}/editar`)}
            >
              Editar
            </button>
            <button
              className="text-red-500 hover:underline"
              onClick={() => alert(row.original.id)}
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-left mb-4">
        <button
          onClick={() => navigate("/admin/usuarios/nuevo")}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Crear Usuario
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <Table columns={columns} data={users} />
    </div>
  );
}
