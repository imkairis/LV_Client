import axios from "axios";
import { KEYS } from "../constants/keys";

const BASE_URL = import.meta.env.VITE_HOST ?? "localhost:5000/v1";

export const instanceAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60, // 1s
});

instanceAxios.interceptors.request.use(config => {
    const token = localStorage.getItem(KEYS.TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instanceAxios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        // Redirect to login when token expired
        if (error?.status === 401) {
            const currentPath = window.location.pathname;
            window.location.href = `/signin?redirect=${currentPath}`;
            return;
        }

        return error;
    }
);
