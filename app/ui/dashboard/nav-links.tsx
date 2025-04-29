'use client';

import {
  UserGroupIcon,
  HomeIcon,
  CalendarIcon,
  CogIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  CubeIcon, // Nuevo icono para productos
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  { name: 'Citas', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Clientes', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Productos', href: '/dashboard/productos', icon: CubeIcon }, // Cambiado a CubeIcon
  { name: 'Estadísticas', href: '/dashboard/statistics', icon: ChartBarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-4">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

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