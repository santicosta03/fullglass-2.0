import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (requireAdmin && user.role !== 'admin') {
      navigate('/profile');
    }
  }, [user, requireAdmin, navigate]);

  if (!user) {
    return null;
  }

  if (requireAdmin && user.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600 mb-6">
            No tienes permisos para acceder a esta sección. Esta área está reservada para administradores.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="bg-[#0b0f2f] text-white px-6 py-3 rounded-lg hover:bg-[#1a1f4f] transition-colors"
          >
            Volver al perfil
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
