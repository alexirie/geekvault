import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, Mail, User, Shield, Globe, Bell, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constantes";
import { updateUser } from "../services/api";
import BottomNav from "../componentes/BottomNav";

export default function ProfilePage() {
  const { user, logout, setUser, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUploadProfilePic = async (file) => {
    try {
      // 1. Subir archivo
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BASE_URL}/figures/upload`, {
        method: "POST",
        body: formData,
      });

      const imageUrl = await res.text();

      console.log("Frontend user.id:", user.id);
      console.log("Token:", token);

      // 2. Guardar URL en el usuario
      const updatedUser = await updateUser(
        user.id,
        { urlImagen: imageUrl },
        token 
      );

      // 3. Actualizar estado global/local
      setUser(updatedUser);
      console.log("Updated user:", updatedUser);

    } catch (err) {
      console.error("Error subiendo imagen", err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* === HEADER VOLVER === */}
      <div className="sticky top-0 z-30 bg-gray-100 flex items-center p-4 shadow-sm">
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 font-bold mr-4"
        >
          ← Volver
        </button>
      </div>

      {/* Banner perfil */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-b-3xl relative">
        {/* Avatar */}
        <div className="absolute inset-0 flex flex-col items-center mt-10">
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="profileUpload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleUploadProfilePic(file);
            }}
          />

          {/* Avatar clickable */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <button
              onClick={() => document.getElementById("profileUpload").click()}
              className="relative"
            >
              <img
                src={user?.urlImagen || "/logo-dibujo.jpg"}
                alt="avatar"
                className="w-28 h-28 rounded-full border-4 shadow-lg object-cover"
              />

            </button>
          </motion.div>

          {/* User name */}
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {user?.username || "Usuario"}
          </h2>
          <p className="text-gray-600 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="px-5 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: "Favoritos", value: user?.stats?.favorites || 0 },
            { label: "Colección", value: user?.stats?.collection || 0 },
            { label: "Compras", value: user?.stats?.purchases || 0 },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white shadow-md rounded-2xl py-4 flex flex-col items-center"
            >
              <span className="text-2xl font-bold text-gray-800">{item.value}</span>
              <span className="text-gray-500 text-sm">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Opciones */}
        <div className="mt-8 bg-white rounded-2xl shadow-md divide-y">
          {[
            { label: "Datos personales", icon: Mail },
            { label: "Cambiar contraseña", icon: Lock },
            { label: "Idioma", icon: Globe },
            { label: "Notificaciones", icon: Bell },
            { label: "Privacidad", icon: Shield },
          ].map((opt) => (
            <button
              key={opt.label}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <opt.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">{opt.label}</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-8">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-lg font-semibold"
          >
            <LogOut className="w-5 h-5" /> Cerrar sesión
          </button>
        </div>
      </div>
      <BottomNav></BottomNav>
    </div>
  );
}
