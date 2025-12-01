// src/componentes/homePage/FilterPills.jsx (versión dark estilo Steam)
const Pill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-2 rounded-full border text-base font-medium transition-all
      ${active
        ? "bg-[#1b2838] text-[#66c0f4] border-[#66c0f4] shadow-[0_0_10px_rgba(102,192,244,0.6)]"
        : "bg-[#0b0f15]/60 text-[#c7d5e0] border-[#2a3b52] hover:bg-[#1b2838] hover:text-[#66c0f4]"
      }
    `}
  >
    {label}
  </button>
);

export default function FilterPills({ activeFilter, setActiveFilter }) {
  const toggleFilter = (value) => {
    setActiveFilter(activeFilter === value ? null : value);
  };

  return (
    <div className="flex gap-3 px-4 pb-3">
      <Pill
        label="Marca"
        active={activeFilter === "brand"}
        onClick={() => toggleFilter("brand")}
      />

      <Pill
        label="Colección"
        active={activeFilter === "collection"}
        onClick={() => toggleFilter("collection")}
      />

      <Pill
        label="Anime"
        active={activeFilter === "anime"}
        onClick={() => toggleFilter("anime")}
      />
    </div>
  );
}