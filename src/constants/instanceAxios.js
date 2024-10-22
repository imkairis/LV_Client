import { axios } from "axios";
import { KEYS } from "./keys";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const instanceAxios = axios.create({
    baseURL: API_URL,
    timeout: 1000,
});

instanceAxios.interceptors.request.use(function (config) {
    const token = localStorage.getItem(KEYS.TOKEN);
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});
