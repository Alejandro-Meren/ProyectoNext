import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedCustomersTable } from '@/app/lib/definitions';

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
        <h1 className="mb-8 text-3xl md:text-4xl text-center text-pink-800 font-bold">
          Clientes
        </h1>
        <div className="mb-8">
          <Search placeholder="Buscar Clientes..." />
        </div>
        <div className="mt-6 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-3xl bg-white shadow-lg p-6 md:p-8">
                {/* Tarjetas para dispositivos móviles */}
                <div className="md:hidden">
                  {customers?.map((customer) => (
                    <div
                      key={customer.id}
                      className="mb-4 w-full rounded-lg bg-pink-50 p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-between border-b border-pink-200 pb-4">
                        <div className="flex items-center">
                          {customer.image_url ? (
                            <Image
                              src={customer.image_url}
                              alt={customer.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                          )}
                          <div className="ml-4">
                            <p className="text-sm font-medium text-pink-700">{customer.name}</p>
                            <p className="text-sm text-pink-500">{customer.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between border-b border-pink-200 py-5">
                        <div className="flex w-1/2 flex-col">
                          <p className="text-xs text-pink-500">Citas Totales</p>
                          <p className="font-medium text-pink-700">{customer.total_appointments}</p>
                        </div>
                        <div className="flex w-1/2 flex-col">
                          <p className="text-xs text-pink-500">Servicios</p>
                          <p className="font-medium text-pink-700">{customer.services}</p>
                        </div>
                      </div>
                      <div className="pt-4 text-sm text-pink-500">
                        <p>{customer.total_invoices} facturas</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tabla para pantallas grandes */}
                <table className="hidden min-w-full rounded-lg text-gray-900 md:table">
                  <thead className="bg-gradient-to-r from-pink-200 to-pink-300">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider"
                      >
                        Cliente
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider"
                      >
                        Citas Totales
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider"
                      >
                        Servicios
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-200 text-gray-900">
                    {customers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="group hover:bg-pink-50 transition-colors duration-200"
                      >
                        <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-lg group-last-of-type:rounded-lg sm:pl-6">
                          <div className="flex items-center">
                            {customer.image_url ? (
                              <Image
                                src={customer.image_url}
                                alt={customer.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-200" />
                            )}
                            <div className="ml-4">
                              <p className="text-sm font-medium text-pink-700">{customer.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-pink-500">
                          {customer.email}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-pink-700">
                          {customer.total_appointments}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-pink-700">
                          {customer.services}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}