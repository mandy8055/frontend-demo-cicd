import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/common/hooks';
import { selectIsAuthenticated } from 'src/app/store/selectors';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
