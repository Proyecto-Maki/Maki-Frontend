import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && error.response.data.detail === "Given token not valid for any token type") {
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error); // Asegúrate de rechazar el error
  }
);

export default api;
