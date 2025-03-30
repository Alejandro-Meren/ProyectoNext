import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const services = await sql`SELECT id, service, price FROM services ORDER BY service ASC`;

      // Asegúrate de que el precio sea un número
      const formattedServices = services.rows.map((service) => ({
        ...service,
        price: parseFloat(service.price), // Convertir el precio a número
      }));

      res.status(200).json(formattedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}