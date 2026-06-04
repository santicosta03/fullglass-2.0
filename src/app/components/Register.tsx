import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Lock, AlertCircle, CheckCircle, ArrowLeft, FileText } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    cuit: '',
  });

  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const formatCuit = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 10) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    }

    return `${numbers.slice(0, 2)}-${numbers.slice(2, 10)}-${numbers.slice(10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cuit') {
      setFormData({
        ...formData,
        cuit: formatCuit(value),
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (Object.values(formData).some((value) => !value)) {
      setError('Por favor complete todos los campos');
      return;
    }

    if (formData.password.length < 8 || formData.confirmPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!/^\d{2}-\d{8}-\d{1}$/.test(formData.cuit)) {
      setError('El CUIT debe tener formato 20-12345678-9');
      return;
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      cuit: formData.cuit,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });

    if (success) {
      navigate('/login');
    } else {
      setError('No se pudo registrar. Revisá los datos o intentá con otro correo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f2f] via-[#1a1f4f] to-[#0b0f2f] flex items-center justify-center p-4 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver</span>
      </Link>

      <div className="w-full max-w-2xl">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Cuenta</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar contraseña *
                </label>
                <div className="relative">
                  <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength={8}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                    placeholder="Repita la contraseña"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                    placeholder="Ingrese su nombre completo"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                    placeholder="Ingrese su teléfono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cuit" className="block text-sm font-medium text-gray-700 mb-2">
                  CUIT *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="cuit"
                    name="cuit"
                    value={formData.cuit}
                    onChange={handleChange}
                    inputMode="numeric"
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                    placeholder="20-12345678-9"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b0f2f] text-white py-3 rounded-lg hover:bg-[#1a1f4f] transition-colors duration-200 font-medium shadow-lg hover:shadow-xl mt-6"
            >
              Registrarse
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/" className="text-[#0b0f2f] font-medium hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}