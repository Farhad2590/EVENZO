// hooks/useUser.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // Axios instance with base configuration
  const api = axios.create({
    baseURL: 'http://localhost:8000', // Adjust to your backend URL
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle expired tokens
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid - auto logout
        handleTokenExpired();
      }
      return Promise.reject(error);
    }
  );

  // Handle token expiration
  const handleTokenExpired = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    setCurrentUser(null);
    setIsUserLoaded(false);
  };

  // Fetch current user data
  const fetchCurrentUser = async (userId) => {
    if (!userId) {
      setCurrentUser(null);
      setIsUserLoaded(true);
      return null;
    }

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setCurrentUser(null);
      setIsUserLoaded(true);
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/auth/user/${userId}`);
      
      if (response.data.success) {
        setCurrentUser(response.data.user);
        setIsUserLoaded(true);
        return response.data.user;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch user data';
      setError(errorMessage);
      
      // If token is expired or invalid, auto logout
      if (err.response?.status === 401) {
        handleTokenExpired();
      }
      
      setCurrentUser(null);
      setIsUserLoaded(true);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Initialize user data on mount
  useEffect(() => {
    const initializeUser = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('jwtToken');
      
      if (userId && token) {
        try {
          await fetchCurrentUser(userId);
        } catch (error) {
          console.error('Failed to initialize user:', error);
        }
      } else {
        setIsUserLoaded(true);
      }
    };

    if (!isUserLoaded) {
      initializeUser();
    }
  }, [isUserLoaded]);

  // Refresh user data
  const refreshUser = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await fetchCurrentUser(userId);
      } catch (error) {
        console.error('Failed to refresh user:', error);
      }
    }
  };

  // Update user data locally
  const updateUserLocally = (userData) => {
    setCurrentUser(prev => ({ ...prev, ...userData }));
  };

  // Clear user data
  const clearUser = () => {
    setCurrentUser(null);
    setIsUserLoaded(false);
    setError(null);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');
    return !!(token && userId && currentUser);
  };

  return {
    currentUser,
    loading,
    error,
    isUserLoaded,
    fetchCurrentUser,
    refreshUser,
    updateUserLocally,
    clearUser,
    clearError,
    isAuthenticated,
  };
};

export default useUser;