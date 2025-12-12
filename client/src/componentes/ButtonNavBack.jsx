import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ButtonNavBack() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
  
        <div className = "sticky top-0 z-30 bg-[#1b2838] flex items-center p-4" >
            <button
                onClick={() => navigate("/")}
                className="text-[#66c0f4] font-bold mr-4"
            >
                ← {t("buttons.volver")}
            </button>
        </div >
    
    )
}