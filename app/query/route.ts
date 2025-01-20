import { db } from "@vercel/postgres";

const client = await db.connect();

async function listServices() {
    const data = await client.sql`
    SELECT services.service, customers.name, services.date, services.time
    FROM services
    JOIN customers ON services.customer_id = customers.id;
  `;

    return data.rows;
}

export async function GET() {
  
  try {
      return Response.json(await listServices());
  } catch (error) {
      return Response.json({ error }, { status: 500 });
  }
}