import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-block bg-red-100 p-6 rounded-full mb-6">
          <AlertTriangle className="w-16 h-16 text-red-600" />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">La página que buscas no existe o ha sido movida.</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 bg-[#0b0f2f] text-white px-6 py-3 rounded-lg hover:bg-[#1a1f4f] transition-colors duration-200 font-medium"
        >
          <Home className="w-5 h-5" />
          <span>Volver al inicio</span>
        </button>
      </div>
    </div>
  );
}
