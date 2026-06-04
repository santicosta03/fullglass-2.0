import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    const success = await login(email, password);

    if (success) {
      navigate('/profile');
    } else {
      setError('Credenciales incorrectas o usuario inactivo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f2f] via-[#1a1f4f] to-[#0b0f2f] flex items-center justify-center p-4 relative">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-blue-200 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al inicio
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-white/10 backdrop-blur-sm p-4 rounded-2xl mb-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-[#0b0f2f]">FG</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">FULLGLASS</h1>
          <p className="text-blue-200">Sistema de Gestión Empresarial</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Iniciar Sesión</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="mt-2 text-right">
                <Link to="/forgot-password" className="text-sm text-[#0b0f2f] hover:underline font-medium">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b0f2f] text-white py-3 rounded-lg hover:bg-[#1a1f4f] transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-[#0b0f2f] font-medium hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}