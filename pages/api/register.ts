import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const client = await db.connect();

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generar un avatar automáticamente usando DiceBear
      const avatarUrl = `https://api.dicebear.com/6.x/adventurer/svg?seed=${encodeURIComponent(name)}`;      
      console.log('Generated avatar URL:', avatarUrl);

      // Iniciar una transacción para asegurar que ambas inserciones ocurran juntas
      await client.sql`BEGIN`;

      // Insertar en la tabla `users`
      await client.sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})`;

      // Insertar en la tabla `customers` con el avatar generado
      await client.sql`
        INSERT INTO customers (name, email, image_url)
        VALUES (${name}, ${email}, ${avatarUrl})`;

      // Confirmar la transacción
      await client.sql`COMMIT`;

      return res.status(201).json({ message: 'User registered successfully in both tables' });
    } catch (error) {
      console.error('Database error:', error);

      // Revertir la transacción en caso de error
      await db.sql`ROLLBACK`;

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: 'Failed to register user', details: errorMessage });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}