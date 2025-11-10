
import axios from "axios";

export const apiAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const apiAxiosForm = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  withCredentials: true
});