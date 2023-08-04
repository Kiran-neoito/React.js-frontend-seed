import ProtectedLayout from '../Layout/ProtectedLayout';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getLocalStorage } from '../helpers/utils';

export const ProtectedRoute: React.FC = () => {
  const location = useLocation();

  const isAuthenticated = getLocalStorage('AUTH_DETAILS');

  return isAuthenticated ? (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
