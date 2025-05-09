'use client';

import React from 'react';
import { useCart } from '@/app/lib/cart-context';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de proceder al pago.');
      return;
    }

    try {
      const stripe = await stripePromise;

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar el proceso de pago');
      }

      const { sessionId } = await response.json();

      // Redirige al usuario a la página de pago de Stripe
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error al proceder al pago:', error);
      alert('Hubo un problema al procesar tu pago. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-lg shadow-2xl">
      <h1 className="mb-4 text-xl sm:text-2xl md:text-3xl text-pink-600 dark:text-purple-400 text-center" style={{ fontFamily: 'Times New Roman, serif' }}>
        🛒 Carrito de Compras
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          El carrito está vacío. ¡Agrega productos para comenzar!
        </p>
      ) : (
        <div className="space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
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
          <div className="p-8 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-purple-700 dark:to-purple-800 rounded-lg shadow-xl">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
              Total: <span className="text-pink-600 dark:text-purple-300">${calculateTotal().toFixed(2)}</span>
            </h3>
            <div className="flex justify-center mt-6 gap-6">
              <button
                onClick={clearCart}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
              >
                Vaciar Carrito
              </button>
              <button
                onClick={handleCheckout}
                className="bg-pink-500 text-white hover:bg-pink-600 dark:bg-purple-500 dark:hover:bg-purple-600 px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
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