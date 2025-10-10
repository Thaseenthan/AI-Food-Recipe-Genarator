import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark"); else root.classList.remove("dark");
  }, [dark]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-green-600 text-white rounded-md px-2 py-1 font-bold">AI</div>
          <div className="font-semibold">Recipe Studio</div>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-gray-700 dark:text-gray-200">Home</Link>
          <Link to="/favorites" className="text-sm text-gray-700 dark:text-gray-200">Favorites</Link>

          <button
            onClick={() => setDark((s) => !s)}
            aria-label="Toggle theme"
            className="ml-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
