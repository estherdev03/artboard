import axios from "axios";

const isProduction = import.meta.env.PROD;

// In production, hit the same origin (Vercel) under /api.
// Locally, talk to the Express server on port 5000.
export const API_BASE_URL = isProduction
  ? "/api"
  : "http://localhost:5000/api";

const token = typeof window !== "undefined" ? localStorage.getItem("artboard_token") : null;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});

export default api;
