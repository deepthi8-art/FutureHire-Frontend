import api from './api';

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

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const apiResult = response.data?.data || response.data;
      return saveSession(apiResult);
    } catch (err) {
      throw new Error(getErrorMessage(err, 'Login failed. Please try again.'));
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
      throw new Error(getErrorMessage(err, 'Registration failed. Please try again.'));
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
