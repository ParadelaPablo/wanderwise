import axios from "axios";
const BASE_DEV_URL = import.meta.env.BASE_DEV_URL;

const axiosInstance = axios.create({
  baseURL: BASE_DEV_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
