import './App.css';

import React from 'react';
import { Route, Routes } from 'react-router';
import { Login } from '../components/Auth/Login';
import { Register } from '../components/Auth/Register';
import { ContactList } from '../components/Contacts/ContactList';
import { Error } from '../components/Error/Error';
import { Home } from '../components/Home/Home';
import { AuthProvider } from '../contexts/auth/AuthContext';
import { ContactsProvider } from '../contexts/contact/ContactsContext';
import { InjectionProvider } from '../contexts/injection/InjectionContext';
import { AuthenticateLayout } from '../layouts/AuthenticateLayout';
import ContactLayout from '../layouts/ContactsLayout';
import { PrivateRoute, ProtectedRoute } from '../router/PrivateRoute';

const App: React.FC = () => {
  return (
    <InjectionProvider>
      <AuthProvider>
        <ContactsProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              element={
                <ProtectedRoute
                  element={<AuthenticateLayout />}
                  redirectTo="/contacts"
                />
              }
            >
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route
              path="/contacts"
              element={
                <PrivateRoute element={<ContactLayout />} redirectTo="/login" />
              }
            >
              <Route index element={<ContactList />} />
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </ContactsProvider>
      </AuthProvider>
    </InjectionProvider>
  );
};

export default App;
