import React, { useState } from "react";
import { Link } from "react-router-dom";
import UploadSection from "../components/UploadSection";
import RecipeCard from "../components/RecipeCard";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleClearRecipes = () => {
    setRecipes([]);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 ">
      {/* --- Header Section --- */}
      <header className="relative text-center mb-12">
        {/* Favourites link at top-right */}
        
        {/* <div className="absolute top-0 right-0 z-0 mt-0 mr-4">
          <Link
            to="/favorites"
            className="relative inline-flex items-center justify-center text-lg font-semibold text-white bg-gray-200 hover:bg-gray-300 px-3 py-3 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-white"
          >
            <span className="mr-2 text-2xl animate-pulse">
              ❤️
            </span>
            
          </Link>
        </div> */}
        <div className="pt-10">
          <h1 className="text-5xl font-extrabold text-green-700 dark:text-green-400 leading-tight p-8">
            Your Personal AI Recipe Creator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Snap a photo of your ingredients, and let our AI conjure up delicious,
            step-by-step recipes tailored just for you.
          </p>
        </div>

       
      </header>

      {/* --- Upload Section --- */}
      <UploadSection onResult={(r) => setRecipes(r)} onClear={handleClearRecipes} />

      {/* --- Recipes Section --- */}
      <section className="mt-16">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          {recipes.length > 0
            ? "Your AI-Crafted Recipes"
            : "Get Started to Discover Recipes!"}
        </h2>

        <div className="space-y-10">
          {recipes.length === 0 ? (
            <div className="col-span-full p-12 bg-green-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-green-200 dark:border-gray-700 text-center text-xl font-medium text-gray-600 dark:text-gray-400 animate-fadeInUp shadow-inner">
              <p className="mb-4">
                It looks like you haven't generated any recipes yet.
              </p>
              <p>
                Upload a photo of your ingredients above, and prepare to be
                amazed!
              </p>
            </div>
          ) : (
            recipes.map((r, i) => <RecipeCard key={i} recipe={r} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
