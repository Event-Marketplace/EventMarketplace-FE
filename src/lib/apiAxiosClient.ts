
import axios from "axios";

export const apiAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiAxiosClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiAxiosClient.interceptors.response.use((response) => 
    response.data, (error) => {
      console.error("API error:", error.response?.status, error.message);
      return Promise.reject(error);
    }
  );