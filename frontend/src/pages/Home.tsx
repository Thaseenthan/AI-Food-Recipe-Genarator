import React, { useState } from "react";
import UploadSection from "../components/UploadSection";
import RecipeCard from "../components/RecipeCard";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Create delicious recipes from a photo</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Upload a photo of ingredients or a dish and let the AI suggest recipe ideas, steps and times.</p>
        </div>
      </header>

      <UploadSection onResult={(r) => setRecipes(r)} />

      <section>
        <h2 className="text-xl font-semibold">Results</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.length === 0 ? (
            <div className="col-span-full p-8 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-500">No recipes yet — upload a photo to get started.</p>
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
