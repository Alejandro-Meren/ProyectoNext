'use client';
import React, { useState } from 'react';
import { createProduct } from '@/app/lib/actions';
import Link from 'next/link';


interface CreateFormProps {
  onSave: (newProduct: { name: string; description: string; price: number; imageUrl: string }) => Promise<void>;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, imageUrl: '' });

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

    
    //await createProduct(form);
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
        />
      </div>
      <div className="flex justify-end space-x-4">
      <Link
          href="/dashboard/productos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-red-500 hover:text-white transform hover:scale-105 duration-300"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-colors duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateForm;