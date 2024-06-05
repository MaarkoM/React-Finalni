import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  const login = (token) => {
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  const logout = async () => {
    const token = Cookies.get('token');
    if (token) {
      await axios.post('http://localhost:8080/api/revoke-token', {
        token,
        userId: user?.id,
        reason: 'User logged out',
      });
      Cookies.remove('token');
      setUser(null);
    }
  };

  const getUser = () => user;

  return (
    <AuthContext.Provider value={{ user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
