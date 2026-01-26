
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
// import FavoritesPage from "./pages/FavoritesPage"; // COMMENTED OUT: Supabase favorites feature
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />
        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
            {/* <Route path="/favorites" element={<FavoritesPage />} /> */} {/* COMMENTED OUT: Supabase favorites feature */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
