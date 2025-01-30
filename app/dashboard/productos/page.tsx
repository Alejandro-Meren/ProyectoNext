import { fetchProducts } from '@/app/lib/data';
import ProductsTable from '@/app/ui/products/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Productos',
};

export default async function Page() {
  const products = await fetchProducts();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductsTable products={products} />
    </main>
  );
}