import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

// Student Portal Pages
import StudentDashboard from './pages/student/StudentDashboard';
import CodingPractice from './pages/student/CodingPractice';
import AptitudePractice from './pages/student/AptitudePractice';
import CompanyInfo from './pages/student/CompanyInfo';
import ResumeManagement from './pages/student/ResumeManagement';
import InterviewExperiences from './pages/student/InterviewExperiences';
import MockInterviews from './pages/student/MockInterviews';
import ProgressTracker from './pages/student/ProgressTracker';
import StudyResources from './pages/student/StudyResources';
import Notifications from './pages/student/Notifications';

// Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageQuestions from './pages/admin/ManageQuestions';
import ManageCompanies from './pages/admin/ManageCompanies';
import ManageResources from './pages/admin/ManageResources';
import ViewReports from './pages/admin/ViewReports';
import ManageMockInterviews from './pages/admin/ManageMockInterviews';

// Dashboard Layout Wrapper
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Student Portal Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="coding-practice" element={<CodingPractice />} />
            <Route path="aptitude-practice" element={<AptitudePractice />} />
            <Route path="company-info" element={<CompanyInfo />} />
            <Route path="resume" element={<ResumeManagement />} />
            <Route path="interview-experiences" element={<InterviewExperiences />} />
            <Route path="mock-interviews" element={<MockInterviews />} />
            <Route path="progress" element={<ProgressTracker />} />
            <Route path="resources" element={<StudyResources />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Protected Admin Portal Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="questions" element={<ManageQuestions />} />
            <Route path="companies" element={<ManageCompanies />} />
            <Route path="resources" element={<ManageResources />} />
            <Route path="reports" element={<ViewReports />} />
            <Route path="mock-interviews" element={<ManageMockInterviews />} />
          </Route>

          {/* Fallback Wildcard Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  </ErrorBoundary>
  );
}

export default App;
