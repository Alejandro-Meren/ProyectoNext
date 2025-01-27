import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await db.connect();
      const result = await client.sql`
        SELECT 
          services.id,
          services.date,
          services.time,
          services.service,
          customers.name AS customer_name,
          customers.image_url AS customer_image
        FROM services
        JOIN customers ON services.customer_id = customers.id
      `;
      console.log('Fetched appointments:', result.rows); // Log the fetched data
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('Database error:', error);
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      return res.status(500).json({ error: 'Failed to fetch appointments', details: errorMessage });
    }
  } else if (req.method === 'POST') {
    const { customer_id, date, time, service } = req.body;

    if (!customer_id || !date || !time || !service) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const client = await db.connect();
      await client.sql`
        INSERT INTO services (customer_id, date, time, service)
        VALUES (${customer_id}, ${date}, ${time}, ${service})
      `;
      return res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
      console.error('Database error:', error);
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      return res.status(500).json({ error: 'Failed to create appointment', details: errorMessage });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}