import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRole = user?.role?.toLowerCase()?.includes('admin') ? 'admin' : 'student';

  if (allowedRole && normalizedRole !== allowedRole) {
    const redirectPath = normalizedRole === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
