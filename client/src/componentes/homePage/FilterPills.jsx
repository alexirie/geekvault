const Pill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-2 rounded-full border text-base font-medium transition-all
      ${
        active
          ? "bg-gray-800 text-white border-gray-800 shadow-md"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
      }
    `}
  >
    {label}
  </button>
);

export default function FilterPills({ activeFilter, setActiveFilter }) {
  const toggleFilter = (value) => {
    // ✅ si haces click en el activo → desactivar
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
