import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', // Cambia esto a la versión correcta
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cart } = req.body;

    try {
      const lineItems = cart.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Stripe usa centavos
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: lineItems,
  mode: 'payment',
  success_url: `${req.headers.origin}/dashboard/success`, // Redirige a la página de éxito
  cancel_url: `${req.headers.origin}/dashboard/cart`, // Redirige al carrito si se cancela
});

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
      res.status(500).json({ error: 'Error al crear la sesión de pago' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}