import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');
    if (role && storedToken) {
      setUserRole(role);
      setToken(storedToken);
    }
  }, []);

  const login = (role, token) => {
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
    setUserRole(role);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    setUserRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
