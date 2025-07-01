// hooks/useAxiosInstance.js
import { useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from './useAuth';

const useAxiosInstance = () => {
  const { logout } = useAuth();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: 'https://evenzo-psi.vercel.app',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add JWT token
    instance.interceptors.request.use(
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

    // Response interceptor to handle token expiration
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          toast.error('Session expired. Please login again.');
          logout();
        } else if (error.response?.status === 403) {
          toast.error('Access denied. You do not have permission.');
        } else if (error.response?.status >= 500) {
          toast.error('Server error. Please try again later.');
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [logout]);

  return axiosInstance;
};

export default useAxiosInstance;