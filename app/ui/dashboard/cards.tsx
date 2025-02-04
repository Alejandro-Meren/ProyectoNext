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
    <div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-pink-100 to-pink-200 p-3 shadow-md mb-4 transform transition-transform hover:scale-105 hover:shadow-lg">
      <div className="flex items-center justify-center p-2 bg-pink-600 rounded-full mb-2 shadow-sm">
        {Icon ? <Icon className="h-5 w-5 text-white" /> : null}
      </div>
      <h3 className="text-center text-sm font-semibold text-gray-800 mb-1">{title}</h3>
      <p
  className={`${lusitana.className} truncate rounded-lg bg-white px-6 py-8 text-center text-2xl text-pink-600 shadow-inner`}
>
  {value}
</p>
    </div>
  );
}