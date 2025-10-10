import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi"; // Importing icons from react-icons

const Navbar: React.FC = () => {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-gray-900 dark:to-gray-800 shadow-lg relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-white text-purple-600 rounded-full w-10 h-10 flex items-center justify-center font-extrabold text-lg shadow-md transition-all duration-300 group-hover:bg-purple-100 group-hover:text-indigo-700">
            AI
          </div>
          <div className="font-extrabold text-2xl text-white tracking-wide transition-colors duration-300 group-hover:text-purple-100">
            Recipe Studio
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-lg font-medium text-white hover:text-purple-200 transition-colors duration-300 relative group"
          >
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            to="/favorites"
            className="text-lg font-medium text-white hover:text-purple-200 transition-colors duration-300 relative group"
          >
            Favorites
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>

          <button
            onClick={() => setDark((s) => !s)}
            aria-label="Toggle theme"
            className="ml-4 p-2.5 rounded-full bg-white dark:bg-gray-700 text-purple-700 dark:text-yellow-400 shadow-md hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            {dark ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;