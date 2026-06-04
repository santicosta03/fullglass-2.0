import { FileText, Download, Calendar } from 'lucide-react';

export default function Reports() {
  const reports = [
    { id: 1, name: 'Reporte de Ventas Mensual', date: '2026-04-01', type: 'Ventas', format: 'PDF' },
    { id: 2, name: 'Inventario de Productos', date: '2026-04-15', type: 'Inventario', format: 'Excel' },
    { id: 3, name: 'Clientes Activos', date: '2026-04-10', type: 'Clientes', format: 'PDF' },
    { id: 4, name: 'Resumen Financiero', date: '2026-04-05', type: 'Finanzas', format: 'PDF' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reportes</h1>
          <p className="text-gray-600 mt-1">Genera y descarga reportes del sistema</p>
        </div>
        <button className="bg-[#0b0f2f] text-white px-4 py-2 rounded-lg hover:bg-[#1a1f4f] transition-colors flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Generar Reporte</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {['Ventas', 'Inventario', 'Clientes', 'Finanzas'].map((type, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-[#0b0f2f]" />
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">{type}</h3>
            <p className="text-sm text-gray-600">Generar reporte</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Reportes Generados</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formato</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{report.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{report.format}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Descargar</span>
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
