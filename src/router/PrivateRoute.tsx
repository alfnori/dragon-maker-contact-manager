import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/auth/useAuth';

interface PrivateRouteProps {
  element: React.ReactNode;
  redirectTo?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  redirectTo = '/login',
}) => {
  const { user, checkUser } = useAuth();

  useEffect(() => {
    const validateUser = async () => {
      await checkUser();
    };

    validateUser();
  }, [checkUser, user]);

  return user && user.id ? <>{element}</> : <Navigate to={redirectTo} />;
};

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  element,
  redirectTo = '/',
}) => {
  const { user, checkUser } = useAuth();

  useEffect(() => {
    const validateUser = async () => {
      await checkUser();
    };

    validateUser();
  }, [checkUser, user]);

  return user && user.id ? <Navigate to={redirectTo} /> : <>{element}</>;
};
