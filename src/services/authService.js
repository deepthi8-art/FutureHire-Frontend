import api from './api';
import { initialStudentProfile, initialAdminProfile } from '../data/mockData';

export const authService = {
  // Login method supporting real API call with fallback mock behavior
  login: async (credentials) => {
    try {
      // Attempt real Spring Boot API call first
      const response = await api.post('/auth/login', credentials);
      const apiResult = response.data?.data || response.data;
      if (apiResult && apiResult.token) {
        const userObj = {
          id: apiResult.userId,
          name: apiResult.name,
          email: apiResult.email,
          role: apiResult.role?.toLowerCase()?.includes('admin') ? 'admin' : 'student'
        };
        localStorage.setItem('futurehire_token', apiResult.token);
        localStorage.setItem('futurehire_user', JSON.stringify(userObj));
        return { token: apiResult.token, user: userObj };
      }
    } catch (err) {
      console.warn("Backend API not reachable or failed. Using fallback mock authentication.", err?.message);
    }

    // Mock Authentication Logic
    const { email, password, role } = credentials;

    if (!email || !password) {
      throw new Error("Please fill in both email and password.");
    }

    let user;
    if (role === 'admin' || email.includes('admin')) {
      user = { ...initialAdminProfile, email };
    } else {
      user = { ...initialStudentProfile, email };
    }

    const mockToken = `mock-jwt-token-${Date.now()}`;
    localStorage.setItem('futurehire_token', mockToken);
    localStorage.setItem('futurehire_user', JSON.stringify(user));

    return { token: mockToken, user };
  },

  // Registration method for Students
  register: async (studentData) => {
    try {
      const response = await api.post('/auth/register', studentData);
      const apiResult = response.data?.data || response.data;
      if (apiResult && apiResult.token) {
        const userObj = {
          id: apiResult.userId,
          name: apiResult.name,
          email: apiResult.email,
          role: apiResult.role?.toLowerCase()?.includes('admin') ? 'admin' : 'student'
        };
        localStorage.setItem('futurehire_token', apiResult.token);
        localStorage.setItem('futurehire_user', JSON.stringify(userObj));
        return { token: apiResult.token, user: userObj };
      }
    } catch (err) {
      console.warn("Backend API not reachable or registration failed. Using fallback mock registration.", err?.message);
    }

    const newUser = {
      id: `STD-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: studentData.fullName,
      email: studentData.email,
      college: studentData.college,
      department: studentData.department,
      yearOfStudy: studentData.yearOfStudy,
      phone: studentData.phone,
      role: 'student',
      stats: { codingSolved: 0, totalCoding: 250, aptitudeScore: 0, mockInterviewsCompleted: 0, readinessScore: 10 }
    };

    const mockToken = `mock-jwt-token-${Date.now()}`;
    localStorage.setItem('futurehire_token', mockToken);
    localStorage.setItem('futurehire_user', JSON.stringify(newUser));

    return { token: mockToken, user: newUser };
  },

  logout: () => {
    localStorage.removeItem('futurehire_token');
    localStorage.removeItem('futurehire_user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('futurehire_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
};
