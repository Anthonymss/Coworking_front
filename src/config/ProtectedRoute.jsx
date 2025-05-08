import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userRoles = userData.roles || [];
  const hasAccess = allowedRoles.length === 0 || userRoles.some(role => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedRoute;
