import { fetchServices } from '@/app/lib/data';
import { Service } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';

export default async function ServicesList() {
  const services: Service[] = await fetchServices();

  // Limitar el número de servicios a mostrar
  const recentServices = services.slice(0, 5);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-pink-600`}>
        Servicios Recientes
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-white p-4 shadow-lg">
        <div className="bg-gray-50 px-6 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-4">Recent Services</h3>
          {recentServices.map((service) => (
            <div key={service.id} className="flex items-center py-4 border-b last:border-b-0">
              <div className="flex flex-col">
                <p className="text-xl font-bold">{service.service}</p>
                <p className="text-sm text-gray-600">
                  {new Date(service.date).toLocaleDateString()} {service.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}