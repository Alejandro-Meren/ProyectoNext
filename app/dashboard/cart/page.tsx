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
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">El carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md mb-2">
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p>Precio: ${item.price}</p>
                <p>Cantidad: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-lg font-bold">Total: ${calculateTotal().toFixed(2)}</h3>
            <button
              onClick={clearCart}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;