
import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { UserRole } from './types';
import AuthPage from './pages/AuthPage';
import HostDashboardPage from './pages/HostDashboardPage';
import ClientDashboardPage from './pages/ClientDashboardPage';

const App: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <AuthPage />;
  }

  switch (user.role) {
    case UserRole.ANFITRION:
      return <HostDashboardPage />;
    case UserRole.CLIENTE:
      return <ClientDashboardPage />;
    default:
      return <AuthPage />;
  }
};

export default App;
