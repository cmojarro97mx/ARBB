
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  register: (name: string, email: string, role: UserRole) => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy user database
const dummyUsers: User[] = [
    { id: '1', name: 'Anfitrión Ejemplo', email: 'host@alasla.com', role: UserRole.ANFITRION, onboardingComplete: false },
    { id: '2', name: 'Cliente Ejemplo', email: 'client@alasla.com', role: UserRole.CLIENTE, onboardingComplete: true },
    { id: '3', name: 'Anfitrión Completo', email: 'host-complete@alasla.com', role: UserRole.ANFITRION, onboardingComplete: true },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    const foundUser = dummyUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert('Usuario no encontrado.');
    }
  }, []);

  const register = useCallback((name: string, email: string, role: UserRole) => {
    const newUser: User = {
      id: String(Date.now()),
      name,
      email,
      role,
      onboardingComplete: role === UserRole.CLIENTE,
    };
    dummyUsers.push(newUser); // Add to our "database"
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const completeOnboarding = useCallback(() => {
    setUser(currentUser => {
      if (currentUser && currentUser.role === UserRole.ANFITRION) {
        return { ...currentUser, onboardingComplete: true };
      }
      return currentUser;
    });
  }, []);

  const value = { user, login, logout, register, completeOnboarding };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
