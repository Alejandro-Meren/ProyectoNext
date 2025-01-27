import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const client = await db.connect();
      const result = await client.sql`SELECT id, name, image_url FROM customers ORDER BY name ASC`;
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('Database error:', error);
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      return res.status(500).json({ error: 'Failed to fetch customers', details: errorMessage });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}