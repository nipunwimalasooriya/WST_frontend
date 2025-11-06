import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

export const AdminRoute = () => {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    toast.error('You do not have permission to view this page.');
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};