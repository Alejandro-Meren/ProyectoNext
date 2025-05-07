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
}

export default function CreateForm({ customers }: CreateFormProps) {
  const [formData, setFormData] = useState({
    customer_id: '',
    date: '',
    time: '',
    service_id: '',
    price: 0,
  });

  const [services, setServices] = useState<Service[]>([]);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup
  const [popupMessage, setPopupMessage] = useState(''); // Mensaje del popup

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
        setPopupMessage(errorData.error); // Establecer el mensaje del popup
        setShowPopup(true); // Mostrar el popup
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

  return (
    <div>
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-4">Error</h3>
            <p className="text-sm text-gray-900 dark:text-gray-200">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)} // Cerrar el popup
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
            Customer
          </label>
          <select
            id="customer_id"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Service
          </label>
          <select
            id="service_id"
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.service} - ${service.price ? Number(service.price).toFixed(2) : 'N/A'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={`$${formData.price.toFixed(2)}`}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
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
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="submit"
            className="bg-pink-500 dark:bg-purple-500 text-white hover:bg-pink-600 dark:hover:bg-purple-600 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
          >
            Create Appointment
          </button>
          <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 dark:bg-gray-700 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transform hover:scale-105 duration-300"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}