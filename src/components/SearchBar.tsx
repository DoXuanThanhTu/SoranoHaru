import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-full bg-gray-800 px-3 py-2 text-sm text-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 shadow-2xl">
      <Search className="w-4 h-4 text-gray-400" />
      <input
        id="search"
        placeholder="Tìm phim..."
        type="text"
        className="bg-transparent outline-none w-full placeholder-gray-500 text-gray-100"
      />
    </div>
  );
};

export default SearchBar;
