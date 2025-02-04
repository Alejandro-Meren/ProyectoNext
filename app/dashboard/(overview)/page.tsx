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

export default async function Page() {
  return (
    <main className="flex flex-col h-full p-8 md:p-16 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 rounded-lg shadow-2xl overflow-hidden">
      <h1 className={`${lusitana.className} mb-4 text-2xl md:text-3xl text-pink-600`}>
        Hair Salon Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 flex-grow overflow-auto">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 flex-grow overflow-auto">
        <Suspense fallback={<RevenueChartSkeleton />}>
          {/* Aquí puedes agregar el componente RevenueChart si lo tienes */}
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
        <Suspense fallback={<div>Loading Services...</div>}>
          <ServicesList />
        </Suspense>
      </div>
    </main>
  );
}