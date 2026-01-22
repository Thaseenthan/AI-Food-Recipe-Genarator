import React, { useState, useEffect } from "react"; // Import useEffect
// import { saveFavorite, removeFavorite } from "../api"; // COMMENTED OUT: Supabase favorites feature
import { FiClock, FiList, FiMenu, FiChevronDown, FiChevronUp, FiHeart, FiCopy, FiTrash2, FiSave, FiStar, FiRefreshCcw, FiCheckCircle } from "react-icons/fi";

type Recipe = {
  id?: string; // Present if it's a saved favorite
  name: string;
  ingredients: string[];
  steps: string | string[];
  time?: string | number;
  imageUrl?: string;
};

interface Props {
  recipe: Recipe;
  onRemove?: (id: string) => void;
  // Optional prop to indicate if the recipe is already a favorite from a parent component (e.g., FavoritesPage)
  // This is crucial for initial state if the card is used outside of the FavoritesPage
  isInitiallyFavorited?: boolean;
}

const RecipeCard: React.FC<Props> = ({ recipe, onRemove, isInitiallyFavorited = false }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  // New state to track if the recipe has been saved in the current session
  const [hasBeenSaved, setHasBeenSaved] = useState(isInitiallyFavorited || !!recipe.id);

  // Use useEffect to update hasBeenSaved if the recipe.id changes (e.g., after a successful save)
  useEffect(() => {
    setHasBeenSaved(isInitiallyFavorited || !!recipe.id);
  }, [recipe.id, isInitiallyFavorited]);


  // COMMENTED OUT: Supabase favorites feature
  const handleSave = async () => {
    alert("Save feature is currently disabled. Enable Supabase to use this feature.");
    // if (hasBeenSaved || isSaving) return; // Prevent multiple saves or clicking while saving
    // setIsSaving(true);
    // try {
    //   await saveFavorite(recipe);
    //   setHasBeenSaved(true); // Mark as saved successfully
    //   alert("Recipe saved to your favorites!");
    // } catch (err) {
    //   console.error("Failed to save favorite:", err);
    //   alert("Failed to save recipe to favorites. Please try again.");
    // } finally {
    //   setIsSaving(false);
    // }
  };

  const handleRemove = async () => {
    alert("Remove feature is currently disabled. Enable Supabase to use this feature.");
    // if (!recipe.id || isRemoving) return; // Prevent multiple removes or clicking while removing
    // setIsRemoving(true);
    // try {
    //   await removeFavorite(recipe.id);
    //   setHasBeenSaved(false); // Mark as unsaved
    //   onRemove && onRemove(recipe.id); // Inform parent to update UI
    //   alert("Recipe removed from favorites!");
    // } catch (e) {
    //   console.error("Failed to remove favorite:", e);
    //   alert("Failed to remove recipe from favorites. Please try again.");
    // } finally {
    //   setIsRemoving(false);
    // }
  };

  const handleCopy = async () => {
    try {
      const formattedSteps = Array.isArray(recipe.steps)
        ? recipe.steps.map((s, idx) => `${idx + 1}. ${s}`).join("\n")
        : recipe.steps;

      const text = `${recipe.name}\n\nPreparation & Cook Time: ${recipe.time ?? 'N/A'}\n\nIngredients:\n${recipe.ingredients.join("\n")}\n\nInstructions:\n${formattedSteps}`;
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (e) {
      console.error("Clipboard not available or failed to copy:", e);
      alert("Failed to copy recipe to clipboard. Please try again.");
    }
  };

  const displayTime = typeof recipe.time === 'number' ? `${recipe.time} min` : (recipe.time || 'N/A');

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Recipe Image (Optional) */}
        {recipe.imageUrl && (
          <div className="flex-shrink-0 w-full sm:w-40 h-40 rounded-xl overflow-hidden shadow-md">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Recipe Title and Time */}
        <div className="flex-grow">
          <h3 className="text-3xl font-extrabold text-green-700 dark:text-green-400">
            {recipe.name}
          </h3>
          <p className="flex items-center text-gray-600 dark:text-gray-300 mt-2 text-md">
            <FiClock className="mr-2 text-lg" />
            <span>Preparation & Cook Time: <span className="font-semibold">{displayTime}</span></span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ml-auto">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Copy Recipe"
            className={`px-4 py-2 rounded-full font-medium shadow-sm transition-all duration-200 flex items-center gap-2 ${
              isCopied
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            disabled={isCopied}
          >
            {isCopied ? <FiCheckCircle /> : <FiCopy />} {isCopied ? "Copied!" : "Copy"}
          </button>

          {/* COMMENTED OUT: Save/Remove Buttons (Supabase favorites feature disabled) */}
          {/* {recipe.id || hasBeenSaved ? ( // If recipe has an id OR has been saved in this session, show Remove/Saved
            <button
              onClick={handleRemove}
              title="Remove from Favorites"
              className="px-4 py-2 bg-red-600 text-white rounded-full font-medium shadow-sm hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
              disabled={isRemoving || !recipe.id} // Disable remove if currently removing or no id (not truly saved)
            >
              {isRemoving ? <FiRefreshCcw className="animate-spin" /> : <FiTrash2 />} {isRemoving ? "Removing..." : "Remove"}
            </button>
          ) : ( // Otherwise, show Save
            <button
              onClick={handleSave}
              title="Save to Favorites"
              className="px-4 py-2 bg-green-600 text-white rounded-full font-medium shadow-sm hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
              disabled={isSaving || hasBeenSaved} // Disable save if currently saving or already saved
            >
              {isSaving ? <FiRefreshCcw className="animate-spin" /> : <FiSave />} {isSaving ? "Saving..." : "Save"}
            </button>
          )} */}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="ml-0 mt-4 sm:mt-0 sm:ml-4 p-3 rounded-full bg-green-100 dark:bg-gray-700 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-sm"
          aria-expanded={showDetails}
          aria-controls={`recipe-details-${recipe.name.replace(/\s/g, '-')}`}
        >
          {showDetails ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
        </button>
      </div>

      {/* Collapsible Details Section */}
      <div
        id={`recipe-details-${recipe.name.replace(/\s/g, '-')}`}
        className={`px-6 pb-6 pt-0 transition-all duration-500 ease-in-out ${
          showDetails ? "max-h-none opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <FiList className="mr-3 text-green-600 dark:text-green-300" /> Ingredients
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-base marker:text-green-500">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>

          <h4 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4 flex items-center">
            <FiMenu className="mr-3 text-green-600 dark:text-green-300" /> Instructions
          </h4>
          <div className="text-gray-700 dark:text-gray-300 text-base">
            {Array.isArray(recipe.steps) ? (
              <ol className="list-decimal list-inside space-y-3 marker:text-green-500 marker:font-semibold">
                {recipe.steps.map((step, i) => <li key={i} className="leading-relaxed">{step}</li>)}
              </ol>
            ) : (
              <p className="leading-relaxed">{recipe.steps}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;