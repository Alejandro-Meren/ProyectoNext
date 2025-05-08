import { fetchProducts } from '@/app/lib/data';
import ProductsTable from '@/app/ui/products/table';
import { Metadata } from 'next';
import { auth } from '@/auth'; // Importa la función de autenticación
import { redirect } from 'next/navigation';
import { getUser } from '@/auth'; // Importa la función para obtener el usuario

export const metadata: Metadata = {
  title: 'Productos',
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect('/login'); // Redirige al login si no hay sesión
    return null;
  }

  const userEmail = session.user.email;
  const user = await getUser(userEmail);

  if (!user) {
    redirect('/login'); // Redirige al login si el usuario no existe
    return null;
  }

  const products = await fetchProducts();

  return (
    <main className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <ProductsTable products={products} userRole={user.role} />
    </main>
  );
}