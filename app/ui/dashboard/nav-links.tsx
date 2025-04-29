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
import { useLanguage } from '@/app/context/LanguageContext';

export default function NavLinks() {
  const pathname = usePathname();
  const { translations } = useLanguage();

  const links = [
    { name: translations.home, href: '/dashboard', icon: HomeIcon },
    { name: translations.appointments, href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
    { name: translations.customers, href: '/dashboard/customers', icon: UserGroupIcon },
    { name: translations.products, href: '/dashboard/productos', icon: UserGroupIcon },
  ];

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
                'bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-lg border border-pink-700 dark:from-purple-600 dark:to-purple-800 dark:border-purple-700':
                  isActive,
                'text-gray-700 hover:bg-pink-200 hover:text-gray-900 hover:shadow-md hover:border hover:border-pink-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:hover:border-gray-600':
                  !isActive,
              }
            )}
          >
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
            <span className="ml-4">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}