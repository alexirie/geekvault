// src/componentes/SearchBar.jsx (versión dark estilo Steam)
import { MagnifyingGlass } from "phosphor-react";
import { useTranslation } from 'react-i18next';


const SearchBar = ({ search, setSearch, placeholderText }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex justify-center mb-3 px-4 sm:px-8">
      <div className="relative w-full max-w-sm">
        <MagnifyingGlass
          size={22}
          weight="bold"
          className="absolute left-3 top-1/2 -translate-y-1/2 mt-1.5 text-[#66c0f4]"
        />
        <input
          type="text"
          placeholder={t("buttons.buscar_en") + ' ' + placeholderText}
          className="w-full p-3 pl-10 rounded-xl shadow-[0_0_15px_rgba(102,192,244,0.5)] border border-[#2a3b52] bg-[#0b0f15]/60 text-[#c7d5e0] focus:ring-2 focus:ring-[#66c0f4] outline-none mt-3 placeholder-[#66c0f4]/60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
export default SearchBar;
