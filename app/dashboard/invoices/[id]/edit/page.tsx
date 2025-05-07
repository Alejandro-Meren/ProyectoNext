'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EditForm from '@/app/ui/invoices/edit-form';
import { Appointment, Customer, Service } from '@/app/lib/definitions';

export default function EditAppointmentPage({ params }: { params: Promise<{ id: string }> }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setAppointmentId(resolvedParams.id);
      fetchAppointment(resolvedParams.id);
    }

    async function fetchCustomers() {
      try {
        const response = await fetch('/api/customers', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }

    async function fetchServices() {
      try {
        const response = await fetch('/api/services', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }

    async function fetchAppointment(id: string) {
      try {
        const response = await fetch(`/api/appointments/${id}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch appointment');
        }
        const data = await response.json();
        setAppointment({
          ...data,
          service_id: data.service_id || '',
          price: data.price || 0,
        });
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    }

    fetchParams();
    fetchCustomers();
    fetchServices();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (appointment) {
      setAppointment({ ...appointment, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment) return;

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment');
      }

      router.push('/dashboard/invoices');
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Editar Cita</h1>
      <EditForm
        appointmentId={appointmentId!}
        customers={customers}
        services={services}
        appointment={appointment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}