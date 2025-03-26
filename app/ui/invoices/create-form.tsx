'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/ui/button';

interface Customer {
  id: string;
  name: string;
  profile_image: string;
}

interface CreateFormProps {
  customers: Customer[];
}

export default function CreateForm({ customers }: CreateFormProps) {
  const [formData, setFormData] = useState({
    customer_id: '',
    date: '',
    time: '',
    service: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Service
          </label>
          <input
            type="text"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit" className="bg-pink-500 dark:bg-purple-500 text-white hover:bg-pink-600 dark:hover:bg-purple-600 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
          Crear Cita
        </Button>
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 dark:bg-gray-700 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transform hover:scale-105 duration-300"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}