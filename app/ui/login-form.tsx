'use client';

import { lusitana } from '@/app/ui/fonts';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form
      action={formAction}
      className="space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-lg mt-8 sm:mt-16 max-w-md mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col items-center">
        <h1
          className={`${lusitana.className} mb-4 sm:mb-6 text-2xl sm:text-3xl text-center text-pink-600`}
        >
          Welcome Back!
        </h1>
        <p className="text-center text-gray-700 text-sm sm:text-base mb-4">
          Please login to your account
        </p>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div className="relative">
          <label
            className="mb-2 block text-xs sm:text-sm font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-300 py-2 sm:py-3 pl-10 pr-4 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 placeholder:text-gray-500"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
          <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-pink-500" />
        </div>
        <div className="relative">
          <label
            className="mb-2 block text-xs sm:text-sm font-medium text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-300 py-2 sm:py-3 pl-10 pr-4 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 placeholder:text-gray-500"
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
            minLength={6}
          />
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-pink-500" />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        className="mt-6 w-full bg-pink-500 text-white py-2 sm:py-3 rounded-lg shadow-md hover:bg-pink-600 transition-colors duration-300 flex items-center justify-center"
        aria-disabled={isPending}
      >
        Log in <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-50" />
      </Button>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center space-x-2 mt-4 text-red-500">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}