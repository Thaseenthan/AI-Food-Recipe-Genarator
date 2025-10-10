import React, { useEffect, useState } from "react";
import { getFavorites } from "../api";
import RecipeCard from "../components/RecipeCard";

const FavoritesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites();
      setRecipes(data);
    };
    fetchFavorites();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">❤️ My Favorite Recipes</h1>
      {recipes.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((r, i) => <RecipeCard key={i} recipe={r} />)}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
