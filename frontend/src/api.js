import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const baseURL = window.location.hostname === '127.0.0.1:3000' || window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:8000/' // Backend local
  : import.meta.env.VITE_API_URL || 'https://maki-backend-production.up.railway.app/'; // Backend en producción


  const api = axios.create({
    baseURL,
  });

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;