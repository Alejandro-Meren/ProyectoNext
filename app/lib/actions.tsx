'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}


const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Please enter a product name.' }),
  description: z.string().min(1, { message: 'Please enter a product description.' }),
  price: z.coerce.number().gt(0, { message: 'Please enter a price greater than $0.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  stock: z.coerce.number().int().nonnegative({ message: 'Stock must be a non-negative integer.' }),
  supplierName: z.string().min(1, { message: 'Please enter a supplier name.' }),
});

export async function createProduct(formData: FormData) {
  const validatedFields = ProductSchema.omit({ id: true }).safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageUrl: formData.get('imageUrl'),
    stock: formData.get('stock'), // Agregar stock
    supplierName: formData.get('supplierName'), // Agregar supplierName
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const { name, description, price, imageUrl, stock, supplierName } = validatedFields.data;

  try {
    await sql`
      INSERT INTO products (name, description, price, image_url, stock, supplier_name)
      VALUES (${name}, ${description}, ${price}, ${imageUrl}, ${stock}, ${supplierName})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  revalidatePath('/dashboard/productos');
  redirect('/dashboard/productos');
}

export async function updateProduct(id: string, formData: FormData) {
  const validatedFields = ProductSchema.omit({ id: true }).safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageUrl: formData.get('imageUrl'),
    stock: formData.get('stock'), // Agregar stock
    supplierName: formData.get('supplierName'), // Agregar supplierName
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Product.',
    };
  }

  const { name, description, price, imageUrl, stock, supplierName } = validatedFields.data;

  try {
    await sql`
      UPDATE products
      SET name = ${name}, description = ${description}, price = ${price}, image_url = ${imageUrl}, stock = ${stock}, supplier_name = ${supplierName}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Product.' };
  }

  revalidatePath('/dashboard/productos');
  redirect('/dashboard/productos');
}

export async function deleteProduct(id: string) {
  await sql`DELETE FROM products WHERE id = ${id}`;
  revalidatePath('/dashboard/productos');
}





export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}