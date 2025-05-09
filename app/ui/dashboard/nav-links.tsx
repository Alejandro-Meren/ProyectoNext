import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  CubeIcon,
  ChartBarIcon,
  CalendarIcon,
  ShoppingCartIcon, // Importa el icono del carrito de la compra


} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { headers } from 'next/headers'; // Para obtener la URL actual
import { auth } from '@/auth'; // Importa la función auth para obtener la sesión
import { getUser } from '@/auth'; // Importa la función getUser para obtener los datos del usuario

// Map of links to display in the side navigation.
const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon, adminOnly: true },
  { name: 'Citas', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Clientes', href: '/dashboard/customers', icon: UserGroupIcon, adminOnly: true },
  { name: 'Productos', href: '/dashboard/productos', icon: CubeIcon },
  { name: 'Calendario', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Estadísticas', href: '/dashboard/statistics', icon: ChartBarIcon, adminOnly: true },  
  { name: ' Carrito', href: '/dashboard/cart', icon: ShoppingCartIcon }, // Añade el enlace al carrito


];

export default async function NavLinks() {
  // Obtener la URL actual desde los encabezados
  const headersList = await headers();
  const currentUrl = headersList.get('x-invoke-path') || '';
  const pathname = currentUrl.split('?')[0]; // Extraer solo la ruta sin parámetros

  // Obtener la sesión del usuario
  const session = await auth();

  if (!session || !session.user?.email) {
    return null; // Si no hay sesión, no renderizamos nada
  }

  const userEmail = session.user.email; // Recupera el email de la sesión
  const user = await getUser(userEmail); // Obtén los datos del usuario desde tu base de datos

  if (!user) {
    return null; // Si el usuario no existe, no renderizamos nada
  }

  const role = user.role; // Recupera el rol del usuario

  return (
    <nav className="space-y-4">
      {links.map((link) => {
        const LinkIcon = link.icon;

        // Si el enlace es solo para admin y el usuario no es admin, no lo mostramos
        if (link.adminOnly && role !== 'admin') {
          return null;
        }

        const isActive = pathname === link.href; // Verifica si la ruta actual coincide con el enlace

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center p-4 text-lg font-semibold rounded-2xl transition-all duration-300 group',
              {
                // Estilo para el enlace activo
                'bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-lg border border-pink-700 dark:from-purple-600 dark:to-purple-800 dark:border-purple-700':
                  isActive,
                // Estilo para los enlaces inactivos
                'text-gray-700 hover:bg-pink-200 hover:text-gray-900 hover:shadow-md hover:border hover:border-pink-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:hover:border-gray-600':
                  !isActive,
              }
            )}
          >
            {/* Icono del enlace */}
            <div
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300',
                {
                  'bg-white text-pink-500 dark:bg-gray-800 dark:text-purple-400': isActive,
                  'bg-gray-200 text-gray-700 group-hover:bg-pink-300 group-hover:text-pink-700 dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-gray-600 dark:group-hover:text-gray-100':
                    !isActive,
                }
              )}
            >
              <LinkIcon className="w-6 h-6" />
            </div>
            {/* Nombre del enlace */}
            <span className="ml-4">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}