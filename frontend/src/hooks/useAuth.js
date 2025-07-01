// hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create a single axios instance outside the hook
const api = axios.create({
  baseURL: 'http://localhost:9000',
  headers: { 'Content-Type': 'application/json' },
});

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    setUser(null);
    toast.success("Logged Out successfully!");
  };

  // Add interceptors only once when the hook is first used
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(config => {
      const token = localStorage.getItem('jwtToken');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) logout();
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when component unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const fetchUser = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return null;
    
    setLoading(true);
    try {
      const response = await api.get(`/auth/user/${userId}`);
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Initialize authentication on hook mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        try {
          await fetchUser();
        } catch (error) {
          // If fetchUser fails, tokens might be invalid
          logout();
        }
      }
    };
    initializeAuth();
  }, []);

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/signup', userData);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/signin', credentials);
      
      // Store tokens
      localStorage.setItem('jwtToken', response.data.jwtToken);
      localStorage.setItem('userId', response.data._id);
      
      // Set user state
      setUser({ 
        _id: response.data._id, 
        name: response.data.name, 
        email: response.data.email 
      });
      
      toast.success("Signed in successfully!");
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signin failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signup,
    signin,
    logout,
    fetchUser,
    clearError: () => setError(null),
  };
};

export default useAuth;