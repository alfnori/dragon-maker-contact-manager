import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Login } from '../components/Auth/Login';
import { Register } from '../components/Auth/Register';
import { AuthProvider } from '../contexts/AuthContext';
import { AuthenticateLayout } from '../layouts/AuthenticateLayout';
import { PrivateRoute, ProtectedRoute } from '../router/PrivateRoute';
import { Error } from '../components/Error/Error';
import { Home } from '../components/Home/Home';
import { ContactList } from '../components/Contacts/ContactList';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<AuthenticateLayout />}>
            <Route
              path="/login"
              element={
                <ProtectedRoute element={<Login />} redirectTo="/contacts" />
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute element={<Register />} redirectTo="/contacts" />
              }
            />
          </Route>

          <Route
            path="/contacts"
            element={<PrivateRoute element={<ContactList />} />}
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
