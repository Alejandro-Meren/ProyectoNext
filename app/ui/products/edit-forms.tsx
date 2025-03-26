'use client';
import React, { useState } from 'react';
import { updateProduct } from '@/app/lib/actions';
import Link from 'next/link';

interface EditFormProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    supplierName: string;
  };
}

const EditForm: React.FC<EditFormProps> = ({ product }) => {
  const [formData, setFormData] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price.toString());
    form.append('imageUrl', formData.imageUrl);
    form.append('stock', formData.stock.toString());
    form.append('supplierName', formData.supplierName);

    await updateProduct(product.id as string, form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">URL de la Imagen</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Proveedor</label>
        <input
          type="text"
          name="supplierName"
          value={formData.supplierName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Link
          href="/dashboard/productos"
          className="flex h-10 items-center rounded-lg bg-gray-100 dark:bg-gray-700 px-4 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transform hover:scale-105 duration-300"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="bg-pink-500 dark:bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 dark:hover:bg-purple-600 transition-colors duration-300"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default EditForm;