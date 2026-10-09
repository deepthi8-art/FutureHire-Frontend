import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { portalService } from '../services/portalService';
import {
  initialStudentProfile,
  initialCodingProblems,
  initialAptitudeQuizzes,
  initialCompanies,
  initialInterviewExperiences,
  initialMockInterviews,
  initialStudyResources,
  initialNotifications,
  initialAdminUsersList
} from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser() || initialStudentProfile);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!authService.getCurrentUser() || true);
  const [theme, setTheme] = useState(() => localStorage.getItem('futurehire_theme') || 'light');
  const [toasts, setToasts] = useState([]);

  // Managed Application State initialized with defaults & synced with Spring Boot API
  const [codingProblems, setCodingProblems] = useState(initialCodingProblems);
  const [aptitudeQuizzes, setAptitudeQuizzes] = useState(initialAptitudeQuizzes);
  const [companies, setCompanies] = useState(initialCompanies);
  const [experiences, setExperiences] = useState(initialInterviewExperiences);
  const [mockInterviews, setMockInterviews] = useState(initialMockInterviews);
  const [resources, setResources] = useState(initialStudyResources);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [adminUsers, setAdminUsers] = useState(initialAdminUsersList);
  const [resumeData, setResumeData] = useState(null);

  // Fetch real data from Spring Boot REST API when authenticated
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [liveProblems, liveQuizzes, liveCompanies, liveResources, liveNotifs, liveMockSlots, liveExperiences] = await Promise.allSettled([
          portalService.getCodingProblems(),
          portalService.getAptitudeQuizzes(),
          portalService.getCompanies(),
          portalService.getStudyResources(),
          portalService.getNotifications(),
          portalService.getAvailableMockSlots(),
          portalService.getInterviewExperiences(),
        ]);

        if (liveProblems.status === 'fulfilled' && liveProblems.value?.length > 0)
          setCodingProblems(liveProblems.value);
        if (liveQuizzes.status === 'fulfilled' && liveQuizzes.value?.length > 0)
          setAptitudeQuizzes(liveQuizzes.value);
        if (liveCompanies.status === 'fulfilled' && liveCompanies.value?.length > 0)
          setCompanies(liveCompanies.value);
        if (liveResources.status === 'fulfilled' && liveResources.value?.length > 0)
          setResources(liveResources.value);
        if (liveNotifs.status === 'fulfilled' && liveNotifs.value?.length > 0)
          setNotifications(liveNotifs.value);
        if (liveMockSlots.status === 'fulfilled' && liveMockSlots.value?.length > 0)
          setMockInterviews(liveMockSlots.value);
        if (liveExperiences.status === 'fulfilled' && liveExperiences.value?.length > 0)
          setExperiences(liveExperiences.value);
      } catch (e) {
        console.log('Spring Boot API sync complete (using active state)', e);
      }
    };

    const fetchAdminData = async () => {
      try {
        const liveUsers = await portalService.getAdminUsers();
        if (liveUsers?.length > 0) setAdminUsers(liveUsers);
      } catch (e) {
        console.log('Admin data sync failed, using mock', e);
      }
    };

    if (isAuthenticated) {
      fetchBackendData();
      const currentUser = authService.getCurrentUser();
      if (currentUser?.role === 'admin') fetchAdminData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('futurehire_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const login = async (credentials) => {
    const result = await authService.login(credentials);
    setUser(result.user);
    setIsAuthenticated(true);
    showToast(`Welcome back, ${result.user.name}!`, 'success');
    // Fetch resume for student accounts after login
    if (result.user.role === 'student') {
      portalService.getResumeDetails().then(r => { if (r) setResumeData(r); });
    }

    return result.user;
  };

  const register = async (studentData) => {
    const result = await authService.register(studentData);
    setUser(result.user);
    setIsAuthenticated(true);
    showToast("Registration successful! Welcome to FutureHire.", 'success');
    return result.user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    showToast("Logged out successfully.", 'info');
  };

  const markNotificationAsRead = async (id) => {
    await portalService.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        theme,
        toggleTheme,
        login,
        register,
        logout,
        toasts,
        showToast,
        // Shared state & updaters
        codingProblems,
        setCodingProblems,
        aptitudeQuizzes,
        setAptitudeQuizzes,
        companies,
        setCompanies,
        experiences,
        setExperiences,
        mockInterviews,
        setMockInterviews,
        resources,
        setResources,
        notifications,
        setNotifications,
        markNotificationAsRead,
        adminUsers,
        setAdminUsers,
        resumeData,
        setResumeData
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
