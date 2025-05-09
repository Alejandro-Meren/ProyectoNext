import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('GET request received');
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

      console.log('Appointments fetched:', appointments.rows);

      const formattedAppointments = appointments.rows.map((appointment) => ({
        ...appointment,
        date: appointment.date.toISOString().split('T')[0],
        time: appointment.time,
      }));

      console.log('Formatted appointments:', formattedAppointments);

      res.status(200).json(formattedAppointments);
    } catch (error) {
      console.error('Database error during GET:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  } else if (req.method === 'POST') {
    console.log('POST request received');
    const { customer_id, date, time, service_id } = req.body;

    console.log('Data received in POST:', { customer_id, date, time, service_id });

    if (!customer_id || !date || !time || !service_id) {
      console.error('Missing required fields:', { customer_id, date, time, service_id });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Validar si el cliente existe
      console.log('Validating customer_id:', customer_id);
      const customer = await sql`SELECT id FROM customers WHERE id = ${customer_id}`;
      console.log('Customer validation result:', customer.rows);

      if (customer.rows.length === 0) {
        console.error(`Customer not found: ${customer_id}`);
        return res.status(404).json({ error: `Customer not found: ${customer_id}` });
      }

      // Validar si ya existe una cita en la misma fecha, hora y servicio
      console.log('Checking for existing appointment:', { date, time, service_id });
      const existingAppointment = await sql`
        SELECT * FROM appointments
        WHERE date = ${date} AND time = ${time} AND service_id = ${service_id}
      `;
      console.log('Existing appointment result:', existingAppointment.rows);

      if (existingAppointment.rows.length > 0) {
        console.error('Appointment conflict detected:', { date, time, service_id });
        return res.status(409).json({ error: 'La fecha y hora seleccionadas ya están ocupadas' });
      }

      // Validar si el servicio existe
      console.log('Validating service_id:', service_id);
      const service = await sql`SELECT price FROM services WHERE id = ${service_id}`;
      console.log('Service validation result:', service.rows);

      if (service.rows.length === 0) {
        console.error(`Service not found: ${service_id}`);
        return res.status(404).json({ error: `Service not found: ${service_id}` });
      }

      const { price } = service.rows[0];
      console.log('Price fetched for service:', price);

      // Insertar la cita en la base de datos
      console.log('Inserting appointment into database:', {
        customer_id,
        service_id,
        date,
        time,
        price,
      });
      await sql`
        INSERT INTO appointments (customer_id, service_id, date, time, price)
        VALUES (${customer_id}, ${service_id}, ${date}, ${time}, ${price})
      `;
      console.log('Appointment inserted successfully');
      res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
      console.error('Database error during POST:', error);
      res.status(500).json({ 
        error: 'Failed to create appointment', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  } else {
    console.log(`Invalid method: ${req.method}`);
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}