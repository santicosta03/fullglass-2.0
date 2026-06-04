import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b0f2f] via-[#1a1f4f] to-[#0b0f2f] flex items-center justify-center p-4 relative">
        <Link
          to="/login"
          className="absolute top-6 left-6 flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver</span>
        </Link>

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

          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Correo enviado</h2>

            <p className="text-gray-600 mb-8">
              Te enviamos un correo con instrucciones para restablecer tu contraseña.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                Revisa tu bandeja de entrada y sigue las instrucciones. Si no ves el correo, revisa tu carpeta de spam.
              </p>
            </div>

            <Link
              to="/login"
              className="inline-flex items-center justify-center space-x-2 w-full bg-[#0b0f2f] text-white py-3 rounded-lg hover:bg-[#1a1f4f] transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f2f] via-[#1a1f4f] to-[#0b0f2f] flex items-center justify-center p-4 relative">
      <Link
        to="/login"
        className="absolute top-6 left-6 flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver</span>
      </Link>

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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recuperar contraseña</h2>

          <p className="text-gray-600 mb-8">
            Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>

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
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0b0f2f] text-white py-3 rounded-lg hover:bg-[#1a1f4f] transition-colors duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Enviar enlace</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-gray-600 hover:text-[#0b0f2f] font-medium inline-flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
