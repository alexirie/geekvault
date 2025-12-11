import { NavLink, Outlet, useLocation } from "react-router-dom";
import BottomNav from "../componentes/BottomNav";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function CollectionPage() {

    const location = useLocation();
    const isVitrinaIndex = location.pathname === "/coleccion";
    const { t } = useTranslation();


    useEffect(() => {
        window.scrollTo(0, 0); // va al top al montar el componente
    }, []);


    return (
        <div className="min-h-screen p-6 pb-[90px]  space-y-6 bg-[#0d1117] text-blue-100 ">

            {/* Tabs */}
            <div className="flex gap-6 border-b border-blue-500/20 pb-1">
                <NavLink
                    to="vitrina"
                    className={({ isActive }) => {
                        const active = isActive || isVitrinaIndex;

                        return `pb-2 text-lg transition-all duration-300 relative
                        ${active ? "text-blue-400 font-semibold" : "text-gray-400 hover:text-blue-300"}`;
                    }}
                >
                    {({ isActive }) => {
                        const active = isActive || isVitrinaIndex;

                        return (
                            <span className="relative">
                                {t("tabs.tu_coleccion")}
                                {active && (
                                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                                )}
                            </span>
                        );
                    }}
                </NavLink>

                <NavLink
                    to="estadisticas"
                    className={({ isActive }) =>
                        `${isActive
                            ? "text-blue-400 font-semibold"
                            : "text-gray-400 hover:text-blue-300"
                        } pb-2 text-lg transition-all duration-300 relative`
                    }
                >
                    {({ isActive }) => (
                        <span className="relative">
                            {t("tabs.estadisticas")}
                            {isActive && (
                                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                            )}
                        </span>
                    )}
                </NavLink>

                <NavLink
                    to="sets"
                    className={({ isActive }) =>
                        `${isActive
                            ? "text-blue-400 font-semibold"
                            : "text-gray-400 hover:text-blue-300"
                        } pb-2 text-lg transition-all duration-300 relative`
                    }
                >
                    {({ isActive }) => (
                        <span className="relative">
                            {t("tabs.sets")}
                            {isActive && (
                                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                            )}
                        </span>
                    )}
                </NavLink>
            </div>

            {/* Contenido dinamico */}
            <Outlet />
            <BottomNav />
        </div>
    );
}






// ---------- SETS ----------
export function Sets() {
    return (
        <div className="space-y-4 animate-fadeDown">
            <h2 className="text-2xl font-bold text-blue-300 tracking-wide">
                Sets coleccionables
            </h2>

            <p className="text-gray-400 italic">Muy pronto...</p>
        </div>
    );
}



