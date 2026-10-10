import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { portalService } from '../services/portalService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!authService.getCurrentUser());
  const [theme, setTheme] = useState(() => localStorage.getItem('futurehire_theme') || 'light');
  const [toasts, setToasts] = useState([]);

  // Managed Application State initialized with defaults & synced with Spring Boot API
  const [codingProblems, setCodingProblems] = useState([]);
  const [codingProgress, setCodingProgress] = useState(null);
  const [aptitudeQuizzes, setAptitudeQuizzes] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [mockInterviews, setMockInterviews] = useState([]);
  const [resources, setResources] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setIsAuthenticated(false);
      setCodingProblems([]);
      setCodingProgress(null);
      setAptitudeQuizzes([]);
      setQuizResults([]);
      setCompanies([]);
      setExperiences([]);
      setMockInterviews([]);
      setResources([]);
      setNotifications([]);
      setAdminUsers([]);
      setResumeData(null);
    };

    window.addEventListener('futurehire:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('futurehire:unauthorized', handleUnauthorized);
  }, []);

  // Fetch real data from Spring Boot REST API when authenticated
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [liveProblems, liveProgress, liveQuizzes, liveQuizResults, liveCompanies, liveResources, liveNotifs, liveMockSlots, liveExperiences, liveBookings] = await Promise.allSettled([
          portalService.getCodingProblems(),
          portalService.getCodingProgress(),
          portalService.getAptitudeQuizzes(),
          portalService.getQuizResults(),
          portalService.getCompanies(),
          portalService.getStudyResources(),
          portalService.getNotifications(),
          portalService.getAvailableMockSlots(),
          portalService.getInterviewExperiences(),
          portalService.getMyMockBookings(),
        ]);

        if (liveProblems.status === 'fulfilled' && Array.isArray(liveProblems.value))
          setCodingProblems(liveProblems.value);
        if (liveProgress.status === 'fulfilled' && liveProgress.value)
          setCodingProgress(liveProgress.value);
        if (liveQuizzes.status === 'fulfilled' && Array.isArray(liveQuizzes.value))
          setAptitudeQuizzes(liveQuizzes.value);
        if (liveQuizResults.status === 'fulfilled' && Array.isArray(liveQuizResults.value))
          setQuizResults(liveQuizResults.value);
        if (liveCompanies.status === 'fulfilled' && Array.isArray(liveCompanies.value))
          setCompanies(liveCompanies.value);
        if (liveResources.status === 'fulfilled' && Array.isArray(liveResources.value))
          setResources(liveResources.value);
        if (liveNotifs.status === 'fulfilled' && Array.isArray(liveNotifs.value))
          setNotifications(liveNotifs.value);
        if (liveMockSlots.status === 'fulfilled' && Array.isArray(liveMockSlots.value)) {
          const bookings = liveBookings.status === 'fulfilled' && Array.isArray(liveBookings.value)
            ? liveBookings.value
            : [];
          setMockInterviews([...liveMockSlots.value, ...bookings]);
        }
        if (liveExperiences.status === 'fulfilled' && Array.isArray(liveExperiences.value))
          setExperiences(liveExperiences.value);
      } catch (e) {
        console.log('Spring Boot API sync complete (using active state)', e);
      }
    };

    const fetchAdminData = async () => {
      try {
        const [liveUsers, liveMockInterviews] = await Promise.all([
          portalService.getAdminUsers(),
          portalService.getAdminMockInterviews()
        ]);
        if (Array.isArray(liveUsers)) setAdminUsers(liveUsers);
        if (Array.isArray(liveMockInterviews)) setMockInterviews(liveMockInterviews);
      } catch (e) {
        console.warn('Admin data sync failed.', e);
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
    setCodingProblems([]);
    setCodingProgress(null);
    setAptitudeQuizzes([]);
    setQuizResults([]);
    setCompanies([]);
    setExperiences([]);
    setMockInterviews([]);
    setResources([]);
    setNotifications([]);
    setAdminUsers([]);
    setResumeData(null);
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
        codingProgress,
        aptitudeQuizzes,
        setAptitudeQuizzes,
        quizResults,
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
