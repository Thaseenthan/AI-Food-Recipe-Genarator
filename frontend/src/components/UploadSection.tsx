import React, { useState, useRef, useCallback } from "react";
import { uploadImage } from "../api";

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
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }, []);

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleGenerate = async () => {
    if (!file) return alert("Please select or drop a food image to analyze.");
    setLoading(true);
    setProgress(0);
    try {
      const data = await uploadImage(file, (p) => setProgress(p));
      // normalize response
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
    setPreview(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 grid md:grid-cols-2 gap-6">
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4"
      >
        <div className="w-full text-center">
          <div className="text-3xl">📸</div>
          <h3 className="mt-2 text-lg font-semibold">Upload a food photo</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Drag & drop or click to choose a photo. We’ll detect ingredients and suggest recipes.</p>
        </div>

        <input
          ref={inputRef}
          aria-label="Upload food image"
          onChange={handleSelect}
          type="file"
          accept="image/*"
          className="mt-4"
        />

        {preview && (
          <div className="mt-4 w-full flex flex-col items-center">
            <img src={preview} alt="preview" className="max-h-40 rounded-md shadow-sm" />
            <div className="w-full mt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div style={{ width: `${progress}%` }} className="h-full bg-green-500 transition-all" />
              </div>
              <div className="text-xs text-gray-500 mt-1">{progress}% uploaded</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={handleGenerate} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-md">
                {loading ? "Processing..." : "Generate Recipes"}
              </button>
              <button onClick={clear} className="px-4 py-2 border rounded-md">Clear</button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h4 className="font-semibold">Tips for best results</h4>
        <ul className="mt-3 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
          <li>Use a close-up photo of the ingredients or dish.</li>
          <li>Avoid cluttered backgrounds for better detection.</li>
          <li>Try different angles if results are noisy — more photos can help.</li>
        </ul>

        <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
          <h5 className="font-medium">What we do</h5>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">We detect ingredients in the image, then ask an AI chef to suggest 2–3 recipes with steps, ingredients and time estimates. Results are returned as structured JSON and shown below.</p>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
