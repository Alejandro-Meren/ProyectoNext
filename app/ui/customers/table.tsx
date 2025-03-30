import Image from 'next/image';
import Search from '@/app/ui/search';
import { FormattedCustomersTable } from '@/app/lib/definitions';

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="p-4 bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-lg shadow-lg">
      <h1 className="mb-4 text-xl md:text-2xl text-pink-600 dark:text-purple-400 font-bold text-center">
        Clientes
      </h1>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <Search placeholder="Buscar Clientes..." />
      </div>

      {/* Diseño de tabla para pantallas grandes */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-pink-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Citas Totales
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Servicios
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    {customer.image_url ? (
                      <img
                        src={customer.image_url}
                        alt={customer.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {customer.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-200">{customer.email}</div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-200">
                    {customer.total_appointments}
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-200">{customer.services}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Diseño de tarjetas para dispositivos móviles */}
      <div className="block md:hidden space-y-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="flex items-center mb-4">
              {customer.image_url ? (
                <img
                  src={customer.image_url}
                  alt={customer.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
              )}
              <div className="ml-4">
                <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                  {customer.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
              </div>
            </div>
            <div className="text-sm text-gray-900 dark:text-gray-200">
              <p>
                <strong>Citas Totales:</strong> {customer.total_appointments}
              </p>
              <p>
                <strong>Servicios:</strong> {customer.services}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}