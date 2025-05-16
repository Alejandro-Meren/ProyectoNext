'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/app/lib/cart-context';

const SuccessPage: React.FC = () => {
  const { clearCart } = useCart();

  // Vaciar el carrito al cargar la página
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="p-6 bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
        🎉 ¡Gracias por tu compra!
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Tu pedido ha sido procesado con éxito. El carrito ha sido vaciado.
      </p>
      <a
        href="/dashboard/cart"
        className="inline-block bg-pink-500 text-white hover:bg-pink-600 dark:bg-purple-500 dark:hover:bg-purple-600 px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
      >
        Volver al carrito
      </a>
      <div className="mt-8">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Si tienes alguna duda, no dudes en <a className="text-pink-500 dark:text-purple-400 hover:underline">contactarnos</a>.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;