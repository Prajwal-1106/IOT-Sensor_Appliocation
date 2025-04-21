
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from '@/services/AuthService';
import DashboardLayout from '../layout/DashboardLayout';

const PrivateRoute = () => {
  const isAuthenticated = AuthService.isAuthenticated();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes within the dashboard layout
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default PrivateRoute;
