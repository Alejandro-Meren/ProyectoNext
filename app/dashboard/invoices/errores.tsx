'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center bg-white dark:bg-gray-800">
      <h2 className="text-center text-gray-800 dark:text-gray-100">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}