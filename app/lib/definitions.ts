// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user'; // Asegúrate de incluir esta propiedad
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};



export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type Appointment = {
  id: string;
  customer_id: string;
  date: string; // Fecha en formato 'YYYY-MM-DD'
  time: string; // Hora en formato 'HH:mm'
  service_id: string;
  price: number;
  start: Date; // Fecha de inicio como objeto Date
  end: Date; // Fecha de fin como objeto Date
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export interface FormattedCustomersTable {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_appointments: number;
  services: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
}

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number; // Nuevo campo para el stock
  supplierName: string; // Nuevo campo para el nombre del proveedor
};

// export type Service = {
//   id: string;
//   customer_id: string;
//   date: string;
//   time: string;
//   service: string;
// };

export type Service = {
  id: string;
  customer_id: string;
  date: string;
  time: string;
  service: string;
  price: number;
};