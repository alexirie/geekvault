// src/componentes/BottomNav.jsx (versión dark estilo Steam)
import { Home, Heart, Bell, User, Boxes } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from 'react-i18next';

export default function BottomNav() {
  const [active, setActive] = useState("inicio");
  const navigate = useNavigate();
  const { isLogged } = useContext(AuthContext);
  const location = useLocation();
  const { t } = useTranslation();

  const tabs = [
    { id: "inicio", label: t("menu_inferior.inicio"), icon: Home, route: "/" },
    { id: "favoritos", label: t("menu_inferior.favoritos"), icon: Heart, route: "/favoritos" },
    { id: "coleccion", label: t("menu_inferior.coleccion"), icon: Boxes, route: "/coleccion" },
    { id: "notificaciones", label: t("menu_inferior.notificaciones"), icon: Bell, route: "/notificaciones" },
    { id: "perfil", label: t("menu_inferior.perfil"), icon: User, route: "/perfil" },
  ];

  useEffect(() => {
    const tab = tabs.find(t => t.route === location.pathname);
    if (tab) setActive(tab.id);
  }, [location.pathname]);

  const handleNavigation = (tab) => {
    if (tab.id !== "inicio" && !isLogged) {
      navigate("/login");
      return;
    }
    setActive(tab.id);
    navigate(tab.route);
  };

  return (
    <nav className="bottom-nav md:hidden fixed bottom-0 left-0 right-0 bg-[#0b0f15]/90 backdrop-blur-lg border-t border-[#2a3b52] shadow-[0_0_10px_rgba(102,192,244,0.5)] h-20 flex justify-around items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => handleNavigation(tab)}
            className={`flex flex-col items-center gap-1 text-sm transition-all duration-200 ${active === tab.id ? "text-[#66c0f4] scale-110" : "text-[#c7d5e0] hover:text-[#66c0f4]"}`}
          >
            <Icon className="w-6 h-6" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}