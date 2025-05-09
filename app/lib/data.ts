import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  Product,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue, FormattedCustomersTable,
} from './definitions';
import { formatCurrency } from './utils';
import db from './db';
import { Service } from './definitions';



export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const appointmentCountPromise = sql`SELECT COUNT(*) FROM services`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const serviceCountPromise = sql`SELECT COUNT(*) FROM services`;

    const data = await Promise.all([
      appointmentCountPromise,
      customerCountPromise,
      serviceCountPromise,
    ]);

    const numberOfAppointments = Number(data[0].rows[0].count ?? '0');
    const numberOfClients = Number(data[1].rows[0].count ?? '0');
    const totalServices = Number(data[2].rows[0].count ?? '0');

    return {
      numberOfAppointments,
      numberOfClients,
      totalServices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function 
fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
export async function fetchCustomersForEdit() {
  try {
    const data = await sql`
      SELECT id, name, image_url
      FROM customers
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers for edit.');
  }
}



export async function fetchFilteredCustomers(query: string): Promise<FormattedCustomersTable[]> {
  try {
    const result = await sql`
      SELECT 
        c.id, 
        c.name, 
        c.email, 
        c.image_url, 
        COUNT(s.id) AS total_appointments, 
        STRING_AGG(s.service, ', ') AS services
      FROM customers c
      LEFT JOIN services s ON c.id = s.customer_id
      WHERE c.name ILIKE ${'%' + query + '%'}
      GROUP BY c.id
      ORDER BY c.name ASC
    `;
    
    // Map the result to the FormattedCustomersTable interface
    const formattedCustomers: FormattedCustomersTable[] = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      image_url: row.image_url,
      total_appointments: parseInt(row.total_appointments, 10),
      services: row.services,
      total_invoices: 0, // Placeholder value, replace with actual data if available
      total_pending: 0, // Placeholder value, replace with actual data if available
      total_paid: 0, // Placeholder value, replace with actual data if available
    }));

    return formattedCustomers;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }

  
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const data = await sql<Product>`
      SELECT id, name, description, price, image_url AS "imageUrl", stock, supplier_name AS "supplierName"
      FROM products
      WHERE id = ${id}
    `;
    return data.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const data = await sql<Product>`
      SELECT id, name, description, price, image_url AS "imageUrl", stock, supplier_name AS "supplierName"
      FROM products
    `;
    return data.rows;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  try {
    await sql`DELETE FROM products WHERE id = ${productId}`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete product.');
  }
}

export async function updateProduct(productId: string, product: { name: string; description: string; price: number; imageUrl: string; stock: number; supplierName: string }): Promise<void> {
  try {
    await sql`
      UPDATE products
      SET name = ${product.name}, description = ${product.description}, price = ${product.price}, image_url = ${product.imageUrl}, stock = ${product.stock}, supplier_name = ${product.supplierName}
      WHERE id = ${productId}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update product.');
  }
}

export async function addProduct(product: { name: string; description: string; price: number; imageUrl: string; stock: number; supplierName: string }): Promise<{ id: string }> {
  try {
    const result = await sql`
      INSERT INTO products (name, description, price, image_url, stock, supplier_name)
      VALUES (${product.name}, ${product.description}, ${product.price}, ${product.imageUrl}, ${product.stock}, ${product.supplierName})
      RETURNING id
    `;
    return { id: result.rows[0].id };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add product.');
  }
}


export async function fetchServices() {
  try {
    const data = await sql<Service>`SELECT * FROM services ORDER BY date DESC, time DESC`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch services.');
  }
}


// fetchCustomers() {
//   try {
//     const data = await sql<CustomerField>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `;

//     const customers = data.rows;
//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all customers.');
//   }
// }