'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  CogIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
  { name: 'Facturas', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Clientes', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Reportes', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Configuración', href: '/dashboard/settings', icon: CogIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center p-3 text-sm font-medium rounded-md transition-colors duration-200',
              {
                'bg-pink-500 text-white shadow-lg': pathname === link.href,
                'text-gray-700 hover:bg-pink-300 hover:text-gray-900': pathname !== link.href,
              }
            )}
          >
            <LinkIcon className="w-5 h-5 mr-2" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}