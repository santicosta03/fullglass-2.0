import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Users, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
    return <Outlet />;
  }

  const isAdmin =
    user.role?.toLowerCase() === 'admin' ||
    user.role?.toLowerCase() === 'role_admin';

  const adminMenuItems = [
    { icon: User, label: 'Perfil', path: '/profile' },
    { icon: Users, label: 'Gestión de clientes', path: '/clients' },
  ];

  const clientMenuItems = [
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  const menuItems = isAdmin ? adminMenuItems : clientMenuItems;

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">FG</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">FULLGLASS</h1>
            <p className="text-xs text-blue-200">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              type="button"
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="px-4 py-3 mb-2 bg-white/5 rounded-lg">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-xs text-blue-200">
            {isAdmin ? 'Administrador' : 'Cliente'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#0b0f2f] text-white">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 h-full bg-[#0b0f2f] text-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">FG</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">FULLGLASS</h1>
                  <p className="text-xs text-blue-200">Sistema de Gestión</p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Cerrar menú"
                title="Cerrar menú"
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:text-blue-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              type="button"
              aria-label="Abrir menú"
              title="Abrir menú"
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#0b0f2f] rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">FG</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">FULLGLASS</h1>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                {isAdmin ? 'Admin' : 'Cliente'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}