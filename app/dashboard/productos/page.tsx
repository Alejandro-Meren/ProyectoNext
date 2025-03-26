import { fetchProducts } from '@/app/lib/data';
import ProductsTable from '@/app/ui/products/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Productos',
};

export default async function Page() {
  const products = await fetchProducts();

  return (
    <main className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <ProductsTable products={products} />
    </main>
  );
}