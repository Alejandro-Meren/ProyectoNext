import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  if (req.method === 'GET') {
    try {
      const client = await db.connect();
      const result = await client.sql`SELECT * FROM services WHERE id = ${id}`;
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Database error:', error);
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      return res.status(500).json({ error: 'Failed to fetch appointment', details: errorMessage });
    }
  } else if (req.method === 'PUT') {
    const { customer_id, date, time, service } = req.body;

    if (!id || !customer_id || !date || !time || !service) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const client = await db.connect();
      await client.sql`
        UPDATE services
        SET customer_id = ${customer_id}, date = ${date}, time = ${time}, service = ${service}
        WHERE id = ${id}
      `;
      return res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
      console.error('Database error:', error);
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      return res.status(500).json({ error: 'Failed to update appointment', details: errorMessage });
    }
  } else if (req.method === 'DELETE') {
    if (!id) {
      return res.status(400).json({ error: 'Missing appointment ID' });
    }

    try {
      const client = await db.connect();
      await client.sql`
        DELETE FROM services
        WHERE id = ${id}
      `;
      return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Database error:', error);
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      return res.status(500).json({ error: 'Failed to delete appointment', details: errorMessage });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}