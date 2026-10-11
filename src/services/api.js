
import axios from 'axios';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  'https://futurehire-backend.onrender.com/api'
).replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('futurehire_token');

    if (token && !token.startsWith('mock-jwt-token-')) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !String(error.config?.url || '').includes('/auth/')
    ) {
      localStorage.removeItem('futurehire_token');
      localStorage.removeItem('futurehire_user');
    }

    return Promise.reject(error);
  }
);

export default api;
