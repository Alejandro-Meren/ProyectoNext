import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const settings = await sql`SELECT * FROM settings WHERE user_id = 'current_user_id'`;
      res.status(200).json(settings.rows[0] || {});
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ error: 'Failed to fetch settings' });
    }
  } else if (req.method === 'POST') {
    const { profile, preferences, notifications, security } = req.body;

    try {
      await sql`
        INSERT INTO settings (user_id, profile, preferences, notifications, security)
        VALUES ('current_user_id', ${JSON.stringify(profile)}, ${JSON.stringify(preferences)}, ${JSON.stringify(notifications)}, ${JSON.stringify(security)})
        ON CONFLICT (user_id)
        DO UPDATE SET
          profile = ${JSON.stringify(profile)},
          preferences = ${JSON.stringify(preferences)},
          notifications = ${JSON.stringify(notifications)},
          security = ${JSON.stringify(security)}
      `;
      res.status(200).json({ message: 'Settings saved successfully' });
    } catch (error) {
      console.error('Error saving settings:', error);
      res.status(500).json({ error: 'Failed to save settings' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}