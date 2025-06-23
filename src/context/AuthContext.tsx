'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { clearToken } from '@/app/utils/tokenUtils';
import { removeUser } from "@/app/utils/userUtils";
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
  /**
   * 
   * Encounter global login and logout issue 
   * In oder to address this need to use authcontext provider
   * So that authentication contex will be updated congeniality 
   * 
   */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Inializing token from localStorage when context mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {

    /**
   * Token has been revocked from authContext via token utils
   * User info has been removed from browser local storage
  
   */
    console.log("Token has been revocked!");
    clearToken();
    //Removing user from browser storage
    console.log("User removed!");
    removeUser();
    setToken(null);
  };

  /**
   * Encounter global login and logout issue 
   * In oder to address this need to use authcontext provider
   * 
   * 
   */
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
