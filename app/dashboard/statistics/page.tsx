import { auth } from '@/auth'; // Importa la función auth desde tu configuración
import { redirect } from 'next/navigation';
import { getUser } from '@/auth'; // Importa la función getUser desde tu configuración
import StatsPage from './stats'; // Importa el componente de estadísticas

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

  if (user.role !== 'admin') {
    redirect('/dashboard/invoices'); // Redirige si el usuario no es admin
    return null;
  }

  return (
    <main className="flex flex-col h-full p-8 md:p-16 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-lg shadow-2xl overflow-hidden">
      <h1 className="mb-4 text-2xl md:text-3xl text-pink-600 dark:text-purple-400" style={{ fontFamily: 'Times New Roman, serif' }}>
        Estadísticas del Salón
      </h1>
      <div className="flex-grow overflow-auto">
        <StatsPage /> {/* Renderiza el componente de estadísticas */}
      </div>
    </main>
  );
}