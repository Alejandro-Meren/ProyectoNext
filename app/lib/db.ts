import { createClient } from '@vercel/postgres';

const db = createClient();

export default db;