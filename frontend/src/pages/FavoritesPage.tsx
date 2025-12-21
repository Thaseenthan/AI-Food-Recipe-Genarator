import React, { useEffect, useState } from "react";
import { getFavorites } from "../api";
import RecipeCard from "../components/RecipeCard"; // The enhanced RecipeCard
import { FiHeart, FiFrown } from "react-icons/fi"; // Icons for heart and frown

const FavoritesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFavorites();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        setError("Failed to load your favorite recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemove = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 min-h-[calc(100vh-100px)]"> {/* Added container, padding, and min-height */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-green-500 dark:text-white leading-tight flex items-center justify-center gap-4">
          <FiHeart className="text-4xl" /> My Favorite Recipes
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Relive your culinary masterpieces! Here you'll find all the recipes you've saved.
        </p>
      </header>

      <section>
        {loading && (
          <div className="flex justify-center items-center p-12 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-inner animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-dashed rounded-full border-green-400 dark:border-green-300 animate-spin"></div>
              <p className="mt-4 text-xl font-medium text-gray-600 dark:text-gray-300">Loading your delicious favorites...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-12 bg-red-50 dark:bg-red-900 rounded-2xl border-2 border-dashed border-red-200 dark:border-red-700 text-center text-xl font-medium text-red-700 dark:text-red-300 animate-fadeInUp shadow-inner">
            <FiFrown className="mx-auto text-5xl mb-4" />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && recipes.length === 0 && (
          <div className="p-12 bg-green-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-green-200 dark:border-gray-700 text-center text-xl font-medium text-gray-600 dark:text-gray-400 animate-fadeInUp shadow-inner">
            <FiHeart className="mx-auto text-5xl text-green-500 dark:text-green-300 mb-4" />
            <p className="mb-4">It looks like you haven't saved any favorite recipes yet.</p>
            <p>Go to the Home page, generate some amazing recipes, and click "Save" to add them here!</p>
          </div>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className="space-y-10"> {/* Changed from grid to space-y for row-wise display */}
            {recipes.map((r) => (
              <RecipeCard key={r._id} recipe={r} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FavoritesPage;