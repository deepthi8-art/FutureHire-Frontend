import api from './api';

// ─── Data Mappers ────────────────────────────────────────────────────────────
export const toExperience = (experience) => ({
  id: experience.id ? (typeof experience.id === 'number' ? `EXP-${experience.id}` : experience.id) : `EXP-${Date.now()}`,
  rawId: experience.id,
  author: experience.student?.fullName || experience.student?.name || experience.author || 'Senior Student',
  college: experience.student?.studentProfile?.collegeName || experience.college || 'Engineering Institute',
  company: experience.companyName || experience.company || 'Tech Company',
  role: experience.roleTitle || experience.role || 'Software Engineer',
  verdict: experience.verdict || 'Selected',
  packageOffered: experience.packageOffered || '₹18 LPA',
  difficulty: experience.difficulty ? (experience.difficulty.charAt(0).toUpperCase() + experience.difficulty.slice(1).toLowerCase()) : 'Medium',
  date: experience.interviewDate || experience.date || 'October 2026',
  content: experience.content || 'Great interview experience with detailed coding and system rounds.',
  tips: experience.tips || 'Be thorough with fundamentals and communicate your thoughts clearly.',
});

export const toCodingProblem = (prob) => {
  const rawDiff = prob.difficulty ? prob.difficulty.toString() : 'Medium';
  const diffStr = rawDiff.charAt(0).toUpperCase() + rawDiff.slice(1).toLowerCase();
  
  return {
    id: prob.id ? (typeof prob.id === 'number' ? `CP-${prob.id}` : prob.id) : `CP-101`,
    rawId: prob.id,
    title: prob.title || 'Coding Problem',
    category: prob.category || 'Arrays & Hashing',
    difficulty: diffStr,
    solved: prob.solved || false,
    acceptanceRate: prob.acceptanceRate || '75.0%',
    description: prob.description || 'Solve the given algorithm problem within time and memory constraints.',
    sampleInput: prob.sampleInput || '',
    sampleOutput: prob.sampleOutput || '',
    explanation: prob.explanation || '',
    constraints: prob.constraintsText || prob.constraints || '1 <= N <= 10^4',
    starterCode: prob.starterCode || {
      javascript: `function solution(input) {\n  // Write JavaScript solution\n  return input;\n}`,
      python: `def solution(input):\n    # Write Python solution\n    return input`,
      java: `class Solution {\n    public void solve() {\n        // Write Java solution\n    }\n}`
    }
  };
};

export const toQuiz = (quiz) => {
  const questionsList = Array.isArray(quiz.questions)
    ? quiz.questions.map((q, idx) => ({
        id: q.id || `Q-${idx + 1}`,
        question: q.questionText || q.question || '',
        options: q.options || [q.optionA, q.optionB, q.optionC, q.optionD].filter(Boolean),
        correctIndex: q.correctOptionIndex !== undefined ? q.correctOptionIndex : (q.correctIndex !== undefined ? q.correctIndex : 0),
        explanation: q.explanation || 'Review the topic formula and rules for this question.'
      }))
    : [];

  return {
    id: quiz.id ? (typeof quiz.id === 'number' ? `APT-${quiz.id}` : quiz.id) : `APT-1`,
    rawId: quiz.id,
    title: quiz.title || 'Aptitude Test',
    category: quiz.category || 'Quantitative Aptitude',
    durationMinutes: quiz.durationMinutes || 15,
    questions: questionsList
  };
};

export const toCompany = (comp) => ({
  id: comp.id ? (typeof comp.id === 'number' ? `COMP-${comp.id}` : comp.id) : `COMP-1`,
  rawId: comp.id,
  name: comp.name || 'Company',
  logo: comp.logoUrl || comp.logo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=120&q=80',
  tier: comp.tier || 'Product / Dream',
  ctc: comp.ctcRange || comp.ctc || '₹12 - 25 LPA',
  location: comp.location || 'Pan India',
  description: comp.description || 'Leading technology enterprise hiring engineering graduates.',
  skillsRequired: Array.isArray(comp.requiredSkills)
    ? comp.requiredSkills
    : (comp.requiredSkills ? comp.requiredSkills.split(',').map(s => s.trim()) : (comp.skillsRequired || ['Data Structures', 'OOPs', 'SQL'])),
  eligibility: comp.eligibility || {
    minCgpa: '7.0 / 10.0',
    tenthTwelveth: '65% throughout',
    allowedBranches: ['CSE', 'IT', 'ECE', 'All Engineering'],
    maxBacklogs: 0
  },
  selectionProcess: comp.selectionProcess || [
    { round: 1, name: 'Online Assessment', details: 'Aptitude + Coding questions' },
    { round: 2, name: 'Technical Interview', details: 'Data Structures & OOPs live problem solving' },
    { round: 3, name: 'HR Interview', details: 'Cultural fit and behavioral assessment' }
  ],
  interviewQuestions: comp.interviewQuestions || [
    { q: 'Explain your most challenging project architecture.', difficulty: 'Medium', topic: 'Projects' }
  ]
});

export const toMockSlot = (slot) => ({
  id: slot.id ? (typeof slot.id === 'number' ? `MI-${slot.id}` : slot.id) : `MI-1`,
  rawId: slot.id,
  mentorName: slot.mentorName || 'Senior Tech Lead',
  mentorTitle: slot.mentorTitle || 'Senior Software Engineer',
  date: slot.date || '2026-10-15',
  time: slot.timeWindow || slot.time || '04:00 PM - 05:00 PM',
  type: slot.interviewType || slot.type || 'Technical (DSA & Coding)',
  status: slot.status ? (slot.status.charAt(0).toUpperCase() + slot.status.slice(1).toLowerCase()) : 'Available',
  meetingLink: slot.meetingLink || '',
  feedback: slot.feedback || null
});

export const toResource = (res) => ({
  id: res.id ? (typeof res.id === 'number' ? `RES-${res.id}` : res.id) : `RES-1`,
  rawId: res.id,
  title: res.title || 'Placement Guide',
  category: res.category || 'General',
  format: res.format || 'PDF',
  size: res.fileSize || res.size || '10.5 MB',
  downloads: res.downloads || 0,
  author: res.author || 'FutureHire Placement Team',
  downloadUrl: res.fileUrl || res.downloadUrl || '#'
});

// ─── Portal Service ───────────────────────────────────────────────────────────
export const portalService = {
  // --- Student Coding ---
  getCodingProblems: async (difficulty = '') => {
    try {
      const response = await api.get(`/student/coding/problems${difficulty ? `?difficulty=${difficulty}` : ''}`);
      const raw = response.data?.data;
      if (Array.isArray(raw)) return raw.map(toCodingProblem);
      return raw;
    } catch (e) {
      console.warn('Coding problems API failed', e.message);
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
      const raw = response.data?.data;
      if (Array.isArray(raw)) return raw.map(toQuiz);
      return raw;
    } catch (e) {
      return null;
    }
  },

  getQuizQuestions: async (quizId) => {
    try {
      const response = await api.get(`/student/aptitude/quizzes/${quizId}/questions`);
      return response.data?.data?.map(question => ({
        id: question.id,
        question: question.questionText,
        options: question.options
      }));
    } catch (e) {
      return null;
    }
  },

  submitQuiz: async (quizId, answersMap) => {
    const response = await api.post(`/student/aptitude/quizzes/${quizId}/submit`, answersMap);
    return response.data?.data;
  },

  getQuizResults: async () => {
    try {
      const response = await api.get('/student/aptitude/results');
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
      const raw = response.data?.data;
      if (Array.isArray(raw)) return raw.map(toCompany);
      return raw;
    } catch (e) {
      return null;
    }
  },

  // --- Resume ---
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return (await api.post('/student/resumes/upload', formData)).data?.data;
  },

  getResumeDetails: async () => {
    try {
      const response = await api.get('/student/resumes');
      return response.data?.data;
    } catch (e) {
      if (e?.response?.status === 404) return null;
      console.warn('Resume fetch failed', e.message);
      return null;
    }
  },

  downloadResumeBlob: async () => {
    const response = await api.get('/student/resumes/download', {
      responseType: 'blob',
    });
    return response.data;
  },

  deleteResume: async () => {
    return (await api.delete('/student/resumes')).data?.data;
  },

  // --- Interview Experiences ---
  getInterviewExperiences: async () => {
    try {
      const response = await api.get('/student/interviews/experiences');
      const raw = response.data?.data;
      if (Array.isArray(raw)) return raw.map(toExperience);
      return raw;
    } catch (e) {
      return null;
    }
  },

  shareExperience: async (expData) => {
    const payload = {
      companyName: expData.company || expData.companyName,
      roleTitle: expData.role || expData.roleTitle,
      verdict: expData.verdict,
      packageOffered: expData.packageOffered,
      interviewDate: expData.date || expData.interviewDate,
      difficulty: expData.difficulty,
      content: expData.content,
      tips: expData.tips
    };
    const raw = (await api.post('/student/interviews/experiences', payload)).data?.data;
    return raw ? toExperience(raw) : null;
  },

  // --- Mock Interviews ---
  getAvailableMockSlots: async () => {
    try {
      const response = await api.get('/student/mock-interviews/slots');
      const raw = response.data?.data;
      if (Array.isArray(raw)) return raw.map(toMockSlot);
      return raw;
    } catch (e) {
      return null;
    }
  },

  getMyMockInterviews: async () => {
    try {
      const response = await api.get('/student/mock-interviews/my-bookings');
      const bookings = response.data?.data;
      if (!Array.isArray(bookings)) return bookings;
      return bookings.map(booking => ({
        ...toMockSlot(booking.slot || {}),
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

  bookMockSlot: async (slotId) => {
    const booking = (await api.post(`/student/mock-interviews/book/${slotId}`)).data?.data;
    return {
      ...toMockSlot(booking.slot || {}),
      bookingId: booking.id,
      feedback: null
    };
  },

  // --- Study Resources ---
  getStudyResources: async () => {
    try {
      const response = await api.get('/student/resources');
      const raw = response.data?.data;
      if (Array.isArray(raw)) return raw.map(toResource);
      return raw;
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
    const response = await api.put(`/student/notifications/${notifId}/read`);
    return response.data?.data;
  },

  markAllNotificationsRead: async () => {
    const response = await api.put('/student/notifications/read-all');
    return response.data?.data;
  },

  // --- Progress Overview ---
  getProgressOverview: async () => {
    try {
      const response = await api.get('/student/progress/overview');
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
    return toCodingProblem(response.data?.data);
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
    return toResource(response.data?.data);
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
  },
};
