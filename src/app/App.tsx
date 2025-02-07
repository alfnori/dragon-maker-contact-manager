import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { Login } from '../components/Auth/Login';
import { Register } from '../components/Auth/Register';
import { PrivateRoute } from '../components/Common/PrivateRoute';
import { AuthenticateLayout } from '../layouts/AuthenticateLayout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthenticateLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <div>Contact Page!</div>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/contacts" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
