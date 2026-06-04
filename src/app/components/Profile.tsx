import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Shield,
  AlertTriangle,
  FileText,
  Save,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '../services/api';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile(formData);
      toast.success('Perfil actualizado correctamente');
    } catch {
      toast.error('No se pudo actualizar el perfil');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await apiFetch('/auth/me', {
        method: 'DELETE',
      });

      setShowDeleteModal(false);
      toast.success('Cuenta dada de baja correctamente');

      await logout();
      navigate('/login');
    } catch (error) {
      console.log('Error al dar de baja: ', error);
      toast.error('No se pudo dar de baja la cuenta');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
        <p className="text-gray-600 mt-1">Gestiona tu información personal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORM */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Información Personal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NOMBRE */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Nombre completo"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f]"
                    placeholder="Ingrese su nombre"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    disabled
                    aria-label="Correo electrónico"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              {/* TELEFONO */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-label="Teléfono"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f]"
                    placeholder="Ingrese su teléfono"
                  />
                </div>
              </div>

              {/* CUIT */}
              <div>
                <label htmlFor="cuit" className="block text-sm font-medium text-gray-700 mb-2">
                  CUIT
                </label>

                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="text"
                    id="cuit"
                    value={user.cuit}
                    disabled
                    aria-label="CUIT"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              {/* ROL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>

                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="text"
                    value={
                      user.role === 'ADMIN'
                        ? 'Administrador'
                        : user.role === 'USER'
                          ? 'Usuario'
                          : 'Cliente'
                    }
                    disabled
                    aria-label="Rol del usuario"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b0f2f] text-white py-3 rounded-lg hover:bg-[#1a1f4f] flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Guardar cambios
              </button>
            </form>
          </div>
        </div>

        {/* BOTON BAJA */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 text-red-600 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold">Zona de peligro</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Al dar de baja tu cuenta, el usuario quedará inactivo y no podrá iniciar sesión.
            </p>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Dar de baja cuenta
            </button>
          </div>
        </div>
      </div>

      {/* MODAL CONFIRMACION BAJA */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Confirmar baja de cuenta
                  </h2>
                  <p className="text-sm text-gray-500">
                    Esta acción requiere confirmación.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-700"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que querés dar de baja tu cuenta? Tu usuario quedará inactivo y no podrás volver a iniciar sesión con esta cuenta.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="flex-1 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Sí, dar de baja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}