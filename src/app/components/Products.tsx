import { Package, Search } from 'lucide-react';

export default function Products() {
  const products = [
    { id: 1, name: 'Parabrisas Delantero Toyota Corolla', category: 'Parabrisas', price: '$25,000', stock: 12 },
    { id: 2, name: 'Vidrio Lateral Derecho Ford Focus', category: 'Laterales', price: '$8,500', stock: 8 },
    { id: 3, name: 'Luneta Trasera Honda Civic', category: 'Lunetas', price: '$15,000', stock: 5 },
    { id: 4, name: 'Espejo Retrovisor Chevrolet Cruze', category: 'Espejos', price: '$4,200', stock: 15 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
          <p className="text-gray-600 mt-1">Gestión de inventario</p>
        </div>
        <button className="bg-[#0b0f2f] text-white px-4 py-2 rounded-lg hover:bg-[#1a1f4f] transition-colors flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.stock} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {product.stock > 10 ? 'En stock' : 'Stock bajo'}
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
