import { Home, Heart, Bell, User, Boxes } from "lucide-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function BottomNav() {
  const [active, setActive] = useState("inicio");
  const navigate = useNavigate();
  const { isLogged } = useContext(AuthContext);

  const tabs = [
    { id: "inicio", label: "Inicio", icon: Home, route: "/" },
    { id: "favoritos", label: "Favoritos", icon: Heart, route: "/favoritos" },
    { id: "coleccion", label: "Colección", icon: Boxes, route: "/coleccion" },
    { id: "notificaciones", label: "Notificaciones", icon: Bell, route: "/notificaciones" },
    { id: "perfil", label: "Perfil", icon: User, route: "/perfil" },
  ];

  const handleNavigation = (tab) => {
    // Si NO está logueado y la pestaña no es Inicio → login
    if (tab.id !== "inicio" && !isLogged) {
      navigate("/login");
      return;
    }

    // Guardamos la pestaña activa
    setActive(tab.id);

    // Navegamos a su ruta correspondiente
    navigate(tab.route);
  };

  return (
    <nav className="bottom-nav md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md h-20 flex justify-around items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => handleNavigation(tab)}
            className={`flex flex-col items-center gap-1 text-sm transition-colors ${
              active === tab.id ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
