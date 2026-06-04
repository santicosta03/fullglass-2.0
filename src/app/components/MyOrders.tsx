import { Package, Calendar, Eye } from 'lucide-react';

export default function MyOrders() {
  const orders = [
    {
      id: 'ORD-001',
      product: 'Parabrisas Toyota Corolla 2020',
      date: '2026-04-18',
      status: 'Entregado',
      amount: '$25,000',
      statusColor: 'green'
    },
    {
      id: 'ORD-002',
      product: 'Vidrio Lateral Derecho Ford Focus',
      date: '2026-04-15',
      status: 'En tránsito',
      amount: '$8,500',
      statusColor: 'blue'
    },
    {
      id: 'ORD-003',
      product: 'Luneta Trasera Honda Civic',
      date: '2026-04-10',
      status: 'Procesando',
      amount: '$15,000',
      statusColor: 'orange'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mis Pedidos</h1>
        <p className="text-gray-600 mt-1">Historial de tus compras</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Pedidos</p>
              <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">En Proceso</p>
              <p className="text-2xl font-bold text-gray-800">
                {orders.filter(o => o.status !== 'Entregado').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completados</p>
              <p className="text-2xl font-bold text-gray-800">
                {orders.filter(o => o.status === 'Entregado').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Historial de Pedidos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Pedido</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.product}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{order.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{order.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      order.statusColor === 'green' ? 'bg-green-100 text-green-700' :
                      order.statusColor === 'blue' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>Ver detalle</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
