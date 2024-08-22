import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  authToken: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  email: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(sessionStorage.getItem('auth-token'));
  const [email, setEmail] = useState<string | null>(sessionStorage.getItem('email'));

  const login = (token: string, email: string) => {
    setAuthToken(token);
    setEmail(email);
    sessionStorage.setItem('auth-token', token);
    sessionStorage.setItem('email', email);
  };

  const logout = () => {
    setAuthToken(null);
    setEmail(null);
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};