
import axios from "axios";

const baseURL = typeof window === "undefined" 
  ? process.env.NEXT_PUBLIC_API_URL_SSR 
  : process.env.NEXT_PUBLIC_API_URL_CSR;

export const apiAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const apiAxiosForm = axios.create({
  baseURL: baseURL,
  withCredentials: true
});