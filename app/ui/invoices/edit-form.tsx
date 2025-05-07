'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Customer {
  id: string;
  name: string;
  image_url: string;
}

interface Service {
  id: string;
  service: string;
  price: number;
}

interface Appointment {
  id: string;
  customer_id: string;
  date: string;
  time: string;
  service_id: string;
  price: number;
}

interface EditFormProps {
  appointmentId: string;
  customers: Customer[];
  services: Service[];
  appointment: Appointment | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function EditForm({
  appointmentId,
  customers,
  services,
  appointment,
  handleChange,
  handleSubmit,
}: EditFormProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (appointment) {
      setSelectedCustomer(appointment.customer_id);
      setSelectedService(appointment.service_id);
      setPrice(appointment.price);
    }
  }, [appointment]);

  const handleCancel = () => {
    router.push('/dashboard/invoices'); // Redirige a la lista de citas
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServiceId = e.target.value;
    const selectedService = services.find((service) => service.id === selectedServiceId);

    setSelectedService(selectedServiceId);
    setPrice(selectedService ? selectedService.price : 0);

    handleChange({
      ...e,
      target: {
        ...e.target,
        name: 'service_id',
        value: selectedServiceId,
      },
    });

    handleChange({
      ...e,
      target: {
        ...e.target,
        name: 'price',
        value: selectedService ? selectedService.price.toString() : '0',
      },
    });
  };

  if (!appointment) {
    return <div className="text-gray-700 dark:text-gray-300">Loading...</div>;
  }

  // Asegurarse de que la fecha esté en el formato correcto (YYYY-MM-DD)
  const formattedDate = new Date(appointment.date).toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="customer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Customer
        </label>
        <select
          id="customer"
          name="customer_id"
          value={selectedCustomer || ''}
          onChange={(e) => {
            handleChange(e);
            setSelectedCustomer(e.target.value);
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
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
      <div className="mb-4">
        <label htmlFor="service_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Service
        </label>
        <select
          id="service_id"
          name="service_id"
          value={selectedService || ''}
          onChange={handleServiceChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.service} - ${service.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Price
        </label>
        <input
  type="text"
  id="price"
  name="price"
  value={`$${Number(price).toFixed(2)}`} // Asegurarse de que price sea un número
  readOnly
  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:ring-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
/>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formattedDate}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-pink-500 dark:bg-purple-500 text-white hover:bg-pink-600 dark:hover:bg-purple-600 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}