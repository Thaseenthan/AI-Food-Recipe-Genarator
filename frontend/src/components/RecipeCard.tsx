import React from "react";
import { saveFavorite } from "../api";

type Recipe = {
  name: string;
  ingredients: string[];
  steps: string | string[];
  time?: string | number;
};

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const handleSave = async () => {
    try {
      await saveFavorite(recipe);
      alert("Saved to favorites ❤️");
    } catch (err) {
      alert("Failed to save favorite");
    }
  };

  const handleCopy = async () => {
    try {
      const text = `${recipe.name}\n\nIngredients:\n${recipe.ingredients.join("\n")}\n\nSteps:\n${Array.isArray(recipe.steps) ? recipe.steps.join("\n") : recipe.steps}`;
      await navigator.clipboard.writeText(text);
      alert("Copied recipe to clipboard");
    } catch (e) {
      alert("Clipboard not available");
    }
  };

  const timeLabel = recipe.time ? `⏱ ${recipe.time} min` : "";

  return (
    <article className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold">{recipe.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{timeLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} title="Copy" className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">Copy</button>
          <button onClick={handleSave} title="Save" className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm">Save</button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium">Ingredients</h4>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Steps</h4>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {Array.isArray(recipe.steps) ? (
              <ol className="list-decimal list-inside">
                {recipe.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            ) : (
              <p>{recipe.steps}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
