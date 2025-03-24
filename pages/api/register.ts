import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
}

interface ErrorResponse {
    error: string;
}

interface SuccessResponse {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { name, email, password } = req.body as RegisterRequestBody;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const client = await db.connect();
        const hashedPassword = await bcrypt.hash(password, 10);

        await client.sql`
            INSERT INTO users (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
        `;

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
}