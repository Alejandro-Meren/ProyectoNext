import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 bg-white dark:bg-gray-800">
      <FaceFrownIcon className="w-10 text-gray-400 dark:text-gray-500" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">404 Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400">Could not find the requested appointment.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-pink-500 px-4 py-2 text-sm text-white transition-colors hover:bg-pink-400 dark:bg-purple-500 dark:hover:bg-purple-600"
      >
        Go Back
      </Link>
    </main>
  );
}