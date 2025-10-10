import React, { useState } from "react";
import UploadSection from "../components/UploadSection";
import RecipeCard from "../components/RecipeCard"; // We'll adapt this or create a new one

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12"> {/* Added container, padding, and more vertical space */}
      <header className="text-center mb-12"> {/* Centered header, increased bottom margin */}
        <h1 className="text-5xl font-extrabold text-purple-700 dark:text-purple-400 leading-tight"> {/* Larger, bolder, colorful heading */}
          Your Personal AI Recipe Creator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto"> {/* Better readable text, centered */}
          Snap a photo of your ingredients, and let our AI conjure up delicious, step-by-step recipes tailored just for you.
        </p>
      </header>

      <UploadSection onResult={(r) => setRecipes(r)} />

      <section className="mt-16"> {/* Increased top margin */}
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center"> {/* Larger, bolder, centered results heading */}
          {recipes.length > 0 ? "Your AI-Crafted Recipes" : "Get Started to Discover Recipes!"}
        </h2>
        <div className="space-y-10"> {/* Changed from grid to space-y for row-wise display */}
          {recipes.length === 0 ? (
            <div className="col-span-full p-12 bg-purple-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-purple-200 dark:border-gray-700 text-center text-xl font-medium text-gray-600 dark:text-gray-400 animate-fadeInUp shadow-inner"> {/* Enhanced empty state */}
              <p className="mb-4">It looks like you haven't generated any recipes yet.</p>
              <p>Upload a photo of your ingredients above, and prepare to be amazed!</p>
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