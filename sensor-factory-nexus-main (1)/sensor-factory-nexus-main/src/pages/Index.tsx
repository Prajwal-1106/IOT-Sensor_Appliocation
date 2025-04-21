
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/AuthService';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (AuthService.isAuthenticated()) {
      // If authenticated, redirect to dashboard
      navigate('/');
    } else {
      // If not authenticated, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-industrial-lightGray">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">IoT Sensor Factory</h1>
        <p className="text-xl text-gray-600">Loading application...</p>
      </div>
    </div>
  );
};

export default Index;
