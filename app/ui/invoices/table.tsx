'use client';

import { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Appointment {
  id: string;
  customer_name: string;
  customer_image: string;
  date: string;
  time: string;
  service: string;
}

interface InvoicesTableProps {
  onEdit: (id: string) => void;
}

export default function InvoicesTable({ onEdit }: InvoicesTableProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch('/api/appointments', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        console.log('Fetched appointments:', data); // Log the fetched data
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }

    fetchAppointments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      // Actualizar el estado local después de eliminar
      setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString: string) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return new Date(`1970-01-01T${timeString}Z`).toLocaleTimeString(undefined, options);
  };

  const totalAppointments = appointments.length;
  const uniqueCustomers = new Set(appointments.map((appointment) => appointment.customer_name)).size;
  const servicesCount = appointments.reduce((acc, appointment) => {
    acc[appointment.service] = (acc[appointment.service] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="p-6 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 min-h-screen rounded-lg shadow-lg">
      <h1 className="mb-4 text-2xl md:text-3xl text-pink-600" style={{ fontFamily: 'Times New Roman, serif' }}>
        Citas
      </h1>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-pink-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                    Hora
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                    Servicio
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-pink-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-pink-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {appointment.customer_image ? (
                          <img src={appointment.customer_image} alt={appointment.customer_name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200" />
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{appointment.customer_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(appointment.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatTime(appointment.time)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-5">
                        <button
                          onClick={() => onEdit(appointment.id)}
                          className="text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 flex items-center"
                        >
                          <PencilIcon className="h-5 w-5 mr-1" />
                        </button>
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 flex items-center justify-center"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowSummary(!showSummary)}
        className="mt-6 text-white bg-pink-600 hover:bg-pink-700 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 flex items-center"
      >
        {showSummary ? 'Cerrar Resumen' : 'Mostrar Resumen'}
      </button>
      {showSummary && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md relative">
          <button
            onClick={() => setShowSummary(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-semibold text-gray-700">Resumen de citas</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-pink-100 rounded-lg shadow flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-pink-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 10V5a1 1 0 112 0v5a1 1 0 01-2 0zm1 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-pink-700">Total de citas</h3>
                <p className="text-2xl font-bold text-gray-900">{totalAppointments}</p>
              </div>
            </div>
            <div className="p-4 bg-pink-100 rounded-lg shadow flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-pink-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-pink-700">Clientes únicos</h3>
                <p className="text-2xl font-bold text-gray-900">{uniqueCustomers}</p>
              </div>
            </div>
            <div className="p-4 bg-pink-100 rounded-lg shadow flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-pink-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-pink-700">Última actualización</h3>
                <p className="text-2xl font-bold text-gray-900">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">Servicios más solicitados</h3>
            <ul className="mt-2 space-y-2">
              {Object.entries(servicesCount).map(([service, count]) => (
                <li key={service} className="flex justify-between items-center bg-pink-50 p-2 rounded-lg shadow">
                  <span className="text-gray-900">{service}</span>
                  <span className="text-gray-900 font-semibold">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}