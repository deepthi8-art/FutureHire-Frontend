import axios from 'axios';

// Local development goes through Vite's /api proxy; deployments set VITE_API_BASE_URL.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
  import.meta.env.DEV
    ? '/api'
    : 'https://futurehire-backend.onrender.com/api'
);


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: import.meta.env.DEV ? 20000 : 60000,
});

// Request Interceptor: Attach JWT Bearer Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('futurehire_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // For FormData uploads (e.g. resumes), let axios/browser set multipart/form-data with boundary automatically
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      if (config.headers.common) delete config.headers.common['Content-Type'];
      if (config.headers.post) delete config.headers.post['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token on 401 unauthorized
      localStorage.removeItem('futurehire_token');
      localStorage.removeItem('futurehire_user');
      window.dispatchEvent(new Event('futurehire:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
