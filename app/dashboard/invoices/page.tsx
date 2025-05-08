import { auth } from '@/auth'; // Importa la función auth desde tu configuración
import { redirect } from 'next/navigation';
import { getUser } from '@/auth'; // Importa la función getUser desde tu configuración
import InvoicesTablePage from './table-page'; // Importa el componente de la tabla

export default async function Page() {
  // Obtén la sesión del usuario autenticado
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

  // Pasa el rol del usuario al componente de la tabla
  return (
    
    <InvoicesTablePage userRole={user.role} />
  );
}