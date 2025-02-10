import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';

interface PrivateRouteProps {
  element: React.ReactNode;
  redirectTo?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  redirectTo = '/login',
}) => {
  const { user } = useAuth();
  return user && user.id ? <>{element}</> : <Navigate to={redirectTo} />;
};

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  element,
  redirectTo = '/',
}) => {
  const { user } = useAuth();
  return user && user.id ? <Navigate to={redirectTo} /> : <>{element}</>;
};
