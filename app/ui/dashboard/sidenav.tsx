

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-gray-200 px-6 py-8 shadow-2xl rounded-r-3xl">
    <Link
  className="mb-8 flex h-36 items-center justify-start rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 dark:from-purple-600 dark:to-purple-500 p-4 shadow-lg transition-transform transform hover:scale-105 duration-300 overflow-hidden"
  href="/"
>
  <div className="max-w-full w-28 md:w-32 text-white">
    <AcmeLogo />
  </div>
</Link>
      <div className="flex grow flex-col justify-between space-y-8">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-lg bg-pink-300 dark:bg-gray-700 md:block shadow-inner"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 dark:from-red-700 dark:to-red-600 p-3 text-sm font-medium text-white hover:from-red-500 hover:to-red-400 dark:hover:from-red-600 dark:hover:to-red-500 shadow-lg transition-transform transform hover:scale-105 duration-300">
            <PowerIcon className="w-6" />
            <span className="hidden md:block">Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </div>
  );
}