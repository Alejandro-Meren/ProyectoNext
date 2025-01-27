'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EditForm from '@/app/ui/invoices/edit-form';

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

export default function EditAppointmentPage({ params }: { params: { id: string } }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
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
        console.log('Fetched customers:', data); // Log the fetched data
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
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
        console.log('Fetched appointment:', data); // Log the fetched data
        setAppointment(data);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    }

    fetchParams();
    fetchCustomers();
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Appointment</h1>
      <EditForm
        appointmentId={appointmentId!}
        customers={customers}
        appointment={appointment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}