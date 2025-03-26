import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  revenue: BanknotesIcon,
  clients: UserGroupIcon,
  appointments: ClockIcon,
  services: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfAppointments,
    numberOfClients,
    totalServices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Total De Servicios" value={totalServices} type="services" />
      <Card title="Total De Citas" value={numberOfAppointments} type="appointments" />
      <Card
        title="Total De Clientes"
        value={numberOfClients}
        type="clients"
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
  type: 'appointments' | 'clients' | 'services' | 'revenue';
}) {
  const Icon = iconMap[type];

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-pink-100 to-pink-200 dark:from-gray-800 dark:to-gray-700 p-2 shadow-md mb-4 transform transition-transform hover:scale-105 hover:shadow-lg">
      <div className="flex items-center justify-center p-1 bg-pink-600 dark:bg-purple-500 rounded-full mb-2 shadow-sm">
        {Icon ? <Icon className="h-4 w-4 text-white" /> : null}
      </div>
      <h3 className="text-center text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1">{title}</h3>
      <p
        className={`${lusitana.className} truncate rounded-lg bg-white dark:bg-gray-700 px-3 py-4 text-center text-lg text-pink-600 dark:text-purple-400 shadow-inner`}
      >
        {value}
      </p>
    </div>
  );
}