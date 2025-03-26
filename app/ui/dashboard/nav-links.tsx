'use client';

import {
  UserGroupIcon,
  HomeIcon,
  CalendarIcon,
  CogIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  { name: 'Citas', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Clientes', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Productos', href: '/dashboard/productos', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-4">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center p-4 text-lg font-semibold rounded-2xl transition-all duration-500',
              {
                // Estilo para el enlace activo
                'bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-lg border border-pink-700 dark:from-purple-600 dark:to-purple-800 dark:border-purple-700':
                  pathname === link.href,
                // Estilo para los enlaces inactivos
                'text-gray-700 hover:bg-pink-200 hover:text-gray-900 hover:shadow-md hover:border hover:border-pink-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:hover:border-gray-600':
                  pathname !== link.href,
              }
            )}
          >
            <LinkIcon className="w-8 h-8 mr-4" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}