
import { clearAccessToken, setAccessToken } from "@/redux/auth/authSlice";
import { store } from "@/redux/store";
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

apiAxios.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiAxios.interceptors.response.use(
  (response) => {
    if(response.data?.tokenJwt){
      store.dispatch(setAccessToken(response.data.tokenJwt));
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Jeżeli token wygasł i nie próbowaliśmy jeszcze
    if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
        const res = await apiAxios.post(
            `User/auth-refresh`,
            {},
            { withCredentials: true }
          );

        const newToken = res.data.tokenJwt;

        store.dispatch(setAccessToken(newToken));

        originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
  
        return apiAxios(originalRequest);

    } catch (e) {
        store.dispatch(clearAccessToken());
        window.location.href = "/login";
    }
    }

    return Promise.reject(error);
    }
);

apiAxiosForm.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiAxiosForm.interceptors.response.use(
  (response) => {
    if(response.data?.tokenJwt){
      store.dispatch(setAccessToken(response.data.tokenJwt));
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Jeżeli token wygasł i nie próbowaliśmy jeszcze
    if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
        const res = await apiAxiosForm.post(
            `User/auth-refresh`,
            {},
            { withCredentials: true }
          );

        const newToken = res.data.tokenJwt;

        store.dispatch(setAccessToken(newToken));

        originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
  
        return apiAxiosForm(originalRequest);

    } catch (e) {
        store.dispatch(clearAccessToken());
        window.location.href = "/login";
    }
    }

    return Promise.reject(error);
    }
);
