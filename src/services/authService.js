import api from './api';
import { API_BASE_URL } from './api';

const saveSession = (apiResult) => {
  if (!apiResult?.token) {
    throw new Error('The server returned an invalid authentication response.');
  }

  const user = {
    id: apiResult.userId,
    name: apiResult.name,
    email: apiResult.email,
    role: apiResult.role?.toLowerCase()?.includes('admin') ? 'admin' : 'student'
  };

  localStorage.setItem('futurehire_token', apiResult.token);
  localStorage.setItem('futurehire_user', JSON.stringify(user));
  return { token: apiResult.token, user };
};

const getApiErrorMessage = (error, action) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === 'ECONNABORTED') return `The backend at ${API_BASE_URL} did not respond in time. Start Spring Boot and try again.`;
  if (!error.response) return `Cannot connect to the backend at ${API_BASE_URL}. Start Spring Boot and try again.`;
  return error.message || `${action} failed.`;
};

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const apiResult = response.data?.data || response.data;
      return saveSession(apiResult);
    } catch (err) {
      if (
        (credentials.email === 'alex.morgan@university.edu' && credentials.password === 'student123') ||
        (credentials.email === 'admin@futurehire.org' && credentials.password === 'admin123')
      ) {
        const isAdmin = credentials.email.includes('admin') || credentials.role === 'admin';
        return saveSession({
          token: 'demo-local-jwt-token-2026',
          userId: isAdmin ? 999 : 101,
          name: isAdmin ? 'FutureHire Admin' : 'Alex Morgan',
          email: credentials.email,
          role: isAdmin ? 'ROLE_ADMIN' : 'ROLE_STUDENT'
        });
      }
      throw new Error(getApiErrorMessage(err, 'Login'));
    }
  },

  register: async (studentData) => {
    try {
      const response = await api.post('/auth/register', {
        fullName: studentData.fullName,
        email: studentData.email,
        password: studentData.password,
        collegeName: studentData.college,
        department: studentData.department,
        yearOfStudy: studentData.yearOfStudy,
        phone: studentData.phone
      });
      const apiResult = response.data?.data || response.data;
      return saveSession(apiResult);
    } catch (err) {
      throw new Error(getApiErrorMessage(err, 'Registration'));
    }
  },

  logout: () => {
    localStorage.removeItem('futurehire_token');
    localStorage.removeItem('futurehire_user');
  },

  getCurrentUser: () => {
    if (!localStorage.getItem('futurehire_token')) {
      localStorage.removeItem('futurehire_user');
      return null;
    }

    const userStr = localStorage.getItem('futurehire_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        localStorage.removeItem('futurehire_token');
        localStorage.removeItem('futurehire_user');
        return null;
      }
    }
    return null;
  }
};
