import axios from "axios";

const VITE_BASE_DEV_URL = import.meta.env.VITE_BASE_DEV_URL;

const axiosInstance = axios.create({
  baseURL: VITE_BASE_DEV_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
