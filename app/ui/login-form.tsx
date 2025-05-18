'use client';

import React, { useRef } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { getUser } from '@/auth';
import { redirect } from 'next/navigation';
import { useCart } from '@/app/lib/cart-context';


export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  const { clearCart } = useCart(); // Importa la función para limpiar el carrito
  const hasCleared = useRef(false);


 React.useEffect(() => {
    // Solo limpia el carrito una vez tras login exitoso
    if (!errorMessage && !isPending && !hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }
    // Si hay error o vuelve a estar pendiente, permite limpiar de nuevo en el futuro
    if (errorMessage || isPending) {
      hasCleared.current = false;
    }
  }, [errorMessage, isPending, clearCart]);



  return (
    <form
      action={formAction}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg mt-8 sm:mt-16 max-w-md mx-auto"
    >
      {/* Header */}


      {/* Input Fields */}
      <div className="space-y-4">
      <div className="relative">
  <label
    className="mb-2 block text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300"
    htmlFor="email"
  >
    Email
  </label>
  <input
    className="peer block w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 sm:py-3 pl-12 pr-4 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
    id="email"
    type="email"
    name="email"
    placeholder="Enter your email address"
    required
  />
  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400 peer-focus:text-pink-500 dark:peer-focus:text-purple-500 mt-3" />
</div>

<div className="relative">
  <label
    className="mb-2 block text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300"
    htmlFor="password"
  >
    Password
  </label>
  <input
    className="peer block w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 sm:py-3 pl-12 pr-4 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
    id="password"
    type="password"
    name="password"
    placeholder="Enter password"
    required
    minLength={6}
  />
  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400 peer-focus:text-pink-500 dark:peer-focus:text-purple-500 mt-3" />
</div>
      </div>

      {/* Submit Button */}
      <Button
        className="mt-6 w-full bg-pink-500 dark:bg-purple-500 text-white py-2 sm:py-3 rounded-lg shadow-md hover:bg-pink-600 dark:hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center"
        aria-disabled={isPending}
      >
        Log in <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-50" />
      </Button>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center space-x-2 mt-4 text-red-500 dark:text-red-400">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}