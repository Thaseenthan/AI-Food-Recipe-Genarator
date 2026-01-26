import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiCpu, FiTrendingUp } from "react-icons/fi";
import { GiCookingPot, GiKnifeFork } from "react-icons/gi";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/upload");
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 dark:from-green-800 dark:via-green-900 dark:to-gray-900 text-white py-24 px-4 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 right-10 text-9xl opacity-10">
          🍳
        </div>
        <div className="absolute bottom-10 left-10 text-7xl opacity-10">
          🥗
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Icon */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full">
              <GiCookingPot className="text-7xl text-white" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
          >
            AI Food Recipe Generator
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-green-50 mb-8 max-w-3xl mx-auto"
          >
            Transform your ingredients into delicious recipes instantly with AI-powered technology
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={handleGetStarted}
            className="group bg-white text-green-700 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl hover:bg-green-50 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
          >
            Get Started
            <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </div>
      </section>

      {/* Smart Food Analysis Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <GiKnifeFork className="text-5xl text-green-600 dark:text-green-400" />
            <FiCpu className="text-5xl text-green-600 dark:text-green-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-400 mb-6">
            Smart Food Analysis
          </h2>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Upload any food image and our advanced AI will identify ingredients and generate 
            customized recipes with step-by-step instructions. Perfect for discovering new dishes 
            with what you have on hand!
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-white dark:from-gray-700 dark:to-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow border border-green-100 dark:border-gray-600"
            >
              <div className="bg-green-600 dark:bg-green-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FiUpload className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Easy Upload
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Simply drag and drop or click to upload your food photos from any device.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-white dark:from-gray-700 dark:to-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow border border-green-100 dark:border-gray-600"
            >
              <div className="bg-green-600 dark:bg-green-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FiCpu className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                AI Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Advanced machine learning identifies ingredients and generates custom recipes instantly.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-white dark:from-gray-700 dark:to-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow border border-green-100 dark:border-gray-600"
            >
              <div className="bg-green-600 dark:bg-green-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <FiTrendingUp className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Detailed Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                Get complete recipes with ingredients list, instructions, cooking time, and servings.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-green-800 dark:text-green-400 mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Upload Image
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Take a photo or upload an image of your ingredients
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-green-500 to-green-700 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                AI Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI detects ingredients and analyzes possibilities
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-green-600 to-green-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Get Recipes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive customized recipes with detailed instructions
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-400 mb-8">
            Ready to Create Amazing Recipes?
          </h2>
          <button
            onClick={handleGetStarted}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
