import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Landing() {
  const navigate = useNavigate();
  const { customer, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (customer) {
      navigate('/home', { replace: true });
      return;
    }

    navigate('/login', { replace: true });
  }, [customer, loading, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <p className="text-sm text-gray-500">Redirecting...</p>
    </main>
  );
}

export default Landing;