import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import UploadSection from "../components/UploadSection";
import RecipeCard from "../components/RecipeCard";

const UploadPage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleClearRecipes = () => {
    setRecipes([]);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-semibold text-lg transition-colors group"
        >
          <FiArrowLeft className="text-2xl group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </motion.button>

        {/* Tips and How It Works Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Tips for Best Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-green-100 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Tips for Best Results
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-green-600 dark:text-green-400 text-xl flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Clear, Close-Up Photos:</strong> Focus directly on the ingredients.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-green-600 dark:text-green-400 text-xl flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Minimal Background Clutter:</strong> A plain background helps our AI detect items accurately.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-green-600 dark:text-green-400 text-xl flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>Good Lighting:</strong> Natural, even lighting works best. Avoid harsh shadows.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-green-600 dark:text-green-400 text-xl flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  <strong>The Ingredients Group per Photo:</strong> For complex meals, focus on key components.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-green-200 dark:border-gray-600"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              How It Works
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use advanced AI to identify ingredients in your photo. Then, our AI chef crafts some unique recipes, 
              complete with steps, estimated times, and a full ingredient list, delivered as structured JSON.
            </p>
          </motion.div>
        </div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <UploadSection onResult={(r) => setRecipes(r)} onClear={handleClearRecipes} />
        </motion.div>

        {/* Recipes Section */}
        {recipes.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              Your AI-Crafted Recipes
            </h2>
            <div className="space-y-10">
              {recipes.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <RecipeCard recipe={r} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
