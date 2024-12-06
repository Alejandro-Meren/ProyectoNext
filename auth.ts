import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres'; // Si usas otra DB, adapta esto
import bcrypt from 'bcrypt';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';

async function getUser(email: string): Promise<User | null> {
  try {
    const result = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });

        const parsed = schema.safeParse(credentials);
        if (!parsed.success) {
          console.log('Credenciales inválidas');
          return null;
        }

        const { email, password } = parsed.data;
        const user = await getUser(email);

        if (!user) {
          console.log('Usuario no encontrado');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          console.log('Contraseña incorrecta');
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
});
