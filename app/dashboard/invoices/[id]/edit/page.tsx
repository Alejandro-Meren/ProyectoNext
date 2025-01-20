'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditForm from '@/app/ui/invoices/edit-form';

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || '';
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }

    fetchCustomers();
  }, []);

  return <EditForm customers={customers} appointmentId={id} />;
}