
import api from './api';

const TOKEN_KEY = 'futurehire_token';
const USER_KEY = 'futurehire_user';

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    const data = response.data;

    const token = data.token || data.accessToken || data.jwt;
    const user = data.user || data.student || data;

    if (!token) {
      throw new Error('Login failed: the server did not return an authentication token.');
    }

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { user, token };
  },

  async register(details) {
    const response = await api.post('/auth/register', details);
    const data = response.data;

    const token = data.token || data.accessToken || data.jwt;
    const user = data.user || data.student || data;

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    return { user, token };
  },

  getCurrentUser() {
    try {
      const value = localStorage.getItem(USER_KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated() {
    return !!this.getToken() && !!this.getCurrentUser();
  }
};

export default authService;
