import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfAppointments,
    numberOfClients,
    totalRevenue,
    totalPendingPayments,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalRevenue} type="collected" />
      <Card title="Pending" value={totalPendingPayments} type="pending" />
      <Card title="Total Invoices" value={numberOfAppointments} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfClients}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-white p-4 shadow-lg">
      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
        {Icon ? <Icon className="h-6 w-6 text-pink-600" /> : null}
        <h3 className="ml-2 text-sm font-medium text-gray-700">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl text-pink-600`}
      >
        {value}
      </p>
    </div>
  );
}