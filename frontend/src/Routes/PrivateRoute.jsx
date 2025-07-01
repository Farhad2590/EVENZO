import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const { user, loading, isAuthenticated, fetchUser } = useAuth();
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      await fetchUser();
      setInitialized(true);
    };
    
    if (!initialized && !user) {
      checkAuth();
    }
  }, [fetchUser, initialized, user]);

  if (loading || !initialized) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (isAuthenticated) return children;

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;