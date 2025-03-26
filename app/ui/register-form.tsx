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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register user');
      }

      // Redirigir a la página principal
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unknown error occurred');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold text-center text-pink-600 dark:text-purple-400">
        Registro
      </h1>
      {errorMessage && <p className="text-red-500 dark:text-red-400 text-sm">{errorMessage}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Correo Electrónico
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-pink-500 dark:bg-purple-500 text-white py-2 rounded-lg shadow-md hover:bg-pink-600 dark:hover:bg-purple-600 transition-colors duration-300"
      >
        Registrarse
      </button>
    </form>
  );
}