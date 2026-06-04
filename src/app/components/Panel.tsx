import { useAuth } from '../context/AuthContext';
import { Users, Package, ShoppingCart, TrendingUp, DollarSign, FileText } from 'lucide-react';

export default function Panel() {
  const { user, users } = useAuth();

  const isAdmin = user?.role === 'admin';

  const adminStats = [
    {
      icon: Users,
      label: 'Total Clientes',
      value: users.filter(u => u.role === 'client' && u.status === 'active').length,
      color: 'bg-blue-500',
    },
    {
      icon: Package,
      label: 'Productos',
      value: '156',
      color: 'bg-purple-500',
    },
    {
      icon: ShoppingCart,
      label: 'Ventas del Mes',
      value: '89',
      color: 'bg-green-500',
    },
    {
      icon: DollarSign,
      label: 'Ingresos',
      value: '$45,230',
      color: 'bg-orange-500',
    },
  ];

  const clientStats = [
    {
      icon: Package,
      label: 'Mis Pedidos',
      value: '3',
      color: 'bg-blue-500',
    },
    {
      icon: ShoppingCart,
      label: 'En Proceso',
      value: '2',
      color: 'bg-orange-500',
    },
    {
      icon: TrendingUp,
      label: 'Completados',
      value: '1',
      color: 'bg-green-500',
    },
  ];

  const stats = isAdmin ? adminStats : clientStats;

  const adminActivity = [
    { id: 1, action: 'Nueva venta registrada', time: 'Hace 5 minutos', type: 'success' },
    { id: 2, action: 'Cliente nuevo registrado', time: 'Hace 1 hora', type: 'info' },
    { id: 3, action: 'Producto actualizado', time: 'Hace 2 horas', type: 'warning' },
    { id: 4, action: 'Reporte generado', time: 'Hace 3 horas', type: 'info' },
  ];

  const clientActivity = [
    { id: 1, action: 'Pedido ORD-002 en tránsito', time: 'Hace 1 día', type: 'info' },
    { id: 2, action: 'Pedido ORD-001 entregado', time: 'Hace 3 días', type: 'success' },
    { id: 3, action: 'Nuevo pedido creado', time: 'Hace 5 días', type: 'info' },
  ];

  const recentActivity = isAdmin ? adminActivity : clientActivity;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bienvenido, {user?.name}
        </h1>
        <p className="text-gray-600 mt-1">
          {isAdmin ? 'Panel de administración - FULLGLASS' : 'Tu área personal - FULLGLASS'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Actividad Reciente</h2>
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Tendencias</h2>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 mb-1">Ventas</p>
              <p className="text-2xl font-bold text-green-700">+23%</p>
              <p className="text-xs text-green-600 mt-1">vs. mes anterior</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 mb-1">Nuevos clientes</p>
              <p className="text-2xl font-bold text-blue-700">+15%</p>
              <p className="text-xs text-blue-600 mt-1">vs. mes anterior</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-600 mb-1">Productos</p>
              <p className="text-2xl font-bold text-purple-700">+8%</p>
              <p className="text-xs text-purple-600 mt-1">vs. mes anterior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
