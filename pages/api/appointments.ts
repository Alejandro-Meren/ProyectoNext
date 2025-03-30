import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const appointments = await sql`
        SELECT 
          services.id,
          services.date,
          services.time,
          services.service,
          services.price,
          customers.name AS customer_name,
          customers.image_url AS customer_image
        FROM services
        JOIN customers ON services.customer_id = customers.id
      `;
      res.status(200).json(appointments.rows);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  } else if (req.method === 'POST') {
    const { customer_id, date, time, service_id } = req.body;

    if (!customer_id || !date || !time || !service_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const service = await sql`SELECT service, price FROM services WHERE id = ${service_id}`;
      if (service.rows.length === 0) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const { service: serviceName, price } = service.rows[0];

      await sql`
        INSERT INTO services (customer_id, date, time, service, price)
        VALUES (${customer_id}, ${date}, ${time}, ${serviceName}, ${price})
      `;
      res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}