'use client';

import { useState, useEffect } from 'react';

interface Customer {
  id: string;
  name: string;
  image_url: string;
}

interface Appointment {
  id: string;
  customer_id: string;
  date: string;
  time: string;
  service: string;
}

interface EditFormProps {
  appointmentId: string;
  customers: Customer[];
  appointment: Appointment | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function EditForm({ appointmentId, customers, appointment, handleChange, handleSubmit }: EditFormProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  useEffect(() => {
    if (appointment) {
      setSelectedCustomer(appointment.customer_id);
    }
  }, [appointment]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
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
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={appointment.date}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Time
        </label>
        <input
          type="time"
          id="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
          Service
        </label>
        <input
          type="text"
          id="service"
          name="service"
          value={appointment.service}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white hover:bg-indigo-700 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}