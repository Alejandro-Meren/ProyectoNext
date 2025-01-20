'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/ui/button';

interface Customer {
  id: string;
  name: string;
  profile_image: string;
}

interface EditFormProps {
  customers: Customer[];
  appointmentId: string;
}

export default function EditForm({ customers, appointmentId }: EditFormProps) {
  const [formData, setFormData] = useState({
    customer_id: '',
    date: '',
    time: '',
    service: '',
  });

  const router = useRouter();

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const response = await fetch(`/api/appointments/${appointmentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointment');
        }
        const data = await response.json();
        setFormData({
          customer_id: data.customer_id,
          date: data.date,
          time: data.time,
          service: data.service,
        });
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    }

    fetchAppointment();
  }, [appointmentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }

      router.push('/dashboard/invoices');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">Customer</label>
        <select
          id="customer_id"
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="" disabled>Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
          <input
            type="text"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit" className="bg-pink-500 text-white hover:bg-pink-600 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
          Update Appointment
        </Button>
        <Button
          type="button"
          onClick={() => router.push('/dashboard/invoices')}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-red-500 hover:text-white transform hover:scale-105 duration-300"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}