import axios from "axios";
import type { AxiosRequestConfig, AxiosProgressEvent } from "axios";

// Use environment variable for API URL, fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const uploadImage = async (
  file: File,
  onProgress?: (percent: number) => void
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const config: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const loaded = progressEvent.loaded ?? 0;
        const total = progressEvent.total ?? 0;
        if (total === 0) return;
        const percent = Math.round((loaded * 100) / total);
        onProgress && onProgress(percent);
      },
      timeout: 120000,
    };

    const res = await axios.post(`${BASE_URL}/upload`, formData, config);
    return res.data;
  } catch (err: any) {
    console.error("uploadImage error", err?.response?.data || err.message || err);
    throw err;
  }
};

export const saveFavorite = async (recipe: any) => {
  try {
    await axios.post(`${BASE_URL}/save_favorite`, recipe, { timeout: 10000 });
  } catch (err: any) {
    console.error("saveFavorite error", err?.response?.data || err.message || err);
    throw err;
  }
};

export const getFavorites = async () => {
  const res = await axios.get(`${BASE_URL}/get_favorites`);
  return res.data.favorites;
};

export const removeFavorite = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/delete_favorite/${id}`);
  } catch (err: any) {
    console.error("removeFavorite error", err?.response?.data || err.message || err);
    throw err;
  }
};
