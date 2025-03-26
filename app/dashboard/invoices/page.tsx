'use client';

import { useRouter } from 'next/navigation';
import InvoicesTable from '@/app/ui/invoices/table';
import Link from 'next/link';

export default function InvoicesPage() {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/invoices/${id}/edit`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 sm:text-2xl mb-4 sm:mb-0">
          Gestión de Citas
        </h1>
        <Link
          href="/dashboard/invoices/create"
          className="bg-pink-500 text-white hover:bg-pink-600 dark:bg-purple-500 dark:hover:bg-purple-600 py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 text-center"
        >
          Crear Cita
        </Link>
      </div>

      {/* Table Section */}
      <div className="flex-grow bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg overflow-x-auto">
        <InvoicesTable onEdit={handleEdit} />
      </div>
    </div>
  );
}