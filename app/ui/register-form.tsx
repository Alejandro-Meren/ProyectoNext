'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AtSymbolIcon, KeyIcon, UserIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/app/lib/cart-context'; // Importa el contexto del carrito

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { clearCart } = useCart(); // Obtén la función para limpiar el carrito

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        clearCart(); // Limpia el carrito al crear el usuario
        router.push('/login'); // Redirige al login después del registro exitoso
      } else {
        const data = await res.json();
        setErrorMessage(data.error || 'Error al registrar el usuario.');
      }
    } catch (error) {
      setErrorMessage('Error al registrar el usuario.');
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg mt-8 sm:mt-16 max-w-md mx-auto"
    >
      {/* Header */}

      {/* Input Fields */}
      <div className="space-y-4">
        {/* Name Field */}
        <div className="relative">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="peer block w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 sm:py-3 pl-12 pr-4 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Introduce tu nombre"
          />
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400 peer-focus:text-pink-500 dark:peer-focus:text-purple-500 mt-3" />
        </div>

        {/* Email Field */}
        <div className="relative">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="peer block w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 sm:py-3 pl-12 pr-4 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Introduce tu correo electrónico"
          />
          <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400 peer-focus:text-pink-500 dark:peer-focus:text-purple-500 mt-3" />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="peer block w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 sm:py-3 pl-12 pr-4 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            placeholder="Introduce tu contraseña"
          />
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 dark:text-gray-400 peer-focus:text-pink-500 dark:peer-focus:text-purple-500 mt-3" />
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center space-x-2 mt-4 text-red-500 dark:text-red-400">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      >
        Registrarse
      </button>

      {/* Link to Login */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        ¿Ya tienes una cuenta?{' '}
        <a href="/login" className="text-pink-500 dark:text-purple-400 hover:underline">
          Inicia sesión
        </a>
      </p>
    </form>
  );
}