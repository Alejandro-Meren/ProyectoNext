import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-pink-100 text-gray-900 px-4 py-6 md:px-3">
      <Link
        className="mb-6 flex h-20 items-end justify-start rounded-md bg-pink-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-col justify-between space-y-6">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-pink-200 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-red-600 p-3 text-sm font-medium hover:bg-red-500 md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <span className="hidden md:block">Cerrar Sesión</span>
          </button>
        </form>
      </div>
    </div>
  );
}