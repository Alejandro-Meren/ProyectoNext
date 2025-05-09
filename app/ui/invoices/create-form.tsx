'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Customer {
  id: string;
  name: string;
  profile_image: string;
}

interface Service {
  id: string;
  service: string;
  description: string;
  price: number;
}

interface CreateFormProps {
  customers: Customer[];
  currentUser: Customer; // Cliente actual basado en la sesión
  userRole: 'admin' | 'user'; // Rol del usuario
}

export default function CreateForm({ customers, currentUser, userRole }: CreateFormProps) {
  const [formData, setFormData] = useState({
    customer_id: currentUser.id, // Preselecciona el cliente actual
    date: '',
    time: '',
    service_id: '',
    price: 0,
  });

  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }

    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'service_id') {
      const selectedService = services.find((service) => service.id === value);
      setFormData({
        ...formData,
        service_id: value,
        price: selectedService ? selectedService.price : 0,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log('Datos enviados:', formData); // Verifica el contenido de formData
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 409) {
      const errorData = await response.json();
      setPopupMessage(errorData.error);
      setShowPopup(true);
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create appointment');
    }

    router.push('/dashboard/invoices');
  } catch (error) {
    console.error('Error:', error);
  }
};

  const generateTimeOptions = () => {
    const times = [];
    let start = new Date();
    start.setHours(7, 0, 0, 0); // Inicio del horario (7:00 AM)
    const end = new Date();
    end.setHours(22, 0, 0, 0); // Fin del horario (10:00 PM)

    while (start <= end) {
      const timeString = start.toTimeString().slice(0, 5); // Formato HH:mm
      times.push(timeString);
      start.setMinutes(start.getMinutes() + 30); // Incrementar 30 minutos
    }

    return times;
  };

  return (
    <div>
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-4">Error</h3>
            <p className="text-sm text-gray-900 dark:text-gray-200">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Cliente
          </label>
          {userRole === 'admin' ? (
            <select
              id="customer_id"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            >
              <option value="" disabled>
                Selecciona un cliente
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id="customer_id"
              name="customer_id"
              value={currentUser.name} // Muestra el nombre del cliente actual
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 cursor-not-allowed"
            />
          )}
        </div>

        <div>
          <label htmlFor="service_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Servicio
          </label>
          <select
            id="service_id"
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full max-w-md rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="" disabled>
              Selecciona un servicio
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.service} - ${service.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Precio
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={`$${formData.price.toFixed(2)}`}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Hora
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            >
              <option value="" disabled>
                Selecciona una hora
              </option>
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="submit"
            className="bg-pink-500 dark:bg-purple-500 text-white hover:bg-pink-600 dark:hover:bg-purple-600 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
          >
            Crear Cita
          </button>
          <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 dark:bg-gray-700 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transform hover:scale-105 duration-300"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}