import React, { useState, useRef, useCallback } from "react";
import { uploadImage } from "../api";
import { FiUploadCloud, FiRefreshCcw, FiXCircle, FiCheckCircle, FiBookOpen } from "react-icons/fi"; // Importing icons

interface Props {
  onResult: (recipes: any[]) => void;
}

const UploadSection: React.FC<Props> = ({ onResult }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent default browser behavior
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) { // Ensure it's an image
      handleFile(f);
    } else {
      alert("Only image files are allowed.");
    }
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent default browser behavior
  }, []);

  const handleFile = (f: File) => {
    if (preview) URL.revokeObjectURL(preview); // Clean up previous preview URL
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setProgress(0); // Reset progress on new file selection
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type.startsWith("image/")) {
      handleFile(f);
    } else {
      if (f) alert("Only image files are allowed.");
      e.target.value = ""; // Clear the input if not an image
    }
  };

  const handleGenerate = async () => {
    if (!file) return alert("Please select or drop a food image to analyze.");
    setLoading(true);
    setProgress(0);
    try {
      const data = await uploadImage(file, (p) => setProgress(p));
      const recipes = data.recipes ?? (Array.isArray(data) ? data : []);
      onResult(recipes);
    } catch (err: any) {
      console.error(err);
      alert("Failed to generate recipes. Check the backend or your API key.");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview); // Revoke the object URL
    setPreview(null);
    setProgress(0);
    setLoading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto my-8">
      {/* Upload Area (2/3 width on medium screens and up) */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-gray-800 rounded-2xl md:w-2/3 transition-all duration-300 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-inner"
      >
        <div className="w-full text-center">
          <FiUploadCloud className="mx-auto text-6xl text-purple-500 dark:text-purple-400" />
          <h3 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
            Upload your Ingredients Photo
          </h3>
          <p className="text-md text-gray-600 dark:text-gray-400 mt-2">
            Drag & drop your image here, or click to browse.
            <br />
            We'll work our magic to find recipes!
          </p>
        </div>

        <input
          ref={inputRef}
          aria-label="Upload food image"
          onChange={handleSelect}
          type="file"
          accept="image/*"
          className="hidden" // Hide the default input
          id="file-upload"
        />
        {!preview && (
          <label
            htmlFor="file-upload"
            className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <FiUploadCloud className="text-xl" /> Browse File
          </label>
        )}

        {preview && (
          <div className="mt-8 w-full flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md">
            <img
              src={preview}
              alt="Uploaded food preview"
              className="max-h-60 h-auto w-auto object-contain rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
            />
            <div className="w-full mt-5">
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className={`h-full ${
                    progress === 100 ? "bg-green-500" : "bg-purple-500"
                  } transition-all duration-300 ease-out`}
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
                {progress === 100 ? (
                  <span className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400">
                    <FiCheckCircle /> Upload Completed!
                  </span>
                ) : (
                  `${progress}% Uploaded`
                )}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <FiRefreshCcw className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <FiBookOpen /> Generate Recipes
                  </>
                )}
              </button>
              <button
                onClick={clear}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 rounded-full shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <FiXCircle /> Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tips Section (1/3 width on medium screens and up) */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl md:w-1/3 flex flex-col justify-between">
        <div>
          <h4 className="font-extrabold text-2xl text-gray-800 dark:text-white mb-4">
            Tips for Best Results
          </h4>
          <ul className="mt-3 space-y-3 text-base text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>
                Clear, Close-Up Photos: Focus directly on the ingredients.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>
                Minimal Background Clutter:A plain background helps our AI detect items accurately.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>
                Good Lighting: Natural, even lighting works best. Avoid harsh shadows.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>
                The Ingredients Group per Photo: For complex meals, focus on key components.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-8 bg-purple-100 dark:bg-gray-700 p-5 rounded-xl shadow-inner border border-purple-200 dark:border-gray-600">
          <h5 className="font-bold text-lg text-gray-800 dark:text-white">How It Works</h5>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            We use advanced AI to identify ingredients in your photo. Then, our AI chef crafts
            some unique recipes, complete with steps, estimated times, and a full ingredient list,
            delivered as structured JSON.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;