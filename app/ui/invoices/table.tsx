'use client';

import { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Appointment {
  id: string;
  customer_name: string;
  customer_image: string;
  date: string;
  time: string;
  service: string;
  price: number; // Asegúrate de que price sea un número
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
        // Asegúrate de que price sea un número
        const formattedData = data.map((appointment: Appointment) => ({
          ...appointment,
          price: Number(appointment.price) || 0, // Convierte a número y asigna 0 si es inválido
        }));
        setAppointments(formattedData);
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

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString: string) => {
    // Devuelve la hora en formato de 24 horas (ejemplo: "15:30")
    const [hours, minutes] = timeString.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  return (
    <div className="p-4 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-lg shadow-lg">
      <h1 className="mb-4 text-2xl md:text-3xl text-pink-600 dark:text-purple-400" style={{ fontFamily: 'Times New Roman, serif' }}>
      Citas
      </h1>

      {/* Diseño de tabla para pantallas grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-pink-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Hora
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Servicio
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-pink-700 dark:text-purple-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    {appointment.customer_image ? (
                      <img
                        src={appointment.customer_image}
                        alt={appointment.customer_name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {appointment.customer_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-200">
                    {formatDate(appointment.date)}
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-200">
                    {formatTime(appointment.time)}
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-200">{appointment.service}</div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-200">
                    ${Number(appointment.price).toFixed(2)} {/* Convierte a número */}
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(appointment.id)}
                      className="text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 py-1 px-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="text-white bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 py-1 px-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
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

      {/* Diseño de tarjetas para dispositivos móviles */}
      <div className="block md:hidden space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="flex items-center mb-4">
              {appointment.customer_image ? (
                <img
                  src={appointment.customer_image}
                  alt={appointment.customer_name}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
              )}
              <div className="ml-4">
                <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                  {appointment.customer_name}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-900 dark:text-gray-200">
              <p>
                <strong>Fecha:</strong> {formatDate(appointment.date)}
              </p>
              <p>
                <strong>Hora:</strong> {formatTime(appointment.time)}
              </p>
              <p>
                <strong>Servicio:</strong> {appointment.service}
              </p>
              <p>
                <strong>Precio:</strong> ${Number(appointment.price).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => onEdit(appointment.id)}
                className="text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 py-1 px-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(appointment.id)}
                className="text-white bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 py-1 px-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}