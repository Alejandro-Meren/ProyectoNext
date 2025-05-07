import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const appointments = await sql`
        SELECT 
          appointments.id,
          appointments.date,
          appointments.time,
          appointments.price,
          services.service,
          customers.name AS customer_name,
          customers.image_url AS customer_image
        FROM appointments
        JOIN services ON appointments.service_id = services.id
        JOIN customers ON appointments.customer_id = customers.id
      `;

      const formattedAppointments = appointments.rows.map((appointment) => ({
        ...appointment,
        date: appointment.date.toISOString().split('T')[0],
        time: appointment.time,
      }));

      res.status(200).json(formattedAppointments);
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
      const existingAppointment = await sql`
        SELECT * FROM appointments
        WHERE date = ${date} AND time = ${time} AND service_id = ${service_id}
      `;

      if (existingAppointment.rows.length > 0) {
        return res.status(409).json({ error: 'La fecha y hora seleccionadas ya están ocupadas' });
      }

      const service = await sql`SELECT price FROM services WHERE id = ${service_id}`;
      if (service.rows.length === 0) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const { price } = service.rows[0];

      await sql`
        INSERT INTO appointments (customer_id, service_id, date, time, price)
        VALUES (${customer_id}, ${service_id}, ${date}, ${time}, ${price})
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