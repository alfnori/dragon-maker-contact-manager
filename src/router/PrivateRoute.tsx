import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';

interface PrivateRouteProps {
  element: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user } = useAuth();
  return user && user.id ? <>{element}</> : <Navigate to="/login" />;
};
