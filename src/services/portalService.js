import api from './api';

const displayDifficulty = (difficulty) =>
  difficulty ? difficulty.charAt(0) + difficulty.slice(1).toLowerCase() : '';

const toMockSlot = (slot, status = slot.status) => ({
  ...slot,
  type: slot.interviewType,
  time: slot.timeWindow,
  status: status?.toLowerCase() === 'available' ? 'Available'
    : status?.toLowerCase() === 'booked' ? 'Booked'
      : status?.toLowerCase() === 'completed' ? 'Completed' : status
});

const toExperience = (experience) => ({
  ...experience,
  author: experience.student?.fullName || 'Student',
  college: experience.student?.studentProfile?.collegeName || '',
  company: experience.companyName,
  role: experience.roleTitle,
  date: experience.interviewDate
});

const toCompany = (company) => ({
  ...company,
  logo: company.logoUrl,
  ctc: company.ctcRange,
  eligibility: {
    minCgpa: company.minCgpa,
    tenthTwelveth: company.tenthTwelvethPct,
    allowedBranches: company.allowedBranches?.split(',').map(branch => branch.trim()) || [],
    maxBacklogs: company.maxBacklogs
  },
  skillsRequired: company.requiredSkills?.split(',').map(skill => skill.trim()) || [],
  selectionProcess: parseJsonArray(company.selectionRoundsJson),
  interviewQuestions: parseJsonArray(company.interviewQuestionsJson)
});

function parseJsonArray(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export const portalService = {
  // --- Student Coding ---
  getCodingProblems: async (difficulty = '') => {
    try {
      const response = await api.get(`/student/coding/problems${difficulty ? `?difficulty=${difficulty}` : ''}`);
      return response.data?.data?.map(problem => ({
        ...problem,
        difficulty: displayDifficulty(problem.difficulty),
        constraints: problem.constraintsText,
        solved: false,
        starterCode: {
          javascript: problem.starterCodeJs || '',
          java: problem.starterCodeJava || '',
          python: problem.starterCodePython || ''
        }
      }));
    } catch (e) {
      console.warn("Backend API endpoint fallback to local data", e.message);
      return null;
    }
  },

  submitCodingSolution: async (problemId, sourceCode, language) => {
    const response = await api.post('/student/coding/submissions', { problemId, sourceCode, language });
    return response.data?.data;
  },

  getCodingProgress: async () => {
    const response = await api.get('/student/coding/progress');
    return response.data?.data;
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
    const response = await api.get(`/student/aptitude/quizzes/${quizId}/questions`);
    return response.data?.data?.map(question => ({
      id: question.id,
      question: question.questionText,
      options: question.options
    }));
  },

  submitQuiz: async (quizId, answersMap) => {
    const response = await api.post(`/student/aptitude/quizzes/${quizId}/submit`, answersMap);
    return response.data?.data;
  },

  getQuizResults: async () => {
    const response = await api.get('/student/aptitude/results');
    return response.data?.data;
  },

  // --- Student Companies ---
  getCompanies: async (search = '') => {
    try {
      const url = search ? `/student/companies/search?name=${encodeURIComponent(search)}` : '/student/companies';
      const response = await api.get(url);
      return response.data?.data?.map(toCompany);
    } catch (e) {
      return null;
    }
  },

  // --- Resume ---
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/student/resumes/upload', formData);
    return toCompany(response.data?.data);
  },

  deleteResume: async () => {
    const response = await api.delete('/student/resumes');
    return response.data?.success;
  },

  downloadResume: async () => {
    const response = await api.get('/student/resumes/download', { responseType: 'blob' });
    return response.data;
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
      return response.data?.data?.map(toExperience);
    } catch (e) {
      return null;
    }
  },

  shareExperience: async (expData) => {
    const response = await api.post('/student/interviews/experiences', {
      companyName: expData.company,
      roleTitle: expData.role,
      verdict: expData.verdict,
      packageOffered: expData.packageOffered,
      interviewDate: expData.date,
      difficulty: expData.difficulty,
      content: expData.content,
      tips: expData.tips
    });
    return toExperience(response.data?.data);
  },

  // --- Mock Interviews ---
  getAvailableMockSlots: async () => {
    try {
      const response = await api.get('/student/mock-interviews/slots');
      return response.data?.data?.map(slot => toMockSlot(slot));
    } catch (e) {
      return null;
    }
  },

  bookMockSlot: async (slotId) => {
    const response = await api.post(`/student/mock-interviews/book/${slotId}`);
    const booking = response.data?.data;
    return toMockSlot(booking.slot, 'Booked');
  },

  getMyMockBookings: async () => {
    try {
      const response = await api.get('/student/mock-interviews/my-bookings');
      return response.data?.data?.map(booking => ({
        ...toMockSlot(booking.slot, booking.slot?.status === 'COMPLETED' ? 'Completed' : 'Booked'),
        bookingId: booking.id,
        feedback: booking.feedbackRating == null ? null : {
          rating: booking.feedbackRating,
          strengths: booking.feedbackStrengths,
          areasToImprove: booking.feedbackAreasToImprove
        }
      }));
    } catch (e) {
      return null;
    }
  },

  // --- Study Resources ---
  getStudyResources: async () => {
    try {
      const response = await api.get('/student/resources');
      return response.data?.data?.map(resource => ({
        ...resource,
        size: resource.fileSize,
        downloadUrl: resource.fileUrl
      }));
    } catch (e) {
      return null;
    }
  },

  // --- Notifications ---
  getNotifications: async () => {
    try {
      const response = await api.get('/student/notifications');
      return response.data?.data?.map(notification => ({
        ...notification,
        read: notification.read ?? notification.isRead ?? false,
        time: notification.timeAgo
      }));
    } catch (e) {
      return null;
    }
  },

  markNotificationRead: async (notifId) => {
    const response = await api.put(`/student/notifications/${notifId}/read`);
    return response.data?.data;
  },

  markAllNotificationsRead: async () => {
    const response = await api.put('/student/notifications/read-all');
    return response.data?.data;
  },

  // --- Admin APIs ---
  getAdminUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      const raw = response.data?.data;
      if (Array.isArray(raw)) {
        return raw.map(u => ({
          id: u.id ? `STD-${u.id}` : '',
          rawId: u.id,
          name: u.fullName || u.name || 'Student User',
          email: u.email || '',
          department: u.department || '',
          year: u.year || u.yearOfStudy || '',
          cgpa: u.cgpa || '',
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
    const response = await api.delete(`/admin/users/${rawId}`);
    return response.data?.success;
  },

  createAdminCompany: async (company) => {
    const response = await api.post('/admin/companies', {
      name: company.name,
      logoUrl: company.logo,
      tier: company.tier,
      ctcRange: company.ctc,
      location: company.location,
      description: company.description,
      minCgpa: company.eligibility?.minCgpa,
      tenthTwelvethPct: company.eligibility?.tenthTwelveth,
      allowedBranches: company.eligibility?.allowedBranches?.join(', '),
      maxBacklogs: company.eligibility?.maxBacklogs,
      requiredSkills: company.skillsRequired?.join(', '),
      selectionRoundsJson: JSON.stringify(company.selectionProcess || []),
      interviewQuestionsJson: JSON.stringify(company.interviewQuestions || [])
    });
    return toCompany(response.data?.data);
  },

  deleteAdminCompany: async (id) => {
    const response = await api.delete(`/admin/companies/${id}`);
    return response.data?.success;
  },

  createAdminCodingProblem: async (problem) => {
    const response = await api.post('/admin/questions/coding', {
      title: problem.title,
      category: problem.category,
      difficulty: problem.difficulty.toUpperCase(),
      acceptanceRate: problem.acceptanceRate,
      description: problem.description,
      sampleInput: problem.sampleInput,
      sampleOutput: problem.sampleOutput,
      constraintsText: problem.constraints,
      starterCodeJs: problem.starterCode?.javascript,
      starterCodeJava: problem.starterCode?.java,
      starterCodePython: problem.starterCode?.python
    });
    const created = response.data?.data;
    return {
      ...created,
      difficulty: displayDifficulty(created.difficulty),
      constraints: created.constraintsText,
      solved: false,
      starterCode: {
        javascript: created.starterCodeJs || '',
        java: created.starterCodeJava || '',
        python: created.starterCodePython || ''
      }
    };
  },

  deleteAdminCodingProblem: async (id) => {
    const response = await api.delete(`/admin/questions/coding/${id}`);
    return response.data?.success;
  },

  createAdminResource: async (resource) => {
    const response = await api.post('/admin/resources', {
      title: resource.title,
      category: resource.category,
      format: resource.format,
      fileSize: resource.size,
      author: resource.author,
      fileUrl: resource.fileUrl
    });
    const created = response.data?.data;
    return { ...created, size: created.fileSize, downloadUrl: created.fileUrl };
  },

  deleteAdminResource: async (id) => {
    const response = await api.delete(`/admin/resources/${id}`);
    return response.data?.success;
  },

  getAdminMockInterviews: async () => {
    const [slotsResponse, bookingsResponse] = await Promise.all([
      api.get('/admin/mock-interviews/slots'),
      api.get('/admin/mock-interviews/bookings')
    ]);
    const bookingsBySlotId = new Map(
      (bookingsResponse.data?.data || []).map(booking => [booking.slot?.id, booking])
    );
    return (slotsResponse.data?.data || []).map(slot => {
      const booking = bookingsBySlotId.get(slot.id);
      return {
        ...toMockSlot(slot),
        bookingId: booking?.id,
        feedback: booking?.feedbackRating == null ? null : {
          rating: booking.feedbackRating,
          strengths: booking.feedbackStrengths,
          areasToImprove: booking.feedbackAreasToImprove
        }
      };
    });
  },

  createAdminMockSlot: async (slot) => {
    const response = await api.post('/admin/mock-interviews/slots', {
      mentorName: slot.mentorName,
      mentorTitle: slot.mentorTitle,
      date: slot.date,
      timeWindow: slot.time,
      interviewType: slot.type
    });
    return toMockSlot(response.data?.data);
  },

  submitAdminMockFeedback: async (bookingId, feedback) => {
    const response = await api.put(`/admin/mock-interviews/bookings/${bookingId}/feedback`, feedback);
    return response.data?.data;
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
