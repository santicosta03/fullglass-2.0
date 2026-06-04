import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  UserX,
  UserCheck,
  Search,
  IdCard,
  User,
} from "lucide-react";
import { toast } from "sonner";

export default function Clients() {
  const { user, users, updateUserRole, toggleUserStatus, loadUsers } = useAuth();
  const navigate = useNavigate();

  const [searchCuit, setSearchCuit] = useState("");

  const formatCuit = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 10) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;

    return `${numbers.slice(0, 2)}-${numbers.slice(2, 10)}-${numbers.slice(10, 11)}`;
  };

  const isAdmin =
    user?.role?.toLowerCase() === "admin" ||
    user?.role?.toLowerCase() === "role_admin";

  useEffect(() => {
    if (!user) return;

    if (!isAdmin) {
      navigate("/profile");
      return;
    }

    loadUsers();
  }, []);

  if (!user || !isAdmin) {
    return null;
  }

  const allClients = users.filter((u) => {
    const cuitUser = u.cuit?.replace(/\D/g, "") || "";
    const cuitSearch = searchCuit.replace(/\D/g, "");

    return u.id !== user.id && cuitUser.includes(cuitSearch);
  });

  const handleToggleStatus = (userId: string) => {
    toggleUserStatus(userId);
    toast.success("Estado del cliente actualizado");
  };

  const handleRoleChange = async (
    userId: string,
    newRole: "ADMIN" | "USER" | "CLIENT"
  ) => {
    try {
      await updateUserRole(userId, newRole);

      const roleNames = {
        ADMIN: "Administrador",
        USER: "Usuario",
        CLIENT: "Cliente",
      };

      toast.success(`Rol actualizado a ${roleNames[newRole]}`);
    } catch {
      toast.error("No se pudo actualizar el rol");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Gestión de Clientes
        </h1>
        <p className="text-gray-600 mt-1 text-sm lg:text-base">
          Administra los clientes registrados en el sistema
        </p>
      </div>

      <div className="mb-6 bg-white rounded-xl shadow-md p-4">
        <label
          htmlFor="searchCuit"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Buscar cliente por CUIT
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            id="searchCuit"
            type="text"
            value={searchCuit}
            maxLength={13}
            onChange={(e) => setSearchCuit(formatCuit(e.target.value))}
            placeholder="20-44891248-6"
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CUIT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {allClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No hay clientes registrados o no se encontraron resultados
                  </td>
                </tr>
              ) : (
                allClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900 font-medium">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {client.name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {client.email}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {client.phone}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <IdCard className="w-4 h-4 mr-2 text-gray-400" />
                        {client.cuit}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          client.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {client.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        aria-label={`Rol de ${client.email}`}
                        value={client.role}
                        onChange={(e) =>
                          handleRoleChange(
                            client.id,
                            e.target.value as "ADMIN" | "USER" | "CLIENT"
                          )
                        }
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                      >
                        <option value="ADMIN">Administrador</option>
                        <option value="USER">Usuario</option>
                        <option value="CLIENT">Cliente</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(client.id)}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          client.status === "active"
                            ? "bg-red-50 text-red-700 hover:bg-red-100"
                            : "bg-green-50 text-green-700 hover:bg-green-100"
                        }`}
                      >
                        {client.status === "active" ? (
                          <>
                            <UserX className="w-3.5 h-3.5" />
                            <span>Desactivar</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Activar</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {allClients.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No hay clientes registrados o no se encontraron resultados
          </div>
        ) : (
          allClients.map((client) => (
            <div key={client.id} className="bg-white rounded-xl shadow-md p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate flex items-center mb-1">
                    <User className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    {client.name}
                  </div>

                  <div className="text-sm text-gray-500 truncate flex items-center mb-1">
                    <Mail className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    {client.email}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Phone className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    {client.phone}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <IdCard className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    {client.cuit}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      client.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {client.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <select
                  aria-label={`Rol de ${client.email}`}
                  value={client.role}
                  onChange={(e) =>
                    handleRoleChange(
                      client.id,
                      e.target.value as "ADMIN" | "USER" | "CLIENT"
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#0b0f2f] focus:border-transparent outline-none transition-all"
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="USER">Usuario</option>
                  <option value="CLIENT">Cliente</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(client.id)}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    client.status === "active"
                      ? "bg-red-50 text-red-700 hover:bg-red-100"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  {client.status === "active" ? (
                    <>
                      <UserX className="w-4 h-4" />
                      <span>Desactivar</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Activar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}