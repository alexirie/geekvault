import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, Mail, User, Shield, Globe, Bell, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constantes";
import { updateUser } from "../services/api";
import BottomNav from "../componentes/BottomNav";
import { useTranslation } from 'react-i18next';
import ButtonNavBack from "../componentes/ButtonNavBack";

export default function ProfilePage() {
  const { user, logout, setUser, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
  <div className="min-h-screen bg-[#0b0f15] pb-24 text-[#c7d5e0]">

    {/* === HEADER VOLVER === */}
    <ButtonNavBack />

    {/* Banner perfil */}
    <div className="h-40 bg-gradient-to-r from-[#66c0f4] to-[#1b2838] rounded-b-3xl relative">
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
              className="w-28 h-28 rounded-full border-4 border-[#66c0f4] shadow-[0_0_15px_rgba(102,192,244,0.5)] object-cover"
            />
          </button>
        </motion.div>

        {/* User name */}
        <h2 className="mt-4 text-xl font-semibold text-[#66c0f4]">
          {user?.username || "Usuario"}
        </h2>
        <p className="text-[#c7d5e0] text-sm">{user?.email}</p>
      </div>
    </div>

    {/* Estadísticas */}
    <div className="px-5 mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        {[
          { label: t("perfil.favoritos"), value: user?.stats?.favorites || 0 },
          { label: t("perfil.coleccion"), value: user?.stats?.collection || 0 },
  
        ].map((item) => (
          <div
            key={item.label}
            className="bg-[#1b2838] shadow-[0_0_10px_rgba(102,192,244,0.3)] rounded-2xl py-4 flex flex-col items-center"
          >
            <span className="text-2xl font-bold text-[#66c0f4]">{item.value}</span>
            <span className="text-[#c7d5e0] text-sm">{item.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Opciones */}
      <div className="mt-8 bg-[#1b2838] rounded-2xl shadow-[0_0_10px_rgba(102,192,244,0.3)] divide-y divide-[#2a3b52]">
        {[
          { label: t("perfil.datos_personales"), icon: Mail },
          { label: t("perfil.cambiar_pass"), icon: Lock },
          { label: t("perfil.idioma"), icon: Globe },
          { label: t("perfil.notificaciones"), icon: Bell },
          { label: t("perfil.privacidad"), icon: Shield },
        ].map((opt) => (
          <button
            key={opt.label}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#2a3b52] transition-colors"
          >
            <div className="flex items-center gap-3">
              <opt.icon className="w-5 h-5 text-[#66c0f4]" />
              <span className="text-[#c7d5e0]">{opt.label}</span>
            </div>
            <span className="text-[#66c0f4]">›</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-8">
        <button
          onClick={logout}
          className="w-full bg-red-600 text-white py-4 rounded-2xl shadow-[0_0_15px_rgba(255,0,0,0.5)] flex items-center justify-center gap-2 text-lg font-semibold hover:bg-red-700 transition"
        >
          <LogOut className="w-5 h-5" /> {t("perfil.log_out")}
        </button>
      </div>
    </div>
    <BottomNav />
  </div>
);
}
