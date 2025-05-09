'use client';

import React from 'react';
import { useCart } from '@/app/lib/cart-context';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100 text-center">
        🛒 Carrito de Compras
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          El carrito está vacío. ¡Agrega productos para comenzar!
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {item.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Precio: <span className="font-semibold">${item.price}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Cantidad: <span className="font-semibold">{item.quantity}</span>
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="p-6 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-purple-700 dark:to-purple-800 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
              Total: <span className="text-pink-600 dark:text-purple-300">${calculateTotal().toFixed(2)}</span>
            </h3>
            <div className="flex justify-center mt-4 gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
              >
                Vaciar Carrito
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;