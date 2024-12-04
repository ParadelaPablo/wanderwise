import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/trips`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
