import CardWrapper from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import ServicesList from '@/app/ui/dashboard/services-list';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import { auth } from '@/auth'; // Importa la función auth desde tu configuración
import { redirect } from 'next/navigation';
import { getUser } from '@/auth'; // Importa la función getUser desde tu configuración

export default async function Page() {
  // Obtén la sesión del usuario autenticado
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect('/login'); // Redirige al login si no hay sesión
    return null;
  }

  const userEmail = session.user.email; // Recupera el email de la sesión
  const user = await getUser(userEmail); // Obtén los datos del usuario desde tu base de datos

  if (!user) {
    redirect('/login'); // Redirige al login si el usuario no existe en la base de datos
    return null;
  }

  if (user.role !== 'admin') {
    redirect('/dashboard/invoices'); // Redirige si el usuario no es admin
    return null;
  }

  return (
    <main className="flex flex-col h-full p-4 md:p-8 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-lg shadow-2xl overflow-hidden">
  <h1 className={`${lusitana.className} mb-4 text-2xl md:text-3xl text-pink-600 dark:text-purple-400`}>
    Hair Salon Dashboard
  </h1>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 flex-grow">
    <Suspense fallback={<CardsSkeleton />}>
      <CardWrapper />
    </Suspense>
  </div>
  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 flex-grow overflow-x-auto">
    <Suspense fallback={<RevenueChartSkeleton />}>
      {/* Aquí puedes agregar el componente RevenueChart si lo tienes */}
    </Suspense>
    <Suspense fallback={<LatestInvoicesSkeleton />}>
      <LatestInvoices />
    </Suspense>
    <Suspense fallback={<div className="text-gray-700 dark:text-gray-300">Loading Services...</div>}>
      <ServicesList />
    </Suspense>
  </div>
</main>
  );
}