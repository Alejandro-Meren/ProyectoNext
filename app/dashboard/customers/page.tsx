import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import { auth } from '@/auth'; // Importa la función auth desde tu configuración
import { redirect } from 'next/navigation';
import { getUser } from '@/auth'; // Importa la función getUser desde tu configuración

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
  
  
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);
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
    <main className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <CustomersTable customers={customers} />
    </main>
  );
}