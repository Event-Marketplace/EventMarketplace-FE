
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
