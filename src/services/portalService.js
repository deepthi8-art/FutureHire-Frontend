import api from './api';

export const portalService = {
  // --- Student Coding ---
  getCodingProblems: async (difficulty = '') => {
    try {
      const response = await api.get(`/student/coding/problems${difficulty ? `?difficulty=${difficulty}` : ''}`);
      return response.data?.data;
    } catch (e) {
      console.warn("Backend API endpoint fallback to local data", e.message);
      return null;
    }
  },

  submitCodingSolution: async (problemId, sourceCode, language) => {
    try {
      const response = await api.post('/student/coding/submissions', { problemId, sourceCode, language });
      return response.data?.data;
    } catch (e) {
      console.warn("Backend submission fallback", e.message);
      return null;
    }
  },

  // --- Student Aptitude ---
  getAptitudeQuizzes: async () => {
    try {
      const response = await api.get('/student/aptitude/quizzes');
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  getQuizQuestions: async (quizId) => {
    try {
      const response = await api.get(`/student/aptitude/quizzes/${quizId}/questions`);
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  submitQuiz: async (quizId, answersMap) => {
    try {
      const response = await api.post(`/student/aptitude/quizzes/${quizId}/submit`, answersMap);
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  // --- Student Companies ---
  getCompanies: async (search = '') => {
    try {
      const url = search ? `/student/companies/search?name=${encodeURIComponent(search)}` : '/student/companies';
      const response = await api.get(url);
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  // --- Resume ---
  uploadResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/student/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  getResumeDetails: async () => {
    try {
      const response = await api.get('/student/resumes');
      return response.data?.data;
    } catch (e) {
      // 404 means no resume uploaded yet — not an error
      if (e?.response?.status === 404) return null;
      console.warn('Resume fetch failed', e.message);
      return null;
    }
  },

  // --- Interview Experiences ---
  getInterviewExperiences: async () => {
    try {
      const response = await api.get('/student/interviews/experiences');
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  shareExperience: async (expData) => {
    try {
      const response = await api.post('/student/interviews/experiences', expData);
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  // --- Mock Interviews ---
  getAvailableMockSlots: async () => {
    try {
      const response = await api.get('/student/mock-interviews/slots');
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  bookMockSlot: async (slotId) => {
    try {
      const response = await api.post(`/student/mock-interviews/book/${slotId}`);
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  // --- Study Resources ---
  getStudyResources: async () => {
    try {
      const response = await api.get('/student/resources');
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  // --- Notifications ---
  getNotifications: async () => {
    try {
      const response = await api.get('/student/notifications');
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  markNotificationRead: async (notifId) => {
    try {
      const response = await api.put(`/student/notifications/${notifId}/read`);
      return response.data?.data;
    } catch (e) {
      return null;
    }
  },

  // --- Admin APIs ---
  getAdminUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      const raw = response.data?.data;
      if (Array.isArray(raw)) {
        return raw.map(u => ({
          id: u.id ? (typeof u.id === 'number' ? `STD-${u.id}` : u.id) : `STD-${Math.floor(100 + Math.random() * 900)}`,
          rawId: u.id,
          name: u.fullName || u.name || 'Student User',
          email: u.email || '',
          department: u.department || 'CSE',
          year: u.year || u.yearOfStudy || '4th Year',
          cgpa: u.cgpa || '8.50',
          status: u.status || (u.enabled !== false ? 'Active' : 'Inactive'),
          role: typeof u.role === 'object' ? u.role.name : (u.role || 'ROLE_STUDENT')
        }));
      }
      return raw;
    } catch (e) {
      return null;
    }
  },

  deleteAdminUser: async (rawId) => {
    try {
      const response = await api.delete(`/admin/users/${rawId}`);
      return response.data?.success;
    } catch (e) {
      return false;
    }
  },

  getAdminOverviewReports: async () => {
    try {
      const response = await api.get('/admin/reports/overview');
      return response.data?.data;
    } catch (e) {
      return null;
    }
  }
};
