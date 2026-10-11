```javascript
import api from './api';

function getErrorMessage(error, fallback) {
  if (error.code === 'ECONNABORTED') {
    return 'The server took too long to respond. Please try again.';
  }

  if (!error.response) {
    return 'Cannot reach the server. Please check your connection.';
  }

  return (
    error.response.data?.message ||
    error.response.data?.error ||
    fallback
  );
}

function normalizeAuthResponse(response) {
  const data = response.data?.data || response.data;
  const token = data?.token || data?.accessToken || data?.jwt;

  if (!token) {
    throw new Error(
      'The server did not return an authentication token. Check the login API response.'
    );
  }

  const rawUser = data.user || data.student || data;

  const user = {
    ...rawUser,
    id: rawUser.id ?? data.userId,
    name: rawUser.name ?? data.name,
    email: rawUser.email ?? data.email,
    role: String(rawUser.role ?? data.role ?? 'student').toLowerCase()
  };

  localStorage.setItem('futurehire_token', token);
  localStorage.setItem('futurehire_user', JSON.stringify(user));

  return { token, user };
}

export const authService = {
  async login(credentials) {
    console.log('AUTH SERVICE: login started');

    try {
      console.log('AUTH SERVICE: sending POST request');

      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });

      console.log(
        'AUTH SERVICE: response received',
        response.status
      );

      return normalizeAuthResponse(response);
    } catch (error) {
      console.error('AUTH SERVICE: login failed', error);

      throw new Error(
        getErrorMessage(error, 'Login failed. Check your credentials.')
      );
    }
  },

  async register(studentData) {
    try {
      const response = await api.post('/auth/register', studentData);
      return normalizeAuthResponse(response);
    } catch (error) {
      throw new Error(
        getErrorMessage(error, 'Registration failed. Please check your details.')
      );
    }
  },

  logout() {
    localStorage.removeItem('futurehire_token');
    localStorage.removeItem('futurehire_user');
  },

  getCurrentUser() {
    try {
      const value = localStorage.getItem('futurehire_user');
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('futurehire_token');
  },

  isAuthenticated() {
    return Boolean(this.getToken() && this.getCurrentUser());
  }
};

export default authService;
```
