import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from cookie
    const checkAuth = () => {
      const userFromCookie = Cookies.get('user');
      if (userFromCookie) {
        try {
          const parsedUser = JSON.parse(userFromCookie);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse user data from cookie', error);
          Cookies.remove('user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (credentials) => {
    // Hardcoded admin credentials
    const adminUser = {
      username: 'admin',
      password: 'admin123'
    };

    if (
      credentials.username === adminUser.username &&
      credentials.password === adminUser.password
    ) {
      const userData = { username: adminUser.username, role: 'admin' };
      // Store user in cookie (expires in 1 day)
      Cookies.set('user', JSON.stringify(userData), { expires: 1 });
      
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    Cookies.remove('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
