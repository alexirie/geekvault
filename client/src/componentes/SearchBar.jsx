import { MagnifyingGlass } from "phosphor-react";

const SearchBar = ({ search, setSearch }) => (
  <div className="w-full flex justify-center mb-3 px-4 sm:px-8">
    <div className="relative w-full max-w-sm"> {/* max-w-sm en vez de max-w-md */}
      <MagnifyingGlass
        size={22}
        weight="bold"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 mt-1.5"
      />
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full p-3 pl-10 rounded-xl shadow-md border focus:ring-2 focus:ring-gray-300 outline-none mt-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </div>
);


export default SearchBar;
