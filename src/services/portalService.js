
import api from './api';

const unwrap = (response) =>
  response?.data?.data ?? response?.data ?? null;

export const portalService = {
  // ---------------- Coding ----------------

  async getCodingProblems(difficulty = '') {
    const params = difficulty ? { difficulty } : {};
    return unwrap(
      await api.get('/student/coding/problems', { params })
    );
  },

  async submitCodingSolution(problemId, sourceCode, language) {
    return unwrap(
      await api.post('/student/coding/submissions', {
        problemId,
        sourceCode,
        language
      })
    );
  },

  // ---------------- Aptitude quizzes ----------------

  async getAptitudeQuizzes() {
    const data = unwrap(
      await api.get('/student/aptitude/quizzes')
    );

    return Array.isArray(data) ? data.map((quiz) => ({
      ...quiz,
      durationMinutes: quiz.durationMinutes || 15,
      questions: Array.isArray(quiz.questions) ? quiz.questions : []
    })) : [];
  },

  async getQuizQuestions(quizId) {
    const data = unwrap(
      await api.get(`/student/aptitude/quizzes/${quizId}/questions`)
    );

    const questions = Array.isArray(data)
      ? data
      : data?.questions || [];

    return questions.map((question) => ({
      ...question,
      id: question.id,
      questionText:
        question.questionText ||
        question.question ||
        question.text ||
        '',
      question:
        question.questionText ||
        question.question ||
        question.text ||
        '',
      options:
        question.options ||
        [
          question.optionA,
          question.optionB,
          question.optionC,
          question.optionD
        ].filter(Boolean)
    }));
  },

  async submitQuiz(quizOrPayload, answersMap) {
    let quizId;
    let answers;

    if (
      quizOrPayload &&
      typeof quizOrPayload === 'object' &&
      !Array.isArray(quizOrPayload)
    ) {
      quizId = quizOrPayload.quizId;
      answers = quizOrPayload.answers;
    } else {
      quizId = quizOrPayload;
      answers = answersMap;
    }

    if (quizId == null) {
      throw new Error('A quiz ID is required to submit the quiz.');
    }

    const response = await api.post(
      `/student/aptitude/quizzes/${quizId}/submit`,
      answers
    );

    return unwrap(response);
  },

  // ---------------- Progress ----------------
async getProgressOverview() {
return unwrap(
await api.get('/student/progress/overview')
) || {};
},

async getProgress() {
return this.getProgressOverview();
},

async getCodingProgress() {
return this.getProgressOverview();
},

async getQuizResults() {
return unwrap(
await api.get('/student/aptitude/results')
) || [];
},
  
  // ---------------- Companies ----------------

  async getCompanies(search = '') {
    const response = await api.get(
      search
        ? '/student/companies/search'
        : '/student/companies',
      search ? { params: { name: search } } : {}
    );

    return unwrap(response);
  },

  // ---------------- Resume ----------------

  async uploadResume(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(
      '/student/resumes/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return unwrap(response);
  },

  async getResumeDetails() {
    try {
      return unwrap(await api.get('/student/resumes'));
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async downloadResume() {
    const response = await api.get(
      '/student/resumes/download',
      { responseType: 'blob' }
    );

    return response.data;
  },

  async deleteResume() {
    return unwrap(await api.delete('/student/resumes'));
  },

  // ---------------- Interview experiences ----------------

  async getInterviewExperiences() {
    return unwrap(
      await api.get('/student/interviews/experiences')
    );
  },

  async shareExperience(experience) {
    return unwrap(
      await api.post(
        '/student/interviews/experiences',
        experience
      )
    );
  },

  // ---------------- Mock interviews ----------------

  async getAvailableMockSlots() {
    return unwrap(
      await api.get('/student/mock-interviews/slots')
    );
  },

  async bookMockSlot(slotId) {
    return unwrap(
      await api.post(
        `/student/mock-interviews/book/${slotId}`
      )
    );
  },

  // ---------------- Study resources ----------------

  async getStudyResources() {
    return unwrap(
      await api.get('/student/resources')
    );
  },

  // ---------------- Notifications ----------------

  async getNotifications() {
    return unwrap(
      await api.get('/student/notifications')
    );
  },

  async markNotificationRead(notificationId) {
    return unwrap(
      await api.put(
        `/student/notifications/${notificationId}/read`
      )
    );
  },

  // ---------------- Admin ----------------

  async getAdminUsers() {
    return unwrap(await api.get('/admin/users'));
  }
};

export default portalService;
