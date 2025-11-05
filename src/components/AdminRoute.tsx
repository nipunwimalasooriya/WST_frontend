import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

export const AdminRoute = () => {
  const { isAdmin, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    toast.error('You do not have permission to view this page.');
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};