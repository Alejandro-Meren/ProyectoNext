'use client';

import { useRouter } from 'next/navigation';
import InvoicesTable from '@/app/ui/invoices/table';
import Link from 'next/link';

export default function InvoicesPage() {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/invoices/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      // Actualizar la página después de eliminar
      router.refresh();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link
          href="/dashboard/invoices/create"
          className="bg-pink-500 text-white hover:bg-pink-600 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
        >
          Crear Cita
        </Link>
      </div>
      <InvoicesTable onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}