import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-pink-100 to-pink-200 text-gray-900 px-4 py-6 md:px-3 shadow-lg">
      <Link
        className="mb-6 flex h-20 items-end justify-start rounded-md bg-gradient-to-r from-pink-600 to-pink-500 p-4 md:h-40 shadow-md transition-transform transform hover:scale-105 duration-300"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-col justify-between space-y-6">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-pink-200 md:block shadow-inner"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-red-600 to-red-500 p-3 text-sm font-medium text-white hover:from-red-500 hover:to-red-400 md:justify-start md:p-2 md:px-3 shadow-md transition-transform transform hover:scale-105 duration-300">
            <PowerIcon className="w-6" />
            <span className="hidden md:block">Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </div>
  );
}