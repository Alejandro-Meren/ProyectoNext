'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

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
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-pink-600 dark:text-purple-400">Crear Cuenta</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Por favor, completa los campos para registrarte.
        </p>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-sm text-red-500">
          {errorMessage}
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
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        ¿Ya tienes una cuenta?{' '}
        <a href="/login" className="text-pink-500 dark:text-purple-400 hover:underline">
          Inicia sesión
        </a>
      </p>
    </form>
  );
}