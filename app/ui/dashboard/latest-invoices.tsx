import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchProducts } from '@/app/lib/data';

export default async function LatestInvoices() {
  const products = await fetchProducts();

  // Limitar el número de productos a mostrar
  const recentProducts = products.slice(0, 4); // Cambia el número 4 por la cantidad de productos que deseas mostrar

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-pink-600`}>
        Productos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-white p-4 shadow-lg">
        <div className="bg-gray-50 px-6 rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-4">Recent Products</h3>
          {recentProducts.map((product) => (
            <div key={product.id} className="flex items-center py-4 border-b last:border-b-0">
              <Image
                src={product.imageUrl}
                alt={`${product.name}'s image`}
                className="mr-4 rounded-lg"
                width={64}
                height={64}
              />
              <div className="flex flex-col">
                <p className="text-xl font-bold">{product.name}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-pink-600 font-semibold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}