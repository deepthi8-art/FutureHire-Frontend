import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const CodingPractice = lazy(() => import('./pages/student/CodingPractice'));
const AptitudePractice = lazy(() => import('./pages/student/AptitudePractice'));
const CompanyInfo = lazy(() => import('./pages/student/CompanyInfo'));
const ResumeManagement = lazy(() => import('./pages/student/ResumeManagement'));
const InterviewExperiences = lazy(() => import('./pages/student/InterviewExperiences'));
const MockInterviews = lazy(() => import('./pages/student/MockInterviews'));
const ProgressTracker = lazy(() => import('./pages/student/ProgressTracker'));
const StudyResources = lazy(() => import('./pages/student/StudyResources'));
const Notifications = lazy(() => import('./pages/student/Notifications'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const ManageQuestions = lazy(() => import('./pages/admin/ManageQuestions'));
const ManageCompanies = lazy(() => import('./pages/admin/ManageCompanies'));
const ManageResources = lazy(() => import('./pages/admin/ManageResources'));
const ViewReports = lazy(() => import('./pages/admin/ViewReports'));
const ManageMockInterviews = lazy(() => import('./pages/admin/ManageMockInterviews'));

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
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="page-content" role="status">Loading...</div>}>
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
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
