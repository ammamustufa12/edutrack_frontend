// lib/api/axiosInstance.ts
"use client";

import axios from "axios";

// ✅ API base URL fallback if .env missing
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://edu-track-4h4z.onrender.com";
const DBURL = "/api/v1";

// ✅ Combined full base URL
const axiosInstance = axios.create({
  baseURL: `${API_BASE}${DBURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Global response error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
