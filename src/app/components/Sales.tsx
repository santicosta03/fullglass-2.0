import { ShoppingCart, Calendar, DollarSign } from 'lucide-react';

export default function Sales() {
  const sales = [
    { id: 1, client: 'Automotriz Central', product: 'Parabrisas Toyota Corolla', date: '2026-04-18', amount: '$25,000', status: 'Completada' },
    { id: 2, client: 'Taller Rodríguez', product: 'Vidrio Lateral Ford Focus', date: '2026-04-17', amount: '$8,500', status: 'Completada' },
    { id: 3, client: 'Service García', product: 'Luneta Honda Civic', date: '2026-04-16', amount: '$15,000', status: 'Pendiente' },
    { id: 4, client: 'Mecánica Express', product: 'Espejo Chevrolet Cruze', date: '2026-04-15', amount: '$4,200', status: 'Completada' },
  ];

  const totalSales = sales.reduce((sum, sale) => sum + parseInt(sale.amount.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Ventas</h1>
          <p className="text-gray-600 mt-1">Historial de transacciones</p>
        </div>
        <button className="bg-[#0b0f2f] text-white px-4 py-2 rounded-lg hover:bg-[#1a1f4f] transition-colors flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5" />
          <span>Nueva Venta</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Ventas</p>
              <p className="text-2xl font-bold text-gray-800">{sales.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-800">${totalSales.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Este Mes</p>
              <p className="text-2xl font-bold text-gray-800">{sales.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{sale.client}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{sale.product}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{sale.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{sale.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      sale.status === 'Completada' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {sale.status}
                    </span>
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
